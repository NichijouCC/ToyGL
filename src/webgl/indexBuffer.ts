import { GraphicsDevice } from "./graphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum, IBufferSetOptions } from "./buffer";
import { GlConstants } from "./glConstant";
import { TypedArray, GlType } from "../core/typedArray";
export type IndicesArray = Uint8Array | Uint16Array | Uint32Array;
export type IndexBufferOption = {
    data: IndicesArray | Buffer;
    usage?: BufferUsageEnum;
    datatype?: IndexDatatypeEnum;
    bytesOffset?: number;
    count?: number;
}
export class IndexBuffer {
    private _context: GraphicsDevice;
    count: number;
    datatype: number;
    bytesOffset: number;
    private _buffer: Buffer;
    constructor(context: GraphicsDevice, options: IndexBufferOption) {
        this._context = context;
        if (options.data instanceof Buffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new Buffer(context, { ...options, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER } as any);
        }
        this.bytesOffset = options.bytesOffset ?? 0;
        this.datatype = options.datatype ?? TypedArray.getGLType(this._buffer.data);
        this.count = options.count ?? this._buffer.byteLength / GlType.bytesPerElement(this.datatype);

        this.bind = () => {
            this._buffer.bind();
        };
        this.unbind = () => {
            this._buffer.unbind();
        };
        this.destroy = () => {
            this._buffer.destroy();
        };
    }
    set(options: Partial<IBufferSetOptions & Omit<IndexBufferOption, "data" | "usage">>) {
        this._buffer.set(options);
        if (options.datatype != null) this.datatype = options.datatype;
        if (options.count != null) this.count = options.count;
        if (options.bytesOffset != null) this.bytesOffset = options.bytesOffset;
    }

    bind() { }
    unbind() { }
    destroy() { }
}

export enum IndexDatatypeEnum {
    Uint16Array = GlConstants.UNSIGNED_SHORT,
    Uint32Array = GlConstants.UNSIGNED_INT,
}
