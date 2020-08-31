import { IgltfJson, IgltfPrimitive } from "../loadglTF";
import { IgltfMeshPrimitive, AccessorComponentType } from "./gltfJsonStruct";
// import { Material } from "../assets/material";
import { ParseMaterialNode } from "./parseMaterialNode";
// import { Geometry } from "../assets/geometry";
import { ParseAccessorNode } from "./parseAccessorNode";
import { VertexAttEnum } from "../../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { VertexArray, IvaoOptions } from "../../../webgl/VertextArray";
import { Material } from "../../../scene/asset/material/material";
import { StaticMesh, SubMesh } from "../../../scene/asset/geometry/staticMesh";
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
    JOINTS_0: VertexAttEnum.JOINTS_0
};
export class ParseMeshNode {
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<IgltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return gltf.cache.meshNodeCache[index];
        } else {
            const node = gltf.meshes[index];

            const dataArr: Promise<IgltfPrimitive>[] = [];
            if (node.primitives) {
                for (const key in node.primitives) {
                    const primitive = node.primitives[key];
                    const data = this.parsePrimitive(primitive, gltf, context);
                    dataArr.push(data);
                }
            }
            const task = Promise.all(dataArr);
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
            }
        );
    }

    static parseMaterial(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Material> {
        const matindex = node.material;
        if (matindex != null) {
            return ParseMaterialNode.parse(matindex, gltf);
        } else {
            return Promise.resolve(null);
        }
    }

    static parseMesh(node: IgltfMeshPrimitive, gltf: IgltfJson, context: GraphicsDevice): Promise<SubMesh> {
        const taskAtts: Promise<void>[] = [];
        const vaoOptions: IvaoOptions = { vertexAttributes: [], context };
        const attributes = node.attributes;
        for (const attName in attributes) {
            const attIndex = attributes[attName];
            const attType = MapGltfAttributeToToyAtt[attName];
            const attTask = ParseAccessorNode.parse(attIndex, gltf, { target: BufferTargetEnum.ARRAY_BUFFER, context })
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
                        strideInBytes: arrayInfo.bytesStride
                    });
                });
            taskAtts.push(attTask);
        }
        const index = node.indices;
        if (index != null) {
            const indexTask = ParseAccessorNode.parse(index, gltf, { target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER, context })
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
                const mesh = new SubMesh();
                mesh.vertexArray = new VertexArray(vaoOptions);
                return mesh;
            });
    }
}
