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
        this.bytesOffset = 0;
        this.setParams(options);
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
    update(options: { data: TypedArray } & Partial<Omit<IndexBufferOption, "data" | "usage">>) {
        this._buffer.update(options.data);
        this.setParams(options);
    }

    private setParams(options: { count?: number, datatype?: number, bytesOffset?: number }) {
        if (options.bytesOffset) {
            this.bytesOffset = options.bytesOffset;
        }
        if (options.datatype != null) {
            this.datatype = options.datatype;
        } else if (typeof this._buffer.data != "number") {
            this.datatype = TypedArray.getGLType(this._buffer.data);
        } else {
            throw new Error("index buffer datatype need be set in Params");
        }
        if (options.count != null) {
            this.count = options.count;
        } else {
            this.count = this._buffer.sizeInBytes / GlType.bytesPerElement(this.datatype);
        }
    }

    bind() { }
    unbind() { }
    destroy() { }
}

export enum IndexDatatypeEnum {
    Uint16Array = GlConstants.UNSIGNED_SHORT,
    Uint32Array = GlConstants.UNSIGNED_INT,
}
