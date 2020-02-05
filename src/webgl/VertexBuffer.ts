import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum, bufferOption, BufferConfig } from "./Buffer";
import { VertexAttribute, IvertexAttribute, IvertexAttributeOption } from "./VertexAttribute";
import { VertexAttEnum } from "./VertexAttEnum";
import { TypedArray } from "../core/TypedArray";
import { IglElement } from "../core/IglElement";
export type vertexBufferOption =
    | {
        context: GraphicsDevice;
        usage: BufferUsageEnum;
        sizeInBytes: number;
    }
    | {
        context: GraphicsDevice;
        usage: BufferUsageEnum;
        typedArray: ArrayBufferView;
    };

export class VertexBuffer extends Buffer
{
    componentSize: number;
    componentDataType: number;
    // size?: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;
    constructor(options: vertexBufferOption)
    {
        super({ ...options, target: BufferTargetEnum.ARRAY_BUFFER });
    }
}


export class VertexValue
{
    value: [] | TypedArray;
    constructor(options: {
        context: GraphicsDevice;
        value: [] | TypedArray;
    })
    {
        this.value = options.value;
    }
}



