import { GraphicsDevice } from "./graphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./buffer";
import { GlConstants } from "./glConstant";
import { TypedArray, GlType } from "../core/typedArray";
export type IndicesArray = Uint8Array | Uint16Array | Uint32Array;
export type IndexBufferOption = {
    data: number | IndicesArray | Buffer;
    usage?: BufferUsageEnum;
    datatype?: IndexDatatypeEnum;
    bytesOffset?: number;
    count?: number;
}
export class IndexBuffer {
    private _context: GraphicsDevice;
    private _count: number;
    get count() { return this._count };
    private _datatype: number;
    get datatype() { return this._datatype };
    private _bytesOffset: number;
    get bytesOffset() { return this._bytesOffset };
    private _buffer: Buffer;
    constructor(context: GraphicsDevice, options: IndexBufferOption) {
        this._context = context;
        if (options.data instanceof Buffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new Buffer(context, { ...options, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER } as any);
        }
        this._bytesOffset = 0;
        if (options.bytesOffset != null) {
            this._bytesOffset = options.bytesOffset;
        }
        if (options.datatype != null) {
            this._datatype = options.datatype;
        } else if (typeof this._buffer.data != "number") {
            this._datatype = TypedArray.getGLType(this._buffer.data);
        } else {
            throw new Error("index buffer datatype need be set in Params");
        }
        if (options.count != null) {
            this._count = options.count;
        } else {
            this._count = this._buffer.sizeInBytes / GlType.bytesPerElement(this._datatype);
        }

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
    set(options: Partial<{ data: TypedArray } & Omit<IndexBufferOption, "data" | "usage">>) {
        if (options.data != null) this._buffer.set(options.data);
        if (options.datatype != null) this._datatype = options.datatype;
        if (options.count != null) this._count = options.count;
        if (options.bytesOffset != null) this._bytesOffset = options.bytesOffset;
    }

    bind() { }
    unbind() { }
    destroy() { }
}

export enum IndexDatatypeEnum {
    Uint16Array = GlConstants.UNSIGNED_SHORT,
    Uint32Array = GlConstants.UNSIGNED_INT,
}
