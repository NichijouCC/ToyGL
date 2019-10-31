import { IdataBuffer, Engine, DataArray } from "../webgl/engine";
import { VertexAttEnum } from "../render/vertexAttType";
import { getComponentsizeFromVertexAttType, getGLTypeForTypedArray } from "../render/helper";
import { GlConstants } from "../render/GlConstant";
import { Context } from "../core/context";
export class VertexBuffer {
    readonly vertexType: VertexAttEnum;
    readonly buffer: Buffer;
    count: number;

    readonly componentSize: number;
    readonly componentDataType: number;
    readonly normalize: boolean;
    readonly bytesStride: number;
    readonly bytesOffset: number;
    readonly divisor?: number;
    constructor(
        vertexType: VertexAttEnum,
        buffer: Buffer,
        option?: {
            componentSize?: number;
            componentDataType?: number;
            normalize?: boolean;
            bytesStride?: number;
            bytesOffset?: number;
            divisor?: number;
            count?: number;
        },
    ) {
        this.vertexType = vertexType;
        this.buffer = buffer;
        option = option || {};
        this.componentSize = option.componentSize
            ? option.componentSize
            : getComponentsizeFromVertexAttType(vertexType);
        this.componentDataType = option.componentDataType
            ? option.componentDataType
            : buffer.dataGlType || GlConstants.FLOAT;
        this.normalize = option.normalize === true;
        this.bytesStride = option.bytesStride != null ? option.bytesStride : 0;
        this.bytesOffset = option.bytesOffset != null ? option.bytesOffset : 0;
        this.divisor = option.divisor;
        //todo count?
        this.count = option.count;
    }
}
export class IndexBuffer {
    readonly buffer: Buffer;
    count: number;
    readonly componentDataType: number;
    constructor(buffer: Buffer, option?: { componentDataType?: number; count?: number }) {
        option = option || {};
        this.buffer = buffer;
        this.componentDataType = option.componentDataType
            ? option.componentDataType
            : buffer.dataGlType || GlConstants.UNSIGNED_SHORT;
        this.count = option.count;
    }
}
export class Buffer {
    private _engine: Engine;
    private _data: DataArray;
    private _buffer: IdataBuffer;
    readonly beDynamic: boolean;
    private beDirty: boolean;
    constructor(engine: Engine, data: DataArray, beDynamic: boolean = false) {
        this._data = data;
        this.beDynamic = beDynamic;
        this._buffer = engine.createArrayBuffer(data, beDynamic);
    }
    get buffer() {
        return this._buffer;
    }
    get dataGlType() {
        if (this._data instanceof Array) {
            return GlConstants.FLOAT;
        } else if (this._data instanceof ArrayBuffer) {
            console.warn("unkown array buffer Data type!");
            return null;
        } else {
            return getGLTypeForTypedArray(this._data);
        }
    }
    set data(data: DataArray) {
        this._data = data;
        this.beDirty = true;
    }
    update(context: Context) {
        if (this.beDirty) {
            context.engine.crea;
        }
    }
}
