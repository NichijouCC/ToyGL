import { AccessorComponentType } from "./gltfJsonStruct";
import { IgltfJson } from "./loadglTF";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { BufferTargetEnum, Buffer, BufferUsageEnum } from "../../webgl/Buffer";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { getTypedArray, getTypeArrCtorFromGLtype, getByteSizeFromGLtype, TypedArray } from "../../core/TypedArray";

export interface IaccessorData
{
    componentSize: number;
    componentDataType: number;
    count: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    typedArray: TypedArray;
    buffer: Buffer;
}

export class ParseAccessorNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<IaccessorData>
    {
        let arrayInfo: IaccessorData = {} as any;
        // return new Promise<AccessorNode>((resolve,reject)=>{
        let accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.normalize = accessor.normalized;

        if (accessor.bufferView != null)
        {
            let viewindex = accessor.bufferView;
            return ParseBufferViewNode.parse(viewindex, gltf).then(value =>
            {
                let typedArray = getTypedArray(value.viewBuffer, accessor.componentType) as any;
                arrayInfo.bytesOffset = accessor.byteOffset;
                arrayInfo.bytesStride = value.byteStride;

                if (accessor.sparse != null)
                {
                    typedArray = typedArray.slice(0);
                    let indicesInfo = accessor.sparse.indices;
                    let valuesInfo = accessor.sparse.values;

                    let count = accessor.sparse.count;

                    Promise.all([
                        ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                        ParseBufferViewNode.parse(valuesInfo.bufferView, gltf),
                    ]).then(arr =>
                    {
                        let indicesArr = getTypedArray(arr[0].viewBuffer, indicesInfo.componentType, indicesInfo.byteOffset)
                        let sparseValueArr = getTypedArray(arr[1].viewBuffer, accessor.componentType, valuesInfo.byteOffset);

                        let componentNumber = this.getComponentSize(accessor.type);
                        for (let i = 0; i < count; i++)
                        {
                            let index = indicesArr[i];
                            for (let k = 0; k < componentNumber; k++)
                            {
                                typedArray[index + k] = sparseValueArr[index + k];
                            }
                        }
                    });
                }
                arrayInfo.typedArray = typedArray;
                arrayInfo.buffer = value.target == BufferTargetEnum.ARRAY_BUFFER ?
                    Buffer.createVertexBuffer({
                        context,
                        typedArray,
                    }) : Buffer.createIndexBuffer({
                        context,
                        typedArray,
                    })
                return arrayInfo;
            });
        } else
        {
            throw new Error("accessor.bufferView is null");
        }
    }

    private static getComponentSize(type: string): number
    {
        switch (type)
        {
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
