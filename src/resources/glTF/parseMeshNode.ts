import { IgltfJson, IgltfPrimitive } from "./loadglTF";
import { IgltfMeshPrimitive, AccessorComponentType } from "./gltfJsonStruct";
// import { Material } from "../assets/material";
import { ParseMaterialNode } from "./parseMaterialNode";
// import { Geometry } from "../assets/geometry";
import { ParseAccessorNode } from "./parseAccessorNode";
import { Geometry, IgeometryOptions } from "../../scene/geometry/Geometry";
import { GeometryAttribute } from "../../scene/geometry/GeometryAttribute";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { Mesh } from "../../scene/MeshInstance";
import { VertexArray } from "../../webgl/VertextArray";
import { TypedArray } from "../../core/TypedArray";
import { Material } from "../../scene/Material";

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

    static parseMesh(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<Mesh>
    {
        let mesh = new Mesh();
        mesh.mode = node.mode as any;
        let taskAtts: Promise<void>[] = [];

        let geometryOp: IgeometryOptions = {};
        geometryOp.primitiveType = node.mode;

        let attributes = node.attributes;
        for (let attName in attributes)
        {
            let attIndex = attributes[attName];
            let attType = MapGltfAttributeToToyAtt[attName];
            let attTask = ParseAccessorNode.parse(attIndex, gltf).then(arrayInfo =>
            {
                geometryOp.attributes[attName] = {
                    componentDatatype: arrayInfo.componentDataType,
                    componentsPerAttribute: arrayInfo.componentSize,
                    normalize: arrayInfo.normalize,
                    values: arrayInfo.typedArray,
                    type: attType
                };
            });
            taskAtts.push(attTask);
        }
        let index = node.indices;
        if (index != null)
        {
            let indexTask = ParseAccessorNode.parse(index, gltf).then(arrayInfo =>
            {
                geometryOp.indices = arrayInfo.typedArray as any;
                mesh.count = arrayInfo.count;
                mesh.offset = arrayInfo.bytesOffset / TypedArray.bytesPerElement(arrayInfo.typedArray);
            });
            taskAtts.push(indexTask);
        }
        return Promise.all(taskAtts).then(() =>
        {
            mesh.vertexArray = VertexArray.fromGeometry({
                geometry: new Geometry(geometryOp),
                context
            });
            return mesh;
        });
    }
}
