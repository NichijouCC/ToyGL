import { EventEmitter } from "@mtgoo/ctool";
import { GlType, TypedArray } from "../core/typedArray";
import { GraphicsDevice, IndexBuffer, IndexDatatypeEnum, IndicesArray, Buffer, BufferTargetEnum, BufferUsageEnum } from "../webgl";

interface IObjectEvent {
    BeDirty: void
}

export class GraphicIndexBuffer extends EventEmitter<IObjectEvent> {
    get data(): TypedArray {
        return this._buffer.data;
    }
    set data(value: TypedArray | Array<number>) {
        if (value instanceof Array) {
            this._buffer.data = new Uint16Array(value);
        } else {
            this._buffer.data = value;
        }
        this.beDirty = true;
        this.computeCount();
    }
    private _elements: TypedArray;
    /**
     * 格式化后的数据
     */
    get elements() {
        if (this._elements == null) {
            this._elements = TypedArray.fromGlType(this._dataType, this.data);;
        }
        return this._elements;
    }


    private _dataType: IndexDatatypeEnum;
    get dataType() { return this._dataType }
    set dataType(value: IndexDatatypeEnum) {
        this._dataType = value;
        this.beDirty = true;
        this.computeCount();
    }

    private _byteOffset: number;
    get byteOffset() { return this._byteOffset }
    set byteOffset(value: number) {
        this._byteOffset = value;
        this.beDirty = true;
    }

    private _computeCount: number;
    private _count: number;
    get count() { return this._count ?? this._computeCount }
    set count(value: number) {
        this._count = value;
        this.beDirty = true;
    }

    private _beDirty: boolean = true;
    set beDirty(value: boolean) {
        this._beDirty = value;
        this.emit("BeDirty");
    }
    get beDirty() { return this._beDirty }

    private _buffer: GraphicBuffer;
    constructor(options: IGraphicIndexBufferOptions) {
        super();
        if (options.data instanceof GraphicBuffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new GraphicBuffer({ data: options.data, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER, usage: options.usage });
        }
        this.byteOffset = options.byteOffset ?? 0;
        if (options.datatype) {
            this.dataType = options.datatype;
        } else if (ArrayBuffer.isView(options.data)) {
            this.dataType = GlType.fromTypedArray(options.data);
        } else {
            throw new Error("datatype must be set in params.");
        }
        if (options.count != null) this._count = options.count;
        this.computeCount();
    }

    set(options: Partial<Omit<IGraphicIndexBufferOptions, "data"> & { data: IndicesArray }>) {
        if (options.data) this._buffer.data = options.data;
        if (options.datatype != null) this._dataType = options.datatype;
        if (options.byteOffset != null) this.byteOffset = options.byteOffset;
        if (options.count != null) this._count = options.count;
        this.beDirty = true;
        this.computeCount();
    }

    private computeCount() {
        this._computeCount = this._buffer.data.byteLength / GlType.bytesPerElement(this.dataType);
    }

    private _glTarget: IndexBuffer
    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            let buffer = this._buffer.syncData(device)
            this._glTarget = device.createIndexBuffer({ data: buffer, datatype: this.dataType, bytesOffset: this.byteOffset, count: this._count });
            this._beDirty = false;
        } else if (this._beDirty) {
            this._buffer.syncData(device);
            this._glTarget.set({ datatype: this.dataType, bytesOffset: this.byteOffset, count: this.count })
            this._beDirty = false;
        }
        return this._glTarget;
    }
}

export interface IGraphicIndexBufferOptions {
    data: IndicesArray | GraphicBuffer,
    usage?: BufferUsageEnum,
    datatype?: IndexDatatypeEnum,
    byteOffset?: number,
    count?: number,
}


export class GraphicBuffer extends EventEmitter<IObjectEvent> {
    private _typedArray: TypedArray;
    readonly target: BufferTargetEnum;
    readonly usage: BufferUsageEnum;
    get data() { return this._typedArray; }
    set data(value: TypedArray) {
        this._typedArray = value;
        this.beDirty = true;
    }

    private subData: { subData: TypedArray, byteOffset: number }
    //更新部分数据
    setSubData(subData: TypedArray, byteOffset: number) {
        this.subData = { subData, byteOffset };
        this.beDirty = true;
    }

    private _beDirty: boolean = true;
    set beDirty(value: boolean) {
        this._beDirty = value;
        this.emit("BeDirty");
    }
    get beDirty() { return this._beDirty }
    constructor(opts: { target: BufferTargetEnum, data: TypedArray, usage?: BufferUsageEnum }) {
        super()
        this.target = opts.target;
        this._typedArray = opts.data;
        this.usage = opts.usage ?? BufferUsageEnum.STATIC_DRAW;
    }

    private _glTarget: Buffer
    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            this._glTarget = device.createBuffer({ data: this.data, target: this.target, usage: this.usage });
            this._beDirty = false;
        } else if (this._beDirty) {
            if (this.subData) {
                this._glTarget.set({ partial: this.subData })
            } else {
                this._glTarget.set({ data: this._typedArray })
            }
            this._beDirty = false;
        }
        return this._glTarget;
    }
}