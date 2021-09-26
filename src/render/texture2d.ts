import { Asset, IGraphicAsset } from "../scene/asset/asset";
import { Texture, ISamplerOptions, Sampler } from "../webgl/texture";
import { GraphicsDevice } from "../webgl/graphicsDevice";
import { PixelFormatEnum } from "../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../webgl/pixelDatatype";
import { BaseTexture } from "./baseTexture";

export class Texture2D extends BaseTexture {
    private _source: TexImageSource;
    private _pixelFormat: PixelFormatEnum;
    private _pixelDatatype: PixelDatatypeEnum;
    private _preMultiplyAlpha: boolean;
    private _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    private sampler: Sampler;

    constructor(options: ITexture2dOption) {
        super();
        this._source = options.image;
        this._pixelFormat = options?.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options?.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
        this._preMultiplyAlpha = options?.preMultiplyAlpha || this._pixelFormat === PixelFormatEnum.RGB || this._pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options?.flipY ?? false;
        this.sampler = new Sampler(options?.sampler);
    }

    protected create(device: GraphicsDevice): Texture {
        return device.createTextureFromImageSource({
            image: this._source,
            pixelFormat: this._pixelFormat,
            pixelDatatype: this._pixelDatatype,
            preMultiplyAlpha: this._preMultiplyAlpha,
            sampler: this.sampler,
            flipY: this._flipY,
        });
    }
    private _beDirty: boolean;
    changeData(options: Partial<Omit<ITexture2dOption, "image">>) {
        if (options.pixelFormat) this._pixelFormat = options.pixelFormat;
        if (options.pixelDatatype) this._pixelDatatype = options.pixelDatatype;
        if (options.preMultiplyAlpha) this._preMultiplyAlpha = options.preMultiplyAlpha;
        if (options.flipY) this._flipY = options.flipY;
        this._beDirty = true;
    }

    bind(device: GraphicsDevice) {
        if (this.glTarget == null) {
            this.glTarget = this.create(device);
        }
        if (this._beDirty) {
            //TODO
        }
        this.glTarget?.bind();
    }
}

export interface ITexture2dOption {
    image: TexImageSource;

    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;

    // ----------------texParameteri-------------
    sampler?: ISamplerOptions;
}
