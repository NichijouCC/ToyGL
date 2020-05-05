import { AccessorComponentType } from "./GltfJsonStruct";
import { IgltfJson } from "../LoadglTF";
import { ParseBufferViewNode } from "./ParseBufferViewNode";
import { BufferTargetEnum, Buffer, BufferUsageEnum } from "../../../webgl/Buffer";
import { getTypedArray, getTypeArrCtorFromGLtype, getByteSizeFromGLtype, TypedArray } from "../../../core/TypedArray";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { IndexBuffer } from "../../../webgl/IndexBuffer";
import { VertexBuffer } from "../../../webgl/VertexBuffer";


export interface IaccessorData {
    componentSize: number;
    componentDataType: number;
    count: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride?: number;
    target?: BufferTargetEnum;
    typedArray: TypedArray;

    buffer?: Buffer;
}


export namespace Accessor {
    export function getTypedData(data: IaccessorData) {
        let result: any[] = [];
        let { typedArray, componentSize, bytesStride, bytesOffset } = data;
        let startOffset = bytesOffset / typedArray.BYTES_PER_ELEMENT;
        let elementOffset = 0;
        if (bytesStride > 0) {
            elementOffset = bytesStride / typedArray.BYTES_PER_ELEMENT;
        };
        for (let i = 0; i < data.count; i++) {
            let start = startOffset + i * componentSize + i * elementOffset;
            result.push(typedArray.subarray(start, componentSize + start));
        }
        return result;
    }
}


export class ParseAccessorNode {
    static parse(index: number, gltf: IgltfJson, bufferOptions?: { target?: BufferTargetEnum, context: GraphicsDevice }): Promise<IaccessorData> {
        let arrayInfo: IaccessorData = {} as any;
        // return new Promise<AccessorNode>((resolve,reject)=>{
        let accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.normalize = accessor.normalized;

        if (accessor.bufferView != null) {
            let viewindex = accessor.bufferView;
            return ParseBufferViewNode.parse(viewindex, gltf)
                .then(value => {
                    let canUseCache = true;
                    let typedArray = getTypedArray(value.viewBuffer, accessor.componentType) as any;

                    arrayInfo.bytesOffset = accessor.byteOffset ?? 0;
                    arrayInfo.bytesStride = value.byteStride;
                    arrayInfo.target = value.target;

                    if (accessor.sparse != null) {
                        canUseCache = false;
                        typedArray = typedArray.slice(0);
                        let indicesInfo = accessor.sparse.indices;
                        let valuesInfo = accessor.sparse.values;

                        let count = accessor.sparse.count;

                        Promise.all([
                            ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                            ParseBufferViewNode.parse(valuesInfo.bufferView, gltf),
                        ]).then(arr => {
                            let indicesArr = getTypedArray(arr[0].viewBuffer, indicesInfo.componentType, indicesInfo.byteOffset)
                            let sparseValueArr = getTypedArray(arr[1].viewBuffer, accessor.componentType, valuesInfo.byteOffset);

                            let componentNumber = this.getComponentSize(accessor.type);
                            for (let i = 0; i < count; i++) {
                                let index = indicesArr[i];
                                for (let k = 0; k < componentNumber; k++) {
                                    typedArray[index + k] = sparseValueArr[index + k];
                                }
                            }
                        });
                    }
                    arrayInfo.typedArray = typedArray;
                    if (bufferOptions != null || value.target != null) {
                        let context = bufferOptions.context;
                        let target = bufferOptions.target || value.target;
                        switch (target) {
                            case BufferTargetEnum.ARRAY_BUFFER:
                                if (canUseCache) {
                                    var newVertexBuffer = gltf.cache.vertexBufferCache[viewindex];
                                    if (newVertexBuffer == null) {
                                        newVertexBuffer = new VertexBuffer({ context, typedArray });
                                        gltf.cache.vertexBufferCache[viewindex] = newVertexBuffer;
                                    } else {
                                        console.warn("命中！！")

                                    }
                                    arrayInfo.buffer = newVertexBuffer;
                                } else {
                                    arrayInfo.buffer = new VertexBuffer({ context, typedArray });
                                }
                                break;
                            case BufferTargetEnum.ELEMENT_ARRAY_BUFFER:
                                if (canUseCache) {
                                    let newIndexBuffer = gltf.cache.indexBufferCache[viewindex];
                                    if (newIndexBuffer == null) {
                                        newIndexBuffer = new IndexBuffer({ context, typedArray });
                                        gltf.cache.indexBufferCache[viewindex] = newIndexBuffer;
                                    } else {
                                        console.warn("命中！！")
                                    }
                                    arrayInfo.buffer = newIndexBuffer;
                                } else {
                                    arrayInfo.buffer = new IndexBuffer({ context, typedArray });
                                }

                                break;
                            default:
                                console.error("why ！！")
                                break;
                        }
                    }
                    return arrayInfo;
                });
        } else {
            throw new Error("accessor.bufferView is null");
        }
    }

    private static getComponentSize(type: string): number {
        switch (type) {
            case "SCALAR":
                return 1;
            case "VEC2":
                return 2;
            case "VEC3":
                return 3;
            case "VEC4":
            case "MAT2":
                return 4;
            case "MAT3":
                return 9;
            case "MAT4":
                return 16;
        }
    }
}
