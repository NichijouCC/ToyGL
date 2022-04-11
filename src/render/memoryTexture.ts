import { GraphicsDevice } from "../webgl/graphicsDevice";
import { TypedArray } from "../core/typedArray";
import { PixelFormatEnum } from "../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../webgl/pixelDatatype";
import { ISamplerOptions, Sampler, Texture } from "../webgl/texture";
import { BaseTexture, IBaseTextureOptions } from "./baseTexture";

export class MemoryTexture extends BaseTexture {
    private _width: number;
    get width() { return this._width };
    private _height: number;
    get height() { return this._height };
    private _arrayBufferView: TypedArray;

    constructor(options: IMemoryTextureOption) {
        super(options);
        this._arrayBufferView = options.arrayBufferView;
        this._width = options.width;
        this._height = options.height;
    }
    protected create(device: GraphicsDevice): Texture {
        return device.createTextureFromTypedArray({
            width: this._width,
            height: this._height,
            arrayBufferView: this._arrayBufferView,
            pixelFormat: this._pixelFormat,
            pixelDatatype: this._pixelDatatype,
            preMultiplyAlpha: this._preMultiplyAlpha,
            flipY: this._flipY,
            filterMax: this._filterMax,
            filterMin: this._filterMin,
            wrapS: this._wrapS,
            wrapT: this._wrapT,
            maximumAnisotropy: this._maximumAnisotropy,
            enableMipmap: this._enableMipmap,
            mipmapFilter: this._mipmapFilter,
        })
    }
}

export interface IMemoryTextureOption extends IBaseTextureOptions {
    width: number;
    height: number;
    arrayBufferView: TypedArray;
}
