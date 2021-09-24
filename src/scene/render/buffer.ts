import { GlType, TypedArray } from "../../core/typedArray";
import { GraphicsDevice, IndexBuffer, IndexDatatypeEnum, IndicesArray, Buffer, BufferTargetEnum } from "../../webgl";

export class GraphicIndexBuffer {
    dataType: IndexDatatypeEnum;
    byteOffset: number;
    count?: number;
    _beDirty: boolean = true;
    private _buffer: GraphicBuffer;
    constructor(options: { data: IndicesArray | GraphicBuffer, datatype?: IndexDatatypeEnum, byteOffset?: number, count?: number }) {
        if (options.data instanceof GraphicBuffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new GraphicBuffer({ data: options.data, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER });
        }
        this.count = options.count;
        this.byteOffset = options.byteOffset ?? 0;

        if (options.datatype) {
            this.dataType = options.datatype;
        } else if (ArrayBuffer.isView(options.data)) {
            this.dataType = GlType.fromTypedArray(options.data);
        } else {
            throw new Error("datatype must be set in params.");
        }
    }

    changeData(options: { data: IndicesArray, datatype?: IndexDatatypeEnum, byteOffset?: number }) {
        this._beDirty = true;
        this._buffer.changeData(options.data);
    }

    private _glTarget: IndexBuffer
    getGlTarget(device: GraphicsDevice) {
        if (this._glTarget == null) {
            let buffer = this._buffer.getGlTarget(device)
            this._glTarget = device.createIndexBuffer({ data: buffer, datatype: this.dataType, bytesOffset: this.byteOffset, count: this.count });
        }
        return this._glTarget;
    }

    bind(device: GraphicsDevice) {
        if (this._beDirty) {
            let buffer = this._buffer.bind(device);
            this._glTarget.update({ data: buffer, datatype: this.dataType, byteOffset: this.byteOffset });
            this._beDirty = false;
        }
        return this._glTarget;
    }
}

export class GraphicBuffer {
    private _typedArray: TypedArray;
    target: BufferTargetEnum;
    _beDirty: boolean = true;
    get data() { return this._typedArray; }
    constructor(opts: { target: BufferTargetEnum, data: TypedArray }) {
        this.target = opts.target;
        this._typedArray = opts.data;
    }

    changeData(data: TypedArray) {
        this._beDirty = true;
        this._typedArray = data;
    }

    private _glTarget: Buffer
    getGlTarget(device: GraphicsDevice) {
        if (this._glTarget == null) {
            this._glTarget = device.createBuffer({ data: this.data, target: this.target });
        }
        return this._glTarget;
    }

    bind(device: GraphicsDevice) {
        if (this._beDirty) {
            this._glTarget.update(this.data);
            this._beDirty = false;
        }
        return this._glTarget;
    }
}