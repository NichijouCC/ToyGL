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
    private _count: number;
    private _computeCount: number;
    private _context: GraphicsDevice;
    get count(): number {
        return this._count ?? this._computeCount;
    }
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
        this._count = options.count;
        if (options.datatype != null) {
            this.datatype = options.datatype;
        } else if (typeof this._buffer.data != "number") {
            this.datatype = TypedArray.getGLType(this._buffer.data);
        } else {
            throw new Error("index buffer datatype need be set in Params");
        }
        this._computeCount = this._buffer.sizeInBytes / GlType.bytesPerElement(this.datatype);

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
    update(options: { data?: TypedArray | number | Buffer, datatype?: number, byteOffset?: number }) {
        if (options.data instanceof Buffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new Buffer(this._context, { ...options, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER } as any);
        }
        if (options.byteOffset) this.bytesOffset = options.byteOffset;
        if (options.datatype != null) {
            this.datatype = options.datatype;
        } else if (typeof this._buffer.data != "number") {
            this.datatype = TypedArray.getGLType(this._buffer.data);
        }
        this._computeCount = this._buffer.sizeInBytes / GlType.bytesPerElement(this.datatype);
    }

    bind() { }
    unbind() { }
    destroy() { }
}

export enum IndexDatatypeEnum {
    Uint16Array = GlConstants.UNSIGNED_SHORT,
    Uint32Array = GlConstants.UNSIGNED_INT,
}
