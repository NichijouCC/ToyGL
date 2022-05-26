import { GraphicsDevice } from "./graphicsDevice";
import { PixelFormatEnum } from "./pixelFormatEnum";

export class WebglRenderBuffer {
    readonly width: number;
    readonly height: number;
    readonly format: PixelFormatEnum;
    readonly target: WebGLRenderbuffer;
    private gl: WebGLRenderingContext;
    constructor(context: GraphicsDevice, options: { width: number, height: number, format?: PixelFormatEnum }) {
        this.width = options.width;
        this.height = options.height;
        this.format = options.format ?? PixelFormatEnum.RGBA;

        let gl = context.gl;
        this.gl = gl;
        let target = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, target);
        gl.renderbufferStorage(gl.RENDERBUFFER, this.format, this.width, this.height);
        this.target = target;
    }

    bind() {
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.target);
    }
}

export interface IRenderBufferOptions {
    width: number,
    height: number,
    format?: PixelFormatEnum
}