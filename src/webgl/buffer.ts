import { getGLTypeForTypedArray } from "../render/helper";
import { glTypeToByteSize } from "../resources/assets/geometry";

interface IbufferOptionA {
    gl: WebGLRenderingContext;
    bufferTarget: number;
    typedArray: ArrayBufferView;
    usage: number;
}
interface IbufferOptionB {
    gl: WebGLRenderingContext;
    bufferTarget: number;
    sizeInBytes: number;
    usage: number;
}
/**
 *
 *
 *
 */
export class Buffer {
    readonly bufferTarget: number;
    readonly usage: number;
    readonly typedArray: ArrayBufferView;
    readonly sizeInBytes: number;
    private _buffer: WebGLBuffer;
    private _gl: WebGLRenderingContext;
    constructor(options: IbufferOptionA | IbufferOptionB) {
        let gl = options.gl;
        this._gl = options.gl;
        this.bufferTarget = options.bufferTarget;
        this.usage = options.usage;
        this.typedArray = (options as any).typedArray;
        this.sizeInBytes = (options as any).sizeInBytes;

        let hasTypedArray = this.typedArray != null;
        if (hasTypedArray) {
            this.sizeInBytes = this.typedArray.byteLength;
        }
        let buffer = gl.createBuffer();
        gl.bindBuffer(this.bufferTarget, buffer);
        if (hasTypedArray) {
            gl.bufferData(this.bufferTarget, this.typedArray, this.usage);
        } else {
            gl.bufferData(this.bufferTarget, this.sizeInBytes, this.usage);
        }
        gl.bindBuffer(this.bufferTarget, null);
        this._buffer = buffer;
    }

    bind() {
        this._gl.bindBuffer(this.bufferTarget, this._buffer);
    }
    unBind() {
        this._gl.bindBuffer(this.bufferTarget, null);
    }

    dispose() {
        this._gl.deleteBuffer(this._buffer);
    }
}

export interface IvertexBufferOptionA {
    gl: WebGLRenderingContext;
    usage: number;
    sizeInBytes: number;
}
export interface IvertexBufferOptionB {
    gl: WebGLRenderingContext;
    usage: number;
    typedArray: ArrayBufferView;
}
export class VertexBuffer extends Buffer {
    componentSize: number;
    componentDataType: number;
    // size?: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;
    constructor(options: IvertexBufferOptionA | IvertexBufferOptionB) {
        super({ ...options, bufferTarget: options.gl.ARRAY_BUFFER });
    }
}

export interface IindexBufferOptionA {
    gl: WebGLRenderingContext;
    usage: number;
    sizeInBytes: number;
    indexDatatype: number;
}
export interface IindexBufferOptionB {
    gl: WebGLRenderingContext;
    usage: number;
    typedArray: ArrayBufferView;
}

export class IndexBuffer extends Buffer {
    readonly indexDatatype: number;
    readonly bytesPerIndex: number;
    readonly numberOfIndices: number;
    constructor(options: IvertexBufferOptionA | IindexBufferOptionB) {
        super({ ...options, bufferTarget: options.gl.ELEMENT_ARRAY_BUFFER });
        this.indexDatatype = (options as any).indexDatatype;
        let typedArray = (options as any).typedArray;
        if (typedArray) {
            this.indexDatatype = getGLTypeForTypedArray(typedArray);
        }
        this.bytesPerIndex = glTypeToByteSize(this.indexDatatype);
        this.numberOfIndices = this.sizeInBytes / this.bytesPerIndex;
    }
}
