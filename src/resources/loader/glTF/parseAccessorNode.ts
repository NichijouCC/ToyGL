import { IGltfBufferView, IGltfJson } from "../loadGltf";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { BufferTargetEnum } from "../../../webgl/buffer";
import { TypedArray } from "../../../core/typedArray";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { GraphicBuffer } from "../../../scene/render/buffer";

export interface IaccessorData {
    componentSize: number;
    componentDataType: number;
    count: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride?: number;
    target?: BufferTargetEnum;
    typedArray: TypedArray;
    buffer?: GraphicBuffer;
    min?: number[];
    max?: number[];
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
    static async parse(index: number, gltf: IGltfJson, _target?: BufferTargetEnum): Promise<IaccessorData> {
        const arrayInfo: IaccessorData = {} as any;
        // return new Promise<AccessorNode>((resolve,reject)=>{
        const accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.normalize = accessor.normalized;
        arrayInfo.min = accessor.min;
        arrayInfo.max = accessor.max;

        if (accessor.bufferView != null) {
            const viewIndex = accessor.bufferView;
            const value = await ParseBufferViewNode.parse(viewIndex, gltf);
            const hasSparse = accessor.sparse != null;
            arrayInfo.bytesOffset = accessor.byteOffset ?? 0;
            arrayInfo.bytesStride = value.byteStride;
            arrayInfo.target = value.target;
            let typedArray = TypedArray.fromGlType(accessor.componentType, value.viewBuffer);
            if (hasSparse) {
                typedArray = typedArray.slice(0);
                const indicesInfo = accessor.sparse.indices;
                const valuesInfo = accessor.sparse.values;

                const count = accessor.sparse.count;

                await Promise.all([
                    ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                    ParseBufferViewNode.parse(valuesInfo.bufferView, gltf)
                ]).then(arr => {
                    const indicesArr = TypedArray.fromGlType(indicesInfo.componentType, arr[0].viewBuffer, indicesInfo.byteOffset);
                    const sparseValueArr = TypedArray.fromGlType(accessor.componentType, arr[1].viewBuffer, valuesInfo.byteOffset);

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
            if (_target != null || value.target != null) {
                const target = _target || value.target;
                if (!hasSparse) {
                    var newBuffer = gltf.cache.bufferCache[viewIndex];
                    if (newBuffer == null) {
                        newBuffer = new GraphicBuffer({ target: target, data: value.viewBuffer });
                        gltf.cache.bufferCache[viewIndex] = newBuffer;
                    } else {
                        console.warn("命中！！");
                    }
                    arrayInfo.buffer = newBuffer;
                } else {
                    arrayInfo.buffer = new GraphicBuffer({ target: target, data: value.viewBuffer });
                }

                // switch (target) {
                //     case BufferTargetEnum.ARRAY_BUFFER:
                //         if (!hasSparse) {
                //             var newVertexBuffer = gltf.cache.vertexBufferCache[viewIndex];
                //             if (newVertexBuffer == null) {
                //                 newVertexBuffer = new GraphicVertexBuffer(value.viewBuffer, accessor.componentType as any);
                //                 gltf.cache.vertexBufferCache[viewIndex] = newVertexBuffer;
                //             } else {
                //                 console.warn("命中！！");
                //             }
                //             arrayInfo.buffer = newVertexBuffer;
                //         } else {
                //             arrayInfo.buffer = new GraphicVertexBuffer(typedArray);
                //         }
                //         break;
                //     case BufferTargetEnum.ELEMENT_ARRAY_BUFFER:
                //         if (!hasSparse) {
                //             let newIndexBuffer = gltf.cache.indexBufferCache[viewIndex];
                //             if (newIndexBuffer == null) {
                //                 newIndexBuffer = new GraphicIndexBuffer(value.viewBuffer, accessor.componentType as any);
                //                 gltf.cache.indexBufferCache[viewIndex] = newIndexBuffer;
                //             } else {
                //                 console.warn("命中！！");
                //             }
                //             arrayInfo.buffer = newIndexBuffer;
                //         } else {
                //             arrayInfo.buffer = new GraphicIndexBuffer(typedArray as any);
                //         }

                //         break;
                //     default:
                //         console.error("why ！！");
                //         break;
                // }
            }
            return arrayInfo;
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
