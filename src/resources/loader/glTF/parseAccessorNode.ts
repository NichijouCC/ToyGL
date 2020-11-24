import { IgltfJson } from "../loadglTF";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { BufferTargetEnum, Buffer, BufferUsageEnum } from "../../../webgl/buffer";
import { TypedArray } from "../../../core/typedArray";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { IndexBuffer } from "../../../webgl/indexBuffer";
import { VertexBuffer } from "../../../webgl/vertexBuffer";

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
        const result: any[] = [];
        const { typedArray, componentSize, bytesStride, bytesOffset } = data;
        const startOffset = bytesOffset / typedArray.BYTES_PER_ELEMENT;
        let elementOffset = 0;
        if (bytesStride > 0) {
            elementOffset = bytesStride / typedArray.BYTES_PER_ELEMENT;
        };
        for (let i = 0; i < data.count; i++) {
            const start = startOffset + i * componentSize + i * elementOffset;
            result.push(typedArray.subarray(start, componentSize + start));
        }
        return result;
    }
}

export class ParseAccessorNode {
    static parse(index: number, gltf: IgltfJson, bufferOptions?: { target?: BufferTargetEnum, context: GraphicsDevice }): Promise<IaccessorData> {
        const arrayInfo: IaccessorData = {} as any;
        // return new Promise<AccessorNode>((resolve,reject)=>{
        const accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.normalize = accessor.normalized;

        if (accessor.bufferView != null) {
            const viewindex = accessor.bufferView;
            return ParseBufferViewNode.parse(viewindex, gltf)
                .then(value => {
                    let canUseCache = true;
                    // let typedArray = getTypedArray(value.viewBuffer, accessor.componentType) as any;
                    let typedArray = TypedArray.fromGlType(accessor.componentType, value.viewBuffer);


                    arrayInfo.bytesOffset = accessor.byteOffset ?? 0;
                    arrayInfo.bytesStride = value.byteStride;
                    arrayInfo.target = value.target;

                    if (accessor.sparse != null) {
                        canUseCache = false;
                        typedArray = typedArray.slice(0);
                        const indicesInfo = accessor.sparse.indices;
                        const valuesInfo = accessor.sparse.values;

                        const count = accessor.sparse.count;

                        Promise.all([
                            ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                            ParseBufferViewNode.parse(valuesInfo.bufferView, gltf)
                        ]).then(arr => {
                            // const indicesArr = getTypedArray(arr[0].viewBuffer, indicesInfo.componentType, indicesInfo.byteOffset);
                            // const sparseValueArr = getTypedArray(arr[1].viewBuffer, accessor.componentType, valuesInfo.byteOffset);

                            let indicesArr = TypedArray.fromGlType(indicesInfo.componentType, arr[0].viewBuffer, indicesInfo.byteOffset);
                            let sparseValueArr = TypedArray.fromGlType(accessor.componentType, arr[1].viewBuffer, valuesInfo.byteOffset);

                            const componentNumber = this.getComponentSize(accessor.type);
                            for (let i = 0; i < count; i++) {
                                const index = indicesArr[i];
                                for (let k = 0; k < componentNumber; k++) {
                                    typedArray[index + k] = sparseValueArr[index + k];
                                }
                            }
                        });
                    }
                    arrayInfo.typedArray = typedArray;
                    if (bufferOptions != null || value.target != null) {
                        const context = bufferOptions.context;
                        const target = bufferOptions.target || value.target;
                        switch (target) {
                            case BufferTargetEnum.ARRAY_BUFFER:
                                if (canUseCache) {
                                    var newVertexBuffer = gltf.cache.vertexBufferCache[viewindex];
                                    if (newVertexBuffer == null) {
                                        newVertexBuffer = new VertexBuffer({ context, typedArray });
                                        gltf.cache.vertexBufferCache[viewindex] = newVertexBuffer;
                                    } else {
                                        console.warn("命中！！");
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
                                        newIndexBuffer = new IndexBuffer({ context, typedArray: typedArray as any });
                                        gltf.cache.indexBufferCache[viewindex] = newIndexBuffer;
                                    } else {
                                        console.warn("命中！！");
                                    }
                                    arrayInfo.buffer = newIndexBuffer;
                                } else {
                                    arrayInfo.buffer = new IndexBuffer({ context, typedArray: typedArray as any });
                                }

                                break;
                            default:
                                console.error("why ！！");
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
