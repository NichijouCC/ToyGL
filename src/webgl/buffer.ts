import { GraphicsDevice } from "./graphicsDevice";
import { IglElement } from "../core/iglElement";
import { TypedArray } from "../core/typedArray";
import { GlConstants } from "./glConstant";

export interface bufferOption {
    target: BufferTargetEnum;
    data: number | TypedArray;
    usage?: BufferUsageEnum;
}
export class Buffer implements IglElement {
    protected target: BufferTargetEnum;
    readonly usage: BufferUsageEnum;
    protected _data: TypedArray | number;
    get data() { return this._data; };
    get sizeInBytes() {
        if (typeof this._data == "number") {
            return this._data;
        } else {
            return this._data.byteLength;
        }
    };
    protected _buffer: WebGLBuffer;
    constructor(context: GraphicsDevice, options: bufferOption) {
        this.target = options.target;
        this.usage = options.usage ?? BufferUsageEnum.STATIC_DRAW;
        this._data = (options as any).data;
        const gl = context.gl;
        const buffer = gl.createBuffer();

        this.bind = () => {
            if (this.target == BufferTargetEnum.ARRAY_BUFFER) {
                if (context.bindingBuffer != buffer) {
                    gl.bindBuffer(this.target, buffer);
                    context.bindingBuffer = buffer;
                }
            } else {
                gl.bindBuffer(this.target, buffer);
            }
        };
        this.unbind = () => {
            gl.bindBuffer(this.target, null);
            if (this.target == BufferTargetEnum.ARRAY_BUFFER) {
                context.bindingBuffer = null;
            }
        };

        this.update = (data: TypedArray | number) => {
            this.bind();
            gl.bufferSubData(this.target, 0, data as any);
        };

        this.destroy = () => {
            gl.deleteBuffer(buffer);
        };

        this.bind();
        gl.bufferData(this.target, this._data as any, this.usage);
    }

    bind() { }
    unbind() { }
    update(data?: TypedArray | number) { }
    destroy() { }
}

export enum BufferTargetEnum {
    ARRAY_BUFFER = GlConstants.ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER = GlConstants.ELEMENT_ARRAY_BUFFER,
}
export enum BufferUsageEnum {
    STATIC_DRAW = GlConstants.STATIC_DRAW,
    DYNAMIC_DRAW = GlConstants.DYNAMIC_DRAW
}
