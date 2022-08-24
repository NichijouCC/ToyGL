import { IGltfJson, IGltfPrimitive } from "./loadGltf";
import { IGltfMeshPrimitive } from "./gltfJsonStruct";
import { ParseMaterialNode } from "./parseMaterialNode";
import { ParseAccessorNode } from "./parseAccessorNode";
import { BoundingBox, BufferTargetEnum, DefaultMaterial, Geometry, GraphicBuffer, GraphicIndexBuffer, IGeometryOptions, Material, vec3, VertexAttEnum } from "../../index";

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
    static parse(index: number, gltf: IGltfJson): Promise<IGltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return gltf.cache.meshNodeCache[index];
        } else {
            const node = gltf.meshes[index];

            const dataArr: Promise<IGltfPrimitive>[] = [];
            if (node.primitives) {
                for (const key in node.primitives) {
                    const primitive = node.primitives[key];
                    const data = this.parsePrimitive(primitive, gltf);
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

    static parsePrimitive(node: IGltfMeshPrimitive, gltf: IGltfJson): Promise<IGltfPrimitive> {
        return Promise.all([
            this.parsePrimitiveVertexData(node, gltf),
            this.parseMaterial(node, gltf)]
        ).then(
            ([geometry, material]) => {
                return { geometry: geometry, material: material };
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

    static parsePrimitiveVertexData(node: IGltfMeshPrimitive, gltf: IGltfJson): Promise<Geometry> {
        const taskAtts: Promise<void>[] = [];
        const geoOpts: IGeometryOptions = { attributes: [] };
        const attributes = node.attributes;
        let box: BoundingBox;
        for (const attName in attributes) {
            const attIndex = attributes[attName];
            const attType = MapGltfAttributeToToyAtt[attName];
            const attTask = ParseAccessorNode.parse(attIndex, gltf)
                .then(arrayInfo => {
                    if (arrayInfo.target != null && arrayInfo.target != BufferTargetEnum.ARRAY_BUFFER) {
                        throw new Error("gltf解析：buffer target 不匹配")
                    }
                    var newBuffer = gltf.cache.bufferCache[arrayInfo.viewIndex];
                    if (newBuffer == null) {
                        newBuffer = new GraphicBuffer({ target: BufferTargetEnum.ARRAY_BUFFER, data: arrayInfo.viewBuffer });
                        gltf.cache.bufferCache[arrayInfo.viewIndex] = newBuffer;
                    } else {
                        console.warn("命中！！");
                    }
                    geoOpts.attributes.push({
                        type: attType,
                        data: newBuffer,
                        componentSize: arrayInfo.componentSize,
                        componentDatatype: arrayInfo.componentDataType,
                        normalize: arrayInfo.normalize ?? false,
                        bytesOffset: arrayInfo.bytesOffset,
                        bytesStride: arrayInfo.bytesStride,
                        count: arrayInfo.count,
                    });

                    if (attType == VertexAttEnum.POSITION && arrayInfo.min && arrayInfo.max) {
                        const min = arrayInfo.min;
                        const max = arrayInfo.max;
                        box = BoundingBox.create(
                            vec3.fromValues((max[0] + min[0]) * 0.5, (max[1] + min[1]) * 0.5, (max[2] + min[2]) * 0.5),
                            vec3.fromValues((max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, (max[2] - min[2]) * 0.5)
                        );
                    }
                });
            taskAtts.push(attTask);
        }
        const index = node.indices;
        if (index != null) {
            const indexTask = ParseAccessorNode.parse(index, gltf,)
                .then(arrayInfo => {
                    if (arrayInfo.target != null && arrayInfo.target != BufferTargetEnum.ELEMENT_ARRAY_BUFFER) {
                        throw new Error("gltf解析：buffer target 不匹配")
                    }
                    geoOpts.indices = new GraphicIndexBuffer({
                        data: arrayInfo.viewBuffer,
                        datatype: arrayInfo.componentDataType,
                        byteOffset: arrayInfo.bytesOffset,
                        count: arrayInfo.count,
                    });
                    geoOpts.bytesOffset = arrayInfo.bytesOffset;
                    geoOpts.count = arrayInfo.count;
                });
            taskAtts.push(indexTask);
        }
        geoOpts.primitiveType = node.mode as any;
        return Promise.all(taskAtts)
            .then(() => {
                const geo = new Geometry(geoOpts);
                geo.bounding = box;
                return geo;
            }).catch(err => {
                console.error("ParseMeshNode->parseMesh error", err);
                return Promise.reject(err);
            });
    }
}
