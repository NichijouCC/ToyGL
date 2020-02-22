import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum, bufferOption, BufferConfig } from "./Buffer";
import { TypedArray } from "../core/TypedArray";
export type vertexBufferOption =
    | {
        context: GraphicsDevice;
        usage?: BufferUsageEnum;
        sizeInBytes: number;
    }
    | {
        context: GraphicsDevice;
        usage?: BufferUsageEnum;
        typedArray: TypedArray;
    };

export class VertexBuffer extends Buffer
{
    // componentSize: number;
    // componentDataType: number;
    // // size?: number;
    // normalize: boolean;
    // bytesStride: number;
    // bytesOffset: number;
    // divisor?: number;
    constructor(options: vertexBufferOption)
    {
        super({ ...options, target: BufferTargetEnum.ARRAY_BUFFER });
    }
}

