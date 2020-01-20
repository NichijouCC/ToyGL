import { getGLTypeForTypedArray } from "../render/helper";
import { glTypeToByteSize } from "../resources/assets/geometry";
import { Context } from "../core/context";

export type bufferOption =
    | {
          context: Context;
          bufferTarget: number;
          typedArray: ArrayBufferView;
          usage: number;
      }
    | {
          context: Context;
          bufferTarget: number;
          sizeInBytes: number;
          usage: number;
      };
export class Buffer {
    readonly bufferTarget: number;
    readonly usage: number;
    readonly typedArray: ArrayBufferView;
    readonly sizeInBytes: number;
    private _buffer: WebGLBuffer;
    private _gl: WebGLRenderingContext;
    constructor(options: bufferOption) {
        let gl = options.context.gl;
        this._gl = gl;
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

    /*
     * @example
     * // Example 1. Create a dynamic vertex buffer 16 bytes in size.
     * var buffer = Buffer.createVertexBuffer({
     *     context : context,
     *     sizeInBytes : 16,
     *     usage : BufferUsage.DYNAMIC_DRAW
     * });
     *
     * @example
     * // Example 2. Create a dynamic vertex buffer from three floating-point values.
     * // The data copied to the vertex buffer is considered raw bytes until it is
     * // interpreted as vertices using a vertex array.
     * var positionBuffer = buffer.createVertexBuffer({
     *     context : context,
     *     typedArray : new Float32Array([0, 0, 0]),
     *     usage : BufferUsage.STATIC_DRAW
     * });
     */
    static createVertexBuffer(options:{context:Context,sizeInBytes:number,usage:BufferUsageEnum}|{context:Context,typedArray:TypedArray,usage:BufferUsageEnum}){
        return new VertexBuffer({
            context: options.context,
            typedArray: (options as any).typedArray,
            sizeInBytes: (options as any).sizeInBytes,
            usage: options.usage
        });
    }

    static createIndexBuffer(options: IndexBufferOption){
        return new IndexBuffer({
            context:options.context,
            usage:options.usage,
            typedArray: (options as any).typedArray,
            sizeInBytes: (options as any).sizeInBytes,
            indexDatatype:(options as any).indexDatatype
        });
    }
}

export type vertexBufferOption =
    | {
          context: Context;
          usage: number;
          sizeInBytes: number;
      }
    | {
          context: Context;
          usage: number;
          typedArray: ArrayBufferView;
      };

export class VertexBuffer extends Buffer {
    componentSize: number;
    componentDataType: number;
    // size?: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;
    constructor(options: vertexBufferOption) {
        super({ ...options, bufferTarget: BufferTargetEnum.ARRAY_BUFFER });
    }
}

export type IndexBufferOption =
    | {
          context: Context;
          usage: number;
          sizeInBytes: number;
          indexDatatype: number;
      }
    | {
          context: Context;
          usage: number;
          typedArray: ArrayBufferView;
      };

export class IndexBuffer extends Buffer {
    readonly indexDatatype: number;
    readonly bytesPerIndex: number;
    readonly numberOfIndices: number;
    constructor(options: IndexBufferOption) {
        super({ ...options, bufferTarget: BufferTargetEnum.ELEMENT_ARRAY_BUFFER });
        this.indexDatatype = (options as any).indexDatatype;
        let typedArray = (options as any).typedArray;
        if (typedArray) {
            this.indexDatatype = getGLTypeForTypedArray(typedArray);
        }
        this.bytesPerIndex = glTypeToByteSize(this.indexDatatype);
        this.numberOfIndices = this.sizeInBytes / this.bytesPerIndex;
    }
}

export enum BufferTargetEnum{
    ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER
}

export enum BufferUsageEnum{
    STATIC_DRAW,
    DYNAMIC_DRAW
}
export type TypedArray=Float32Array
