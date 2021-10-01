import { GlType, TypedArray } from "../core/typedArray";
import { BufferTargetEnum, GraphicsDevice, VertexAttribute, VertexAttEnum, ComponentDatatypeEnum } from "../webgl";
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
export class GeometryAttribute {
    private _glTarget: VertexAttribute;
    buffer: GraphicBuffer;
    type: VertexAttEnum | string
    componentSize: number;
    componentDatatype: ComponentDatatypeEnum;
    normalize: boolean;
    beDynamic: boolean;
    bytesOffset: number;
    bytesStride: number;
    private _count: number;
    private _computeCount: number;
    get count() {
        return this._count ?? this._computeCount;
    }
    /**
     * 原始数据
     */
    get data(): TypedArray {
        return this.buffer.data;
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
    private _beDirty = true;
    constructor(option: IGeometryAttributeOptions) {
        this.type = option.type;
        this.componentSize = option.componentSize ?? VertexAttEnum.toComponentSize(option.type);
        this.normalize = option.normalize ?? false;
        this.beDynamic = option.beDynamic ?? false;
        this.bytesOffset = option.bytesOffset ?? 0;
        this.bytesStride = option.bytesStride ?? 0;

        this._count = option.count;
        if (option.data instanceof GraphicBuffer) {
            this.buffer = option.data;
        } else {
            if (option.data instanceof Array) {
                option.data = new Float32Array(option.data);
            }
            this.buffer = new GraphicBuffer({ target: BufferTargetEnum.ARRAY_BUFFER, data: option.data });
        }

        if (option.componentDatatype) {
            this.componentDatatype = option.componentDatatype;
        } else {
            this.componentDatatype = GlType.fromTypedArray(this.buffer.data);
        }

        this._computeCount = this.buffer.data.byteLength / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
    }

    getGlTarget(device: GraphicsDevice) {
        if (this._glTarget == null) {
            let buffer = this.buffer.getGlTarget(device);
            this._glTarget = device.createVertexAtt({
                type: this.type,
                data: buffer,
                componentSize: this.componentSize,
                componentDatatype: this.componentDatatype,
                normalize: this.normalize,
                bytesOffset: this.bytesOffset,
                bytesStride: this.bytesStride
            });
        }
        return this._glTarget;
    }

    bind(device: GraphicsDevice) {
        if (this._beDirty) {
            let buffer = this.buffer.getGlTarget(device);
            this._glTarget.update({
                data: buffer,
                componentSize: this.componentSize,
                componentDatatype: this.componentDatatype,
                normalize: this.normalize,
                bytesOffset: this.bytesOffset,
                bytesStride: this.bytesStride,
            });
            this._beDirty = false;
        }
        return this._glTarget;
    }
    /**
     * Private
     */
    changeData(option: Partial<Omit<IGeometryAttributeOptions, "data" | "type"> & { data: TypedArray | Array<number> }>) {
        if (option.componentSize != null) this.componentSize = option.componentSize;
        if (option.normalize != null) this.normalize = option.normalize;
        if (option.beDynamic != null) this.beDynamic = option.beDynamic;
        if (option.data instanceof Array) {
            option.data = new Float32Array(option.data);
        }
        this.buffer.changeData(option.data);
        this._computeCount = this.buffer.data.byteLength / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
        this._beDirty = true;
    }
}

export interface IGeometryAttributeOptions {
    componentSize: number;
    componentDatatype?: number;
    normalize?: boolean;
    data: TypedArray | Array<number> | GraphicBuffer;
    type: VertexAttEnum;
    beDynamic?: boolean;
    bytesOffset?: number;
    bytesStride?: number;
    count?: number;
}
