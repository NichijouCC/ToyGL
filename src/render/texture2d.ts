import { GraphicsDevice, IBaseTextureOptions, Texture } from "../webgl";
import { BaseTexture } from "./baseTexture";

export class Texture2D extends BaseTexture {
    private _source: TexImageSource;
    readonly width: number;
    readonly height: number;
    constructor(options: ITexture2dOption) {
        super(options);
        this._source = options.image;
        this.width = options.image.width;
        this.height = options.image.height;
        this._flipY = options.flipY ?? true;
    }

    protected create(device: GraphicsDevice): Texture {
        return device.createTextureFromImageSource({
            image: this._source,
            pixelFormat: this._pixelFormat,
            pixelDatatype: this._pixelDatatype,
            preMultiplyAlpha: this._preMultiplyAlpha,
            flipY: this._flipY,
            magFilter: this._magFilter,
            minFilter: this._minFilter,
            wrapS: this._wrapS,
            wrapT: this._wrapT,
            maximumAnisotropy: this._maximumAnisotropy,
            enableMipmap: this._enableMipmap,
            mipmapFilter: this._mipmapFilter,
        });
    }
}

export interface ITexture2dOption extends IBaseTextureOptions {
    image: TexImageSource;
}
