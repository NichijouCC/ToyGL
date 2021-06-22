import { GraphicsDevice } from "./graphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./buffer";
import { TypedArray } from "../core/typedArray";

export type VertexBufferOption = {
        context: GraphicsDevice;
        usage?: BufferUsageEnum;
        sizeInBytes: number;
    }
    | {
        context: GraphicsDevice;
        usage?: BufferUsageEnum;
        typedArray: TypedArray;
    };

export class VertexBuffer extends Buffer {
    constructor(options: VertexBufferOption) {
        super({ ...options, target: BufferTargetEnum.ARRAY_BUFFER });
    }
}
