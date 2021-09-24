import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./buffer";
import { bufferOption } from "./buffer";
import { GraphicsDevice } from "./graphicsDevice";

export class VertexBuffer extends Buffer {
    constructor(context: GraphicsDevice, options: bufferOption) {
        super(context, { ...options, target: BufferTargetEnum.ARRAY_BUFFER });
    }
}
