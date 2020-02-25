import { Asset, IgraphicAsset } from "./Asset";
import { Texture, IsamplerOptions, Sampler } from "../../webgl/Texture";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { PixelFormatEnum } from "../../webgl/PixelFormatEnum";
import { PixelDatatypeEnum } from "../../webgl/PixelDatatype";
import { TextureFilterEnum } from "../../webgl/TextureFilterEnum";
import { TextureWrapEnum } from "../../webgl/TextureWrapEnum";

export class Texture2D extends Asset implements ItextureAsset
{
    private _tex: Texture;
    // set glTexture(tex: Texture)
    // {
    //     if (this._tex != null)
    //     {
    //         this._tex.destroy();
    //     }
    //     this._tex = tex;
    // }
    get texture() { return this._tex }
    bind(device: GraphicsDevice): void
    {
        if (this._tex == null && this._source)
        {
            this._tex = Texture.fromImageSource({
                context: device,
                image: this._source,
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
    destroy(): void
    {
        this._tex?.destroy();
    }


    private _source: TexImageSource;
    set textureSource(source: TexImageSource) { this._source = source; }
    private _pixelFormat: PixelFormatEnum;
    set pixelFormat(format: PixelFormatEnum) { this._pixelFormat = format };
    private _pixelDatatype: PixelDatatypeEnum;
    set pixelDatatype(type: PixelDatatypeEnum) { this._pixelDatatype = type };
    private _preMultiplyAlpha: boolean;
    set preMultiplyAlpha(value: boolean) { this._preMultiplyAlpha = value; }
    private _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    private sampler: Sampler;

    constructor(options: Texture2dOption)
    {
        super();
        this._source = options.image;
        this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE
        this._preMultiplyAlpha = options.preMultiplyAlpha || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options.flipY ?? true;
        this.sampler = new Sampler(options.sampler);
    }
}

export interface Texture2dOption
{
    image: TexImageSource;

    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;

    // ----------------texParameteri-------------
    sampler?: IsamplerOptions;
}

export interface ItextureAsset extends IgraphicAsset
{
    readonly texture: Texture;
}