import { IgltfJson, IgltfPrimitive } from "./loadglTF";
import { IgltfMeshPrimitive, AccessorComponentType } from "./gltfJsonStruct";
// import { Material } from "../assets/material";
import { ParseMaterialNode } from "./parseMaterialNode";
// import { Geometry } from "../assets/geometry";
import { ParseAccessorNode } from "./parseAccessorNode";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { VertexArray, IvaoOptions } from "../../webgl/VertextArray";
import { TypedArray } from "../../core/TypedArray";
import { Material } from "../../scene/asset/Material";
import { StaticMesh } from "../../scene/asset/StaticMesh";
import { IndexBuffer } from "../../webgl/IndexBuffer";

const MapGltfAttributeToToyAtt: { [name: string]: VertexAttEnum } = {
    POSITION: VertexAttEnum.POSITION,
    NORMAL: VertexAttEnum.NORMAL,
    TANGENT: VertexAttEnum.TANGENT,
    TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
    TEXCOORD_1: VertexAttEnum.TEXCOORD_1,
    COLOR_0: VertexAttEnum.COLOR_0,
    WEIGHTS_0: VertexAttEnum.WEIGHTS_0,
    JOINTS_0: VertexAttEnum.JOINTS_0,
};
export class ParseMeshNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<IgltfPrimitive[]>
    {
        if (gltf.cache.meshNodeCache[index])
        {
            return gltf.cache.meshNodeCache[index];
        } else
        {
            let node = gltf.meshes[index];

            let dataArr: Promise<IgltfPrimitive>[] = [];
            if (node.primitives)
            {
                for (let key in node.primitives)
                {
                    let primitive = node.primitives[key];
                    let data = this.parsePrimitive(primitive, gltf, context);
                    dataArr.push(data);
                }
            }
            let task = Promise.all(dataArr);
            gltf.cache.meshNodeCache[index] = task;
            return task;
        }
    }

    static parsePrimitive(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<IgltfPrimitive>
    {
        return Promise.all([
            this.parseMesh(node, gltf, context),
            this.parseMaterial(node, gltf)]
        ).then(
            ([mesh, material]) =>
            {
                return { mesh: mesh, material: material };
            },
        );
    }

    static parseMaterial(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Material>
    {
        let matindex = node.material;
        if (matindex != null)
        {
            return ParseMaterialNode.parse(matindex, gltf);
        } else
        {
            return Promise.resolve(null);
        }
    }

    static parseMesh(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<StaticMesh>
    {
        let taskAtts: Promise<void>[] = [];
        let vaoOptions: IvaoOptions = { vertexAttributes: [], context };
        let attributes = node.attributes;
        for (let attName in attributes)
        {
            let attIndex = attributes[attName];
            let attType = MapGltfAttributeToToyAtt[attName];
            let attTask = ParseAccessorNode.parse(attIndex, gltf, context)
                .then(arrayInfo =>
                {
                    vaoOptions.vertexAttributes.push({
                        type: attType,
                        vertexBuffer: arrayInfo.buffer,
                        componentsPerAttribute: arrayInfo.componentSize,
                        componentDatatype: arrayInfo.componentDataType,
                        normalize: arrayInfo.normalize,
                        offsetInBytes: arrayInfo.bytesOffset,
                        strideInBytes: arrayInfo.bytesStride,
                    })
                });
            taskAtts.push(attTask);
        }
        let index = node.indices;
        if (index != null)
        {
            let indexTask = ParseAccessorNode.parse(index, gltf, context)
                .then(arrayInfo =>
                {
                    vaoOptions.indexBuffer = arrayInfo.buffer as IndexBuffer;
                    vaoOptions.primitiveOffset = arrayInfo.bytesOffset;

                });
            taskAtts.push(indexTask);
        }
        return Promise.all(taskAtts)
            .then(() =>
            {
                let mesh = new StaticMesh();

                mesh.vertexArray = new VertexArray(vaoOptions);
                return mesh;
            });
    }
}
