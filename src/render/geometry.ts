import { IdataBuffer, Engine, DataArray } from "../webgl/engine";
import { VertexAttEnum } from "./vertexAttType";
import { getComponentsizeFromVertexAttType, getGLTypeForTypedArray } from "./helper";
import { GlConstants } from "./GlConstant";

export interface IgeometryOptions {
    atts?: {
        [keyName: string]: {
            data: DataArray;
            beDynamic?: boolean;
            option?: {
                componentSize?: number;
                componentDataType?: number;
                normalize?: boolean;
                bytesStride?: number;
                bytesOffset?: number;
                divisor?: number;
                count?: number;
            };
        };
    };
    indices?: { data: DataArray; beDynamic?: boolean };
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
        if (option.atts != null) {
            for (const key in option.atts) {
                let attop = option.atts[key];
                this.atts[key] = new VertexBuffer(
                    key as VertexAttEnum,
                    new Buffer(engine, attop.data, attop.beDynamic),
                    attop.option,
                );
            }
        }
        if (option.indices != null) {
            this.indices = new IndexBuffer(new Buffer(engine, option.indices.data, option.indices.beDynamic));
        }
    }

    setVerticesData(
        kind: string,
        data: DataArray,
        beDynamic: boolean = false,
        option?: {
            componentSize?: number;
            componentDataType?: number;
            normalize?: boolean;
            bytesStride?: number;
            bytesOffset?: number;
            divisor?: number;
            count?: number;
        },
    ): void {
        let buffer = new VertexBuffer(kind as VertexAttEnum, new Buffer(this._engine, data, beDynamic), option);
        this.atts[kind] = buffer;
    }

    setIndexData(data: DataArray, beDynamic: boolean = false) {
        let buffer = new IndexBuffer(new Buffer(this._engine, data, beDynamic));
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
            : buffer.dataGlType || GlConstants.FLOAT;
        this.normalize = option.normalize === true;
        this.bytesStride = option.bytesStride != null ? option.bytesStride : 0;
        this.bytesOffset = option.bytesOffset != null ? option.bytesOffset : 0;
        this.divisor = option.divisor;
        //todo count?
        this.count = option.count;
    }
}

export class Buffer {
    private _engine: Engine;
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

    updateData(data: DataArray) {}
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
