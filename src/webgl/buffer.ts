import { GraphicsDevice } from "./graphicsDevice";
import { IglElement } from "../core/iglElement";
import { TypedArray } from "../core/typedArray";
import { GlConstants } from "./glConstant";

export interface bufferOption {
    context: GraphicsDevice;
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
    constructor(options: bufferOption) {
        this.target = options.target;
        this.usage = options.usage ?? BufferUsageEnum.STATIC_DRAW;
        this._data = (options as any).data;
        const gl = options.context.gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(this.target, buffer);
        gl.bufferData(this.target, this._data as any, this.usage);
        gl.bindBuffer(this.target, null);

        this.bind = () => {
            gl.bindBuffer(this.target, buffer);
        };
        this.unbind = () => {
            gl.bindBuffer(this.target, null);
        };

        this.update = (data: TypedArray | number) => {
            gl.bindBuffer(this.target, buffer);
            gl.bufferData(this.target, data as any, this.usage);
        };

        this.destroy = () => {
            gl.deleteBuffer(buffer);
        };
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
