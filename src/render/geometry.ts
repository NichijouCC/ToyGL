import { IdataBuffer, Engine, DataArray } from "../webgl/engine";
import { VertexAttEnum } from "./vertexAttType";
import { getComponentsizeFromVertexAttType, getGLTypeForTypedArray } from "./helper";
import { GlConstants } from "./GlConstant";

export interface IgeometryOptions {
    atts: { [keyName: string]: DataArray };
    indices?: DataArray;
    primitiveType?: number;
}

export class Geometry {
    private _engine: Engine;
    atts: { [attName: string]: VertexBuffer };
    indices?: IndexBuffer;
    vaoDic: { [programeId: number]: WebGLVertexArrayObject };
    // vao?: WebGLVertexArrayObject;
    count: number;
    offset: number;
    primitiveType: number;
    constructor(engine: Engine, option: IgeometryOptions) {
        for (const key in option.atts) {
            let attData = option.atts[key];
            this.atts[key] = new VertexBuffer(key, new Buffer(engine, attData));
        }
    }

    setVerticesData(
        kind: string,
        data: DataArray,
        beDynamic: boolean = false,
        option: {
            componentSize?: number;
            componentDataType?: number;
            normalize?: boolean;
            bytesStride?: number;
            bytesOffset?: number;
            divisor?: number;
            count?: number;
        },
    ): void {
        let buffer = new VertexBuffer(data, kind, new Buffer(this._engine, data, beDynamic), option);
        this.atts[kind] = buffer;
    }

    setIndexData(data: DataArray, beDynamic: boolean = false) {
        let buffer = new IndexBuffer(new Buffer(this._engine, data, beDynamic), {});
        this.indices = buffer;
    }
}

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
            : buffer.DataType || GlConstants.FLOAT;
        this.normalize = option.normalize === true;
        this.bytesStride = option.bytesStride != null ? option.bytesStride : 0;
        this.bytesOffset = option.bytesOffset != null ? option.bytesOffset : 0;
        this.divisor = option.divisor;
        //todo count?
        this.count = option.count;
    }
}

export class Buffer {
    private _data: DataArray;
    private _buffer: IdataBuffer;
    readonly beDynamic: boolean;
    constructor(engine: Engine, data: DataArray, beDynamic: boolean = false) {
        this._data = data;
        this.beDynamic = beDynamic;
        this._buffer = engine.createVertexBuffer(data, beDynamic);
    }
    get buffer() {
        return this._buffer;
    }
    get DataType() {
        if (this._data instanceof Array) {
            return GlConstants.FLOAT;
        } else if (this._data instanceof ArrayBuffer) {
            console.warn("unkown array buffer Data type!");
            return null;
        } else {
            return getGLTypeForTypedArray(this._data);
        }
    }
}

export class IndexBuffer {
    readonly buffer: Buffer;
    count: number;
    readonly componentDataType: number;
    constructor(buffer: Buffer, option: { componentDataType?: number; count?: number }) {
        this.buffer = buffer;
        this.componentDataType = option.componentDataType
            ? option.componentDataType
            : buffer.DataType || GlConstants.UNSIGNED_SHORT;
        this.count = option.count;
    }
}
