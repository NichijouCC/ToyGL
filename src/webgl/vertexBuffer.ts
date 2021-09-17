import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./buffer";
import { bufferOption } from "./buffer";

export class VertexBuffer extends Buffer {
    constructor(options: bufferOption) {
        super({ ...options, target: BufferTargetEnum.ARRAY_BUFFER });
    }
}
