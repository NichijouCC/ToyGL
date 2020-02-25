import { Asset, IgraphicAsset } from "./Asset";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { TypedArray } from "../../core/TypedArray";
import { PixelFormatEnum } from "../../webgl/PixelFormatEnum";
import { PixelDatatypeEnum } from "../../webgl/PixelDatatype";
import { IsamplerOptions, Sampler, Texture } from "../../webgl/Texture";
import { ItextureAsset } from "./Texture2d";

export class MemoryTexture extends Asset implements ItextureAsset
{
    private _tex: Texture;
    get texture() { return this._tex }
    bind(device: GraphicsDevice): void
    {
        if (this._tex == null && this.arrayBufferView)
        {
            this._tex = Texture.fromTypedArray({
                context: device,
                width: this.width,
                height: this.height,
                arrayBufferView: this.arrayBufferView,
                pixelFormat: this._pixelFormat,
                pixelDatatype: this._pixelDatatype,
                sampler: this.sampler
            })
        }
        this._tex?.bind();
    }
    unbind(): void
    {
        this._tex?.unbind();
    }

    width: number;
    height: number;
    arrayBufferView: TypedArray;
    // ----------------texParameteri-------------
    private _pixelFormat: PixelFormatEnum;
    set pixelFormat(format: PixelFormatEnum) { this._pixelFormat = format };
    private _pixelDatatype: PixelDatatypeEnum;
    set pixelDatatype(type: PixelDatatypeEnum) { this._pixelDatatype = type };
    private _preMultiplyAlpha: boolean;
    set preMultiplyAlpha(value: boolean) { this._preMultiplyAlpha = value; }
    private _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    private sampler: Sampler;

    constructor(options: ImemoryTextureOption)
    {
        super();
        this.arrayBufferView = options.arrayBufferView;
        this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE
        this._preMultiplyAlpha = options.preMultiplyAlpha || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options.flipY ?? true;
        this.sampler = new Sampler(options.sampler);
    }

}

export interface ImemoryTextureOption
{
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