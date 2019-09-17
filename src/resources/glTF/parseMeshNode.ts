import { IgltfJson, IgltfPrimitive } from "./loadglTF";
import { IgltfMeshPrimitive, AccessorComponentType } from "./gltfJsonStruct";
import { Material } from "../assets/material";
import { ParseMaterialNode } from "./parseMaterialNode";
import { Geometry } from "../assets/geometry";
import { IgeometryOptions, IgeometryInfo } from "../../render/webglRender";
import { ParseAccessorNode } from "./parseAccessorNode";
import { VertexAttEnum } from "../../render/vertexAttType";
import { IviewData } from "twebgl/dist/types/type";

const MapGltfAttributeToToyAtt = {
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
    static parse(index: number, gltf: IgltfJson): Promise<IgltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return gltf.cache.meshNodeCache[index];
        } else {
            let node = gltf.meshes[index];

            let dataArr: Promise<IgltfPrimitive>[] = [];
            if (node.primitives) {
                for (let key in node.primitives) {
                    let primitive = node.primitives[key];
                    let data = this.parsePrimitive(primitive, gltf);
                    dataArr.push(data);
                }
            }
            let task = Promise.all(dataArr).then(value => {
                //---------------add to cache

                return value;
            });
            gltf.cache.meshNodeCache[index] = task;
            return task;
        }
    }

    static parsePrimitive(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<IgltfPrimitive> {
        return Promise.all([this.parseGeometry(node, gltf), this.parseMaterial(node, gltf)]).then(
            ([geometry, material]) => {
                return { geometry: geometry, material: material };
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

    static parseGeometry(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Geometry> {
        let attributes = node.attributes;
        let index = node.indices;

        let geometryOp: IgeometryOptions = { atts: {} };
        let taskAtts: Promise<void>[] = [];

        for (let attName in attributes) {
            let attIndex = attributes[attName];
            let attTask = ParseAccessorNode.parse(attIndex, gltf).then(arrayInfo => {
                geometryOp.atts[attName] = arrayInfo;
            });
            taskAtts.push(attTask);
        }
        if (index != null) {
            let indexTask = ParseAccessorNode.parse(index, gltf).then(arrayInfo => {
                geometryOp.indices = arrayInfo;
            });
            taskAtts.push(indexTask);
        }
        return Promise.all(taskAtts).then(() => {
            let newGeometry = Geometry.fromCustomData(geometryOp);

            // this.getTypedValueArr(newGeometry, geometryOp);
            return newGeometry;
        });
    }

    /**
     * 将buffer数据分割成对应的 typedarray，例如 positions[i]=new floa32array();
     * @param newGeometry
     * @param geometryOp
     */
    private static getTypedValueArr(newGeometry: any, geometryOp: IgeometryOptions) {
        for (const key in geometryOp.atts) {
            const element = geometryOp.atts[key] as IviewData;
            let strideInBytes =
                element.bytesStride || this.getByteSize(element.componentDataType, element.componentSize);

            let dataArr = [];

            for (let i = 0; i < element.count; i++) {
                let value = this.GetTypedArry(
                    element.componentDataType,
                    element.value as Uint8Array,
                    i * strideInBytes + element.bytesOffset,
                    element.componentSize,
                );
                dataArr.push(value);
            }
            newGeometry[key] = dataArr;
        }
        if (geometryOp.indices) {
            const element = geometryOp.indices as IviewData;

            let strideInBytes =
                element.bytesStride || this.getByteSize(element.componentDataType, element.componentSize);

            let dataArr = [];

            for (let i = 0; i < element.count; i++) {
                let value = this.GetTypedArry(
                    element.componentDataType,
                    element.value as Uint8Array,
                    i * strideInBytes + element.bytesOffset,
                    element.componentSize,
                );
                dataArr.push(value);
            }
            newGeometry["indices"] = dataArr;
        }

        console.warn(newGeometry);
    }
    static GetTypedArry(
        componentType: AccessorComponentType,
        bufferview: ArrayBufferView,
        byteOffset: number,
        Len: number,
    ) {
        let buffer = bufferview.buffer;
        byteOffset = bufferview.byteOffset + (byteOffset || 0);
        switch (componentType) {
            case AccessorComponentType.BYTE:
                return new Int8Array(buffer, byteOffset, Len);
            case AccessorComponentType.UNSIGNED_BYTE:
                return new Uint8Array(buffer, byteOffset, Len);
            case AccessorComponentType.SHORT:
                return new Int16Array(buffer, byteOffset, Len);
            case AccessorComponentType.UNSIGNED_SHORT:
                return new Uint16Array(buffer, byteOffset, Len);
            case AccessorComponentType.UNSIGNED_INT:
                return new Uint32Array(buffer, byteOffset, Len);
            case AccessorComponentType.FLOAT: {
                if ((byteOffset / 4) % 1 != 0) {
                    console.error("??");
                }
                return new Float32Array(buffer, byteOffset, Len);
            }
            default:
                throw new Error(`Invalid component type ${componentType}`);
        }
    }
    private static getByteSize(componentType: number, componentSize: number): number {
        switch (componentType) {
            case AccessorComponentType.BYTE:
                return componentSize * Int8Array.BYTES_PER_ELEMENT;
            case AccessorComponentType.UNSIGNED_BYTE:
                return componentSize * Uint8Array.BYTES_PER_ELEMENT;
            case AccessorComponentType.SHORT:
                return componentSize * Int16Array.BYTES_PER_ELEMENT;
            case AccessorComponentType.UNSIGNED_SHORT:
                return componentSize * Uint16Array.BYTES_PER_ELEMENT;
            case AccessorComponentType.UNSIGNED_INT:
                return componentSize * Uint32Array.BYTES_PER_ELEMENT;
            case AccessorComponentType.FLOAT:
                return componentSize * Float32Array.BYTES_PER_ELEMENT;
            default:
                throw new Error(`Invalid component type ${componentType}`);
        }
    }
}
