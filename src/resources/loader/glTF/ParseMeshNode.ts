import { IgltfJson, IgltfPrimitive } from "../LoadglTF";
import { IgltfMeshPrimitive, AccessorComponentType } from "./GltfJsonStruct";
// import { Material } from "../assets/material";
import { ParseMaterialNode } from "./ParseMaterialNode";
// import { Geometry } from "../assets/geometry";
import { ParseAccessorNode } from "./ParseAccessorNode";
import { VertexAttEnum } from "../../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { VertexArray, IvaoOptions } from "../../../webgl/VertextArray";
import { TypedArray } from "../../../core/TypedArray";
import { Material } from "../../../scene/asset/Material";
import { StaticMesh, SubMesh } from "../../../scene/asset/geometry/StaticMesh";
import { IndexBuffer, IndicesArray } from "../../../webgl/IndexBuffer";
import { VertexBuffer } from "../../../webgl/VertexBuffer";
import { BufferTargetEnum } from "../../../webgl/Buffer";

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
export class ParseMeshNode {
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<IgltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return gltf.cache.meshNodeCache[index];
        } else {
            let node = gltf.meshes[index];

            let dataArr: Promise<IgltfPrimitive>[] = [];
            if (node.primitives) {
                for (let key in node.primitives) {
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

    static parsePrimitive(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<IgltfPrimitive> {
        return Promise.all([
            this.parseMesh(node, gltf, context),
            this.parseMaterial(node, gltf)]
        ).then(
            ([mesh, material]) => {
                return { mesh: mesh, material: material };
            },
        );
    }

    static parseMaterial(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Material> {
        let matindex = node.material;
        if (matindex != null) {
            return ParseMaterialNode.parse(matindex, gltf);
        } else {
            return Promise.resolve(null);
        }
    }

    static parseMesh(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<SubMesh> {
        let taskAtts: Promise<void>[] = [];
        let vaoOptions: IvaoOptions = { vertexAttributes: [], context };
        let attributes = node.attributes;
        for (let attName in attributes) {
            let attIndex = attributes[attName];
            let attType = MapGltfAttributeToToyAtt[attName];
            let attTask = ParseAccessorNode.parse(attIndex, gltf, { target: BufferTargetEnum.ARRAY_BUFFER, context })
                .then(arrayInfo => {
                    vaoOptions.vertexAttributes.push({
                        type: attType,
                        vertexBuffer: arrayInfo.buffer as VertexBuffer ?? new VertexBuffer({
                            context,
                            typedArray: arrayInfo.typedArray
                        }),
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
        if (index != null) {
            let indexTask = ParseAccessorNode.parse(index, gltf, { target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER, context })
                .then(arrayInfo => {
                    if (!(arrayInfo.typedArray instanceof Uint8Array || arrayInfo.typedArray instanceof Uint16Array || arrayInfo.typedArray instanceof Uint32Array)) {
                        console.error("index data type not Uint16Array or Uint32Array!");
                    }
                    vaoOptions.indexBuffer = arrayInfo.buffer as IndexBuffer ?? new IndexBuffer({ context, typedArray: arrayInfo.typedArray as IndicesArray });
                    vaoOptions.primitiveByteOffset = arrayInfo.bytesOffset;
                    vaoOptions.primitiveCount = arrayInfo.count;
                });
            taskAtts.push(indexTask);
        }
        return Promise.all(taskAtts)
            .then(() => {
                let mesh = new SubMesh();
                mesh.vertexArray = new VertexArray(vaoOptions);
                return mesh;
            });
    }
}
