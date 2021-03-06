import { Asset, IGraphicAsset } from "../asset";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { TypedArray } from "../../../core/typedArray";
import { PixelFormatEnum } from "../../../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../../../webgl/pixelDatatype";
import { IsamplerOptions, Sampler, Texture } from "../../../webgl/texture";
import { BaseTexture } from "./baseTexture";

export class MemoryTexture extends BaseTexture {
    protected create(device: GraphicsDevice): Texture {
        if (this.arrayBufferView) {
            return Texture.fromTypedArray({
                context: device,
                width: this.width,
                height: this.height,
                arrayBufferView: this.arrayBufferView,
                pixelFormat: this._pixelFormat,
                pixelDatatype: this._pixelDatatype,
                sampler: this.sampler,
                flipY: this._flipY
            });
        }
        return null;
    }

    protected refresh(device: GraphicsDevice): void {
        this.graphicAsset.update();
    }

    width: number;
    height: number;
    private arrayBufferView: TypedArray;

    // ----------------texParameteri-------------
    private _pixelFormat: PixelFormatEnum;
    set pixelFormat(format: PixelFormatEnum) { this._pixelFormat = format; };
    private _pixelDatatype: PixelDatatypeEnum;
    set pixelDatatype(type: PixelDatatypeEnum) { this._pixelDatatype = type; };
    private _preMultiplyAlpha: boolean;
    set preMultiplyAlpha(value: boolean) { this._preMultiplyAlpha = value; }
    private _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    private sampler: Sampler;

    constructor(options: ImemoryTextureOption) {
        super();
        this.arrayBufferView = options.arrayBufferView;
        this.width = options.width;
        this.height = options.height;
        this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
        this._preMultiplyAlpha = options.preMultiplyAlpha || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options.flipY ?? true;
        this.sampler = new Sampler(options.sampler);
    }
}

export interface ImemoryTextureOption {
    width: number;
    height: number;
    arrayBufferView: TypedArray;
    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;

    // ----------------texParameteri-------------
    sampler?: IsamplerOptions;
}
