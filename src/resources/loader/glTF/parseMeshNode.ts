import { IGltfJson, IGltfPrimitive } from "../loadGltf";
import { IGltfMeshPrimitive } from "./gltfJsonStruct";
import { ParseMaterialNode } from "./parseMaterialNode";
import { ParseAccessorNode } from "./parseAccessorNode";
import { VertexAttEnum } from "../../../webgl/vertexAttEnum";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { VertexArray, IVaoOptions } from "../../../webgl/vertexArray";
import { Material } from "../../../scene/asset/material/material";
import { PrimitiveMesh } from "../../../scene/asset/geometry/staticMesh";
import { IndexBuffer } from "../../../webgl/indexBuffer";
import { VertexBuffer } from "../../../webgl/vertexBuffer";
import { BufferTargetEnum } from "../../../webgl/buffer";
import { DefaultMaterial } from "../../defAssets/defaultMaterial";
import { BoundingBox } from "../../../scene/index";
import { vec3 } from "../../../mathD";

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
    static parse(index: number, gltf: IGltfJson, context: GraphicsDevice): Promise<IGltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return gltf.cache.meshNodeCache[index];
        } else {
            const node = gltf.meshes[index];

            const dataArr: Promise<IGltfPrimitive>[] = [];
            if (node.primitives) {
                for (const key in node.primitives) {
                    const primitive = node.primitives[key];
                    const data = this.parsePrimitive(primitive, gltf, context);
                    dataArr.push(data);
                }
            }
            const task = Promise.all(dataArr)
                .catch(err => {
                    console.error("ParseMeshNode error", err);
                    return Promise.reject(err);
                });
            gltf.cache.meshNodeCache[index] = task;
            return task;
        }
    }

    static parsePrimitive(node: IGltfMeshPrimitive, gltf: IGltfJson, context: GraphicsDevice): Promise<IGltfPrimitive> {
        return Promise.all([
            this.parsePrimitiveVertexData(node, gltf, context),
            this.parseMaterial(node, gltf)]
        ).then(
            ([mesh, material]) => {
                return { mesh: mesh, material: material };
            }
        );
    }

    static parseMaterial(node: IGltfMeshPrimitive, gltf: IGltfJson): Promise<Material> {
        const matIndex = node.material;
        if (matIndex != null) {
            return ParseMaterialNode.parse(matIndex, gltf);
        } else {
            return Promise.resolve(DefaultMaterial.color_3d.clone());
        }
    }

    static parsePrimitiveVertexData(node: IGltfMeshPrimitive, gltf: IGltfJson, context: GraphicsDevice): Promise<PrimitiveMesh> {
        const taskAtts: Promise<void>[] = [];
        const vaoOptions: IVaoOptions = { vertexAttributes: [], context };
        const attributes = node.attributes;
        let aabb: BoundingBox;
        for (const attName in attributes) {
            const attIndex = attributes[attName];
            const attType = MapGltfAttributeToToyAtt[attName];
            const attTask = ParseAccessorNode.parse(attIndex, gltf, { target: BufferTargetEnum.ARRAY_BUFFER, context })
                .then(arrayInfo => {
                    vaoOptions.vertexAttributes.push({
                        type: attType,
                        vertexBuffer: arrayInfo.buffer as VertexBuffer,
                        componentsPerAttribute: arrayInfo.componentSize,
                        componentDatatype: arrayInfo.componentDataType,
                        normalize: arrayInfo.normalize ?? false,
                        offsetInBytes: arrayInfo.bytesOffset,
                        strideInBytes: arrayInfo.bytesStride
                    });

                    if (attType == VertexAttEnum.POSITION && arrayInfo.min && arrayInfo.max) {
                        let min = arrayInfo.min;
                        let max = arrayInfo.max;
                        aabb = BoundingBox.create(
                            vec3.fromValues((max[0] + min[0]) * 0.5, (max[1] + min[1]) * 0.5, (max[2] + min[2]) * 0.5),
                            vec3.fromValues((max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, (max[2] - min[2]) * 0.5)
                        );
                    }
                });
            taskAtts.push(attTask);
        }
        const index = node.indices;
        if (index != null) {
            const indexTask = ParseAccessorNode.parse(index, gltf, { target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER, context })
                .then(arrayInfo => {
                    let indexBuffer = arrayInfo.buffer as IndexBuffer;
                    vaoOptions.indexBuffer = indexBuffer;
                    vaoOptions.primitiveByteOffset = arrayInfo.bytesOffset;
                    vaoOptions.primitiveCount = arrayInfo.count;
                });
            taskAtts.push(indexTask);
        }
        vaoOptions.primitiveType = node.mode as any;
        return Promise.all(taskAtts)
            .then(() => {
                const mesh = new PrimitiveMesh();
                mesh.vertexArray = new VertexArray(vaoOptions);
                mesh.boundingBox = aabb;
                return mesh;
            }).catch(err => {
                console.error("ParseMeshNode->parseMesh error", err);
                return Promise.reject(err);
            })
    }
}
