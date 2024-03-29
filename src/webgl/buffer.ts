import { GraphicsDevice } from "./graphicsDevice";
import { IglElement } from "../core/iglElement";
import { TypedArray } from "../core/typedArray";
import { GlConstants } from "./glConstant";

export interface bufferOption {
    target: BufferTargetEnum;
    data: TypedArray;
    usage?: BufferUsageEnum;
}
export class Buffer implements IglElement {
    protected target: BufferTargetEnum;
    readonly usage: BufferUsageEnum;
    private _data: TypedArray;
    set data(value: TypedArray) { this._data = value; }
    get data() { return this._data }
    get byteLength() { return this.data.byteLength; };
    protected _buffer: WebGLBuffer;
    constructor(context: GraphicsDevice, options: bufferOption) {
        this.target = options.target;
        this.usage = options.usage ?? BufferUsageEnum.STATIC_DRAW;
        this._data = (options as any).data;
        const gl = context.gl;
        const buffer = gl.createBuffer();

        this.bind = () => {
            if (this.target == BufferTargetEnum.ARRAY_BUFFER) {
                if (context.bindingArrayBuffer != buffer) {
                    gl.bindBuffer(this.target, buffer);
                    context.bindingArrayBuffer = buffer;
                }
            } else {
                gl.bindBuffer(this.target, buffer);
            }
        };
        this.unbind = () => {
            gl.bindBuffer(this.target, null);
            if (this.target == BufferTargetEnum.ARRAY_BUFFER) {
                context.bindingArrayBuffer = null;
            }
        };

        this.set = (options: IBufferSetOptions) => {
            if (options.data != null) {
                this.bind();
                this._data = options.data;
                //WebGL: INVALID_VALUE: bufferSubData: buffer overflow
                gl.bufferData(this.target, this.data, this.usage);
            }
            if (options.partial != null) {
                this.bind();
                this._data.set(options.partial.subData, options.partial.byteOffset / this._data.BYTES_PER_ELEMENT);
                gl.bufferSubData(this.target, options.partial.byteOffset, options.partial.subData);
            }
        };

        this.destroy = () => {
            gl.deleteBuffer(buffer);
        };

        this.bind();
        gl.bufferData(this.target, this._data as any, this.usage);
    }

    bind() { }
    unbind() { }
    set(options: IBufferSetOptions) { }
    destroy() { }
}

export interface IBufferSetOptions {
    data?: TypedArray,
    partial?: { subData: TypedArray, byteOffset: number }
}

export enum BufferTargetEnum {
    ARRAY_BUFFER = GlConstants.ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER = GlConstants.ELEMENT_ARRAY_BUFFER,
}
export enum BufferUsageEnum {
    STATIC_DRAW = GlConstants.STATIC_DRAW,
    DYNAMIC_DRAW = GlConstants.DYNAMIC_DRAW
}
