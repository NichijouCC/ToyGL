import { FrameBuffer, GraphicsDevice, PixelFormatEnum } from "../webgl";
import { IMemoryTextureOption, MemoryTexture } from "./memoryTexture";
import { RenderBuffer } from "./renderBuffer";

export class RenderTarget {
    readonly colors: MemoryTexture[] = [];
    get color() { return this.colors[0] }
    readonly depth: RenderBuffer | MemoryTexture;
    get width() { return this.colors[0].width }
    get height() { return this.colors[0].height }
    constructor(color: MemoryTexture | IMemoryTextureOption | (MemoryTexture | IMemoryTextureOption)[], depth?: MemoryTexture | IMemoryTextureOption) {
        if (color instanceof Array) {
            this.colors = color.map(item => item instanceof MemoryTexture ? item : new MemoryTexture(item));
        } else {
            this.colors = [color instanceof MemoryTexture ? color : new MemoryTexture(color)];
        }
        if (depth == null) {
            this.depth = new RenderBuffer({ format: PixelFormatEnum.DEPTH_COMPONENT16, width: this.color.width, height: this.color.height })
        } else if (depth instanceof MemoryTexture) {
            this.depth = depth;
        } else {
            this.depth = new MemoryTexture(depth);
        }
    }
    private create(device: GraphicsDevice) {
        let color = this.colors.map(item => { return { type: "color", attachment: item.syncData(device) } });
        let depth = this.depth.syncData(device);
        return device.createFrameBuffer({
            attachments: [
                ...color as any,
                {
                    type: "depth",
                    attachment: depth,
                }
            ]
        })
    }
    private _glTarget: FrameBuffer;
    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            this._glTarget = this.create(device);
        }
        return this._glTarget;
    }
}