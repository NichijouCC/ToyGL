import { GraphicsDevice } from "./GraphicsDevice";
import { IglElement } from "../core/IglElement";
import { TypedArray } from "../core/TypedArray";
import { GlConstants } from "./GLconstant";

export type bufferOption =
    | {
        context: GraphicsDevice;
        target: BufferTargetEnum;
        typedArray: TypedArray;
        usage?: BufferUsageEnum;
    }
    | {
        context: GraphicsDevice;
        target: BufferTargetEnum;
        sizeInBytes: number;
        usage?: BufferUsageEnum;
    };
export class Buffer implements IglElement
{
    protected target: BufferTargetEnum;
    readonly usage: BufferUsageEnum;
    protected _typedArray: TypedArray;
    get typedArray() { return this._typedArray };
    protected _sizeInBytes: number;
    get sizeInbytes() { return this._sizeInBytes };
    protected _buffer: WebGLBuffer;
    private device: GraphicsDevice;
    private _gl: WebGLRenderingContext;
    protected constructor(options: bufferOption)
    {
        this.device = options.context;
        this.target = options.target;
        this.usage = options.usage ?? BufferUsageEnum.STATIC_DRAW;
        this._typedArray = (options as any).typedArray;
        this._sizeInBytes = (options as any).sizeInBytes;

        if (this._typedArray != null)
        {
            this._sizeInBytes = this._typedArray.byteLength;
        }

        let gl = options.context.gl;
        let buffer = gl.createBuffer();
        gl.bindBuffer(this.target, buffer);
        gl.bufferData(this.target, this._typedArray ?? this._sizeInBytes as any, this.usage);
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
            if (typeof sizeInBytesOrTypedArray == "number")
            {
                this._sizeInBytes = sizeInBytesOrTypedArray
            } else
            {
                this._typedArray = sizeInBytesOrTypedArray;
            }
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
