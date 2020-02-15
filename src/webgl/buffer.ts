import { GraphicsDevice } from "./GraphicsDevice";
import { GlConstants } from "../render/GlConstant";
import { IglElement } from "../core/IglElement";
import { VertexBuffer } from "./VertexBuffer";
import { IndexBuffer, IndexBufferOption } from "./IndexBuffer";
import { TypedArray } from "../core/TypedArray";

export type bufferOption =
    | {
        context: GraphicsDevice;
        target: BufferTargetEnum;
        typedArray: TypedArray;
        usage: BufferUsageEnum;
    }
    | {
        context: GraphicsDevice;
        target: BufferTargetEnum;
        sizeInBytes: number;
        usage: BufferUsageEnum;
    };
export class Buffer implements IglElement
{
    protected target: BufferTargetEnum;
    protected usage: BufferUsageEnum;
    protected typedArray: TypedArray;
    protected sizeInBytes: number;
    protected _buffer: WebGLBuffer;
    private device: GraphicsDevice;
    private _gl: WebGLRenderingContext;
    protected constructor(options: bufferOption)
    {
        this.device = options.context;
        this.target = options.target;
        this.usage = options.usage;
        this.typedArray = (options as any).typedArray;
        this.sizeInBytes = (options as any).sizeInBytes;

        if (this.typedArray != null)
        {
            this.sizeInBytes = this.typedArray.byteLength;
        }

        let gl = options.context.gl;
        let buffer = gl.createBuffer();
        gl.bindBuffer(this.target, buffer);
        gl.bufferData(this.target, this.typedArray ?? this.sizeInBytes as any, this.usage);
        gl.bindBuffer(this.target, null);

        this.bind = () =>
        {
            gl.bindBuffer(this.target, buffer);
        }
        this.unbind = () =>
        {
            gl.bindBuffer(this.target, null);
        }

        this.update = (sizeInBytesOrTypedArray: TypedArray | number) =>
        {
            gl.bindBuffer(this.target, buffer);
            gl.bufferData(this.target, sizeInBytesOrTypedArray as any, this.usage);
            // gl.bindBuffer(this.target, null);
        }

        this.destroy = () =>
        {
            gl.deleteBuffer(buffer);
        }
    }

    bind() { }
    unbind() { }
    update(sizeInBytesOrTypedArray: TypedArray | number) { }
    destroy() { }

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
    static createVertexBuffer(options: { context: GraphicsDevice, sizeInBytes: number, usage: BufferUsageEnum } | { context: GraphicsDevice, typedArray: ArrayBufferView, usage: BufferUsageEnum })
    {
        return new VertexBuffer({
            context: options.context,
            typedArray: (options as any).typedArray,
            sizeInBytes: (options as any).sizeInBytes,
            usage: options.usage
        });
    }

    static createIndexBuffer(options: IndexBufferOption)
    {
        return new IndexBuffer({
            context: options.context,
            usage: options.usage,
            typedArray: (options as any).typedArray,
            sizeInBytes: (options as any).sizeInBytes,
            indexDatatype: (options as any).indexDatatype
        });
    }
}


export enum BufferTargetEnum
{
    ARRAY_BUFFER = GlConstants.ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER = GlConstants.ELEMENT_ARRAY_BUFFER,
}
export enum BufferUsageEnum
{
    STATIC_DRAW = GlConstants.STATIC_DRAW,
    DYNAMIC_DRAW = GlConstants.DYNAMIC_DRAW
}

export class BufferConfig
{
    static bufferUsageToGLNumber: { [useage: string]: number } = {};
    static bufferTargetToGLNumber: { [useage: string]: number } = {};
    static vertexAttributeSetter: { [size: number]: (index: number, value: any) => any } = {};
    static init(context: GraphicsDevice)
    {
        this.vertexAttributeSetter[1] = (index, value) =>
        {
            context.gl.vertexAttrib1f(index, value)
        }
        this.vertexAttributeSetter[2] = (index, value) =>
        {
            context.gl.vertexAttrib2fv(index, value)
        }
        this.vertexAttributeSetter[3] = (index, value) =>
        {
            context.gl.vertexAttrib3fv(index, value)
        }
        this.vertexAttributeSetter[4] = (index, value) =>
        {
            context.gl.vertexAttrib4fv(index, value)
        }
    }
}
