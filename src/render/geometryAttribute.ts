import { EventEmitter } from "@mtgoo/ctool";
import { GlType, TypedArray } from "../core/typedArray";
import { BufferTargetEnum, GraphicsDevice, VertexAttribute, VertexAttEnum, ComponentDatatypeEnum, BufferUsageEnum } from "../webgl";
import { GraphicBuffer } from "./buffer";
/**
 * 
 * @example useage
 * ```
 * let pos= new GeometryAttribute({
 *       componentDatatype : ComponentDatatype.FLOAT,
 *       componentSize : 3,
 *       data : new Float32Array([
 *         0.0, 0.0, 0.0,
 *         7500000.0, 0.0, 0.0,
 *         0.0, 7500000.0, 0.0
 *       ])
 *     })
 * 
 */
export class GeometryAttribute extends EventEmitter<IObjectEvent> {
    private _glTarget: VertexAttribute;
    readonly buffer: GraphicBuffer;
    readonly type: VertexAttEnum | number;

    private _componentSize: number;
    set componentSize(value: number) {
        this._componentSize = value;
        this.beMetaDirty = true;
        this.computeCount();
    }
    get componentSize() { return this._componentSize }
    private _componentDatatype: ComponentDatatypeEnum;
    set componentDatatype(value: ComponentDatatypeEnum) {
        this._componentDatatype = value;
        this.beMetaDirty = true;
        this.computeCount();
    }
    get componentDatatype() { return this._componentDatatype }
    private _normalize: boolean;
    get normalize() {
        return this._normalize;
    }
    set normalize(value: boolean) {
        this._normalize = value;
        this.beMetaDirty = true;
    }
    // beDynamic: boolean;
    private _bytesOffset: number;
    get bytesOffset() {
        return this._bytesOffset;
    }
    set bytesOffset(value: number) {
        this._bytesOffset = value;
        this.beMetaDirty = true;
        this.computeCount();
    }
    private _bytesStride: number;
    get bytesStride() {
        return this._bytesStride;
    }
    set bytesStride(value: number) {
        this._bytesStride = value;
        this.beMetaDirty = true;
        this.computeCount();
    }
    protected _instanceDivisor: number;
    get instanceDivisor() { return this._instanceDivisor }
    set instanceDivisor(value: number) {
        this._instanceDivisor = value;
        this.beDataDirty = true;
    }
    private _count: number;
    private _computeCount: number;
    get count() {
        return this._count ?? this._computeCount;
    }
    get data(): TypedArray {
        return this.buffer.data;
    }
    set data(value: TypedArray | Array<number>) {
        if (value instanceof Array) {
            this.buffer.data = new Float32Array(value);
        } else {
            this.buffer.data = value;
        }
        this.beDataDirty = true;
        this.computeCount();
    }
    private _elements: TypedArray[];
    /**
     * 格式化后的数据
     */
    get elements() {
        if (this._elements == null) {
            const result: any[] = [];
            const { data, componentSize, bytesStride, bytesOffset, componentDatatype } = this;
            let elementOffset = 0;
            if (bytesStride > 0) {
                elementOffset = bytesStride;
            } else {
                elementOffset = componentSize * GlType.bytesPerElement(componentDatatype);
            }
            const TypeArrayCtr = GlType.toTypeArrCtor(componentDatatype);
            for (let i = 0; i < this.count; i++) {
                let element = new TypeArrayCtr(data.buffer, data.byteOffset + elementOffset * i + bytesOffset, componentSize);
                result.push(element);
            }
            this._elements = result;
        }
        return this._elements;
    }

    private _beDirty: boolean = true;
    private set beDirty(value: boolean) {
        this._beDirty = value;
        this.emit("BeDirty", this.type);
    }
    get beDirty() { return this.beDirty }
    private _beDataDirty = false;
    set beDataDirty(value: boolean) {
        this._beDataDirty = value;
        this.beDirty = true;
    };

    private _beMetaDirty = false;
    set beMetaDirty(value: boolean) {
        this._beMetaDirty = value;
        this.beDirty = true;
    };

    constructor(option: IGeometryAttributeOptions) {
        super();
        this.type = option.type;
        this._componentSize = option.componentSize ?? VertexAttEnum.toComponentSize(option.type);
        this._normalize = option.normalize ?? false;
        // this.beDynamic = option.beDynamic ?? false;
        this._bytesOffset = option.bytesOffset ?? 0;
        this._bytesStride = option.bytesStride ?? 0;
        this._instanceDivisor = option.instanceDivisor;

        this._count = option.count;
        if (option.data instanceof GraphicBuffer) {
            this.buffer = option.data;
            this.buffer.on("BeDirty", () => this.beDataDirty = true)
        } else {
            if (option.data instanceof Array) {
                option.data = new Float32Array(option.data);
            }
            this.buffer = new GraphicBuffer({ target: BufferTargetEnum.ARRAY_BUFFER, data: option.data, usage: option.usage });
        }

        if (option.componentDatatype) {
            this._componentDatatype = option.componentDatatype;
        } else {
            this._componentDatatype = GlType.fromTypedArray(this.buffer.data);
        }

        this.computeCount();
    }

    private computeCount() {
        let elementOffset = 0;
        if (this.bytesStride > 0) {
            elementOffset = this.bytesStride;
        } else {
            elementOffset = this.componentSize * GlType.bytesPerElement(this.componentDatatype);
        }
        this._computeCount = (this.buffer.data.byteLength - this.bytesOffset - this.buffer.data.byteOffset) / elementOffset;
    }

    // getOrCreateGlTarget(device: GraphicsDevice) {
    //     if (this._glTarget == null) {
    //         let buffer = this.buffer.syncData(device);
    //         this._glTarget = device.createVertexAtt({
    //             type: this.type,
    //             data: buffer,
    //             componentSize: this.componentSize,
    //             componentDatatype: this.componentDatatype,
    //             normalize: this.normalize,
    //             bytesOffset: this.bytesOffset,
    //             bytesStride: this.bytesStride,
    //             instanceDivisor: this.instanceDivisor
    //         });
    //     }
    //     return this._glTarget;
    // }

    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            let buffer = this.buffer.syncData(device);
            this._glTarget = device.createVertexAtt({
                type: this.type,
                data: buffer,
                componentSize: this.componentSize,
                componentDatatype: this.componentDatatype,
                normalize: this.normalize,
                bytesOffset: this.bytesOffset,
                bytesStride: this.bytesStride,
                instanceDivisor: this.instanceDivisor
            });
            this._beDirty = false;
        } else if (this._beDirty) {
            if (this._beDataDirty) {
                this.buffer.syncData(device);
                this._beDataDirty = false;
            }
            if (this._beMetaDirty) {
                this._glTarget.set({
                    componentSize: this.componentSize,
                    componentDatatype: this.componentDatatype,
                    normalize: this.normalize,
                    bytesOffset: this.bytesOffset,
                    bytesStride: this.bytesStride,
                });
                this._beMetaDirty = false;
            }
            this._beDirty = false;
        }
        return this._glTarget;
    }

    set(option: Partial<Omit<IGeometryAttributeOptions, "data" | "type"> & { data: TypedArray | Array<number> }>) {
        if (option.componentSize != null) this._componentSize = option.componentSize;
        if (option.componentDatatype != null) this._componentDatatype = option.componentDatatype;
        if (option.normalize != null) this._normalize = option.normalize;
        if (option.bytesOffset != null) this._bytesOffset = option.bytesOffset;
        if (option.bytesStride != null) this._bytesStride = option.bytesStride;
        // if (option.beDynamic != null) this.beDynamic = option.beDynamic;
        if (option.data != null) {
            if (option.data instanceof Array) {
                this.buffer.data = new Float32Array(option.data);
            } else {
                this.buffer.data = option.data;
            }
        }
        this.beDirty = true;
        this.computeCount();
    }
}

interface IObjectEvent {
    BeDirty: number
}
export interface IGeometryAttributeOptions {
    type: VertexAttEnum | number;
    data: TypedArray | Array<number> | GraphicBuffer;
    componentSize: number;
    componentDatatype?: number;
    normalize?: boolean;
    usage?: BufferUsageEnum,
    beDynamic?: boolean;
    bytesOffset?: number;
    bytesStride?: number;
    count?: number;
    instanceDivisor?: number;
}
