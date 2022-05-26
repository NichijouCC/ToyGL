import { GraphicsDevice, PixelFormatEnum, WebglRenderBuffer } from "../webgl";

export class RenderBuffer {
    readonly width: number;
    readonly height: number;
    readonly format: PixelFormatEnum;
    constructor(options: { width: number, height: number, format: PixelFormatEnum }) {
        this.width = options.width;
        this.height = options.height;
        this.format = options.format;
    }

    private target: WebglRenderBuffer;
    syncData(device: GraphicsDevice) {
        if (this.target == null) {
            this.target = device.createRenderBuffer({ width: this.width, height: this.height, format: this.format });
        }
        return this.target;
    }
}