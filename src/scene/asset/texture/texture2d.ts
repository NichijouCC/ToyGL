import { Asset, IGraphicAsset } from "../asset";
import { Texture, IsamplerOptions, Sampler } from "../../../webgl/texture";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { PixelFormatEnum } from "../../../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../../../webgl/pixelDatatype";
import { BaseTexture } from "./baseTexture";

export class Texture2D extends BaseTexture {
    protected create(device: GraphicsDevice): Texture {
        if (this._source) {
            return Texture.fromImageSource({
                context: device,
                image: this._source,
                pixelFormat: this._pixelFormat,
                pixelDatatype: this._pixelDatatype,
                sampler: this.sampler,
                flipY: this._flipY
            });
        }
        return null;
    }

    protected refresh(device: GraphicsDevice): void {
        throw new Error("Method not implemented.");
    }

    private _source: TexImageSource;
    set textureSource(source: TexImageSource) { this._source = source; }
    private _pixelFormat: PixelFormatEnum;
    set pixelFormat(format: PixelFormatEnum) { this._pixelFormat = format; };
    private _pixelDatatype: PixelDatatypeEnum;
    set pixelDatatype(type: PixelDatatypeEnum) { this._pixelDatatype = type; };
    private _preMultiplyAlpha: boolean;
    set preMultiplyAlpha(value: boolean) { this._preMultiplyAlpha = value; }
    private _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    private sampler: Sampler;

    constructor(options?: Itexture2dOption) {
        super();
        this._source = options?.image;
        this._pixelFormat = options?.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options?.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
        this._preMultiplyAlpha = options?.preMultiplyAlpha || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options?.flipY ?? false;
        this.sampler = new Sampler(options?.sampler);
    }
}

export interface Itexture2dOption {
    image: TexImageSource;

    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;

    // ----------------texParameteri-------------
    sampler?: IsamplerOptions;
}
