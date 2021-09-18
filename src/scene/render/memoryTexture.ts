import { Asset, IGraphicAsset } from "../asset/asset";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { TypedArray } from "../../core/typedArray";
import { PixelFormatEnum } from "../../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../../webgl/pixelDatatype";
import { ISamplerOptions, Sampler, Texture } from "../../webgl/texture";
import { BaseTexture } from "./baseTexture";

export class MemoryTexture extends BaseTexture {
    private _width: number;
    private _height: number;
    private _arrayBufferView: TypedArray;

    // ----------------texParameteri-------------
    private _pixelFormat: PixelFormatEnum;
    private _pixelDatatype: PixelDatatypeEnum;
    private _preMultiplyAlpha: boolean;
    private _flipY: boolean;
    private sampler: Sampler;

    constructor(options: IMemoryTextureOption) {
        super();
        this._arrayBufferView = options.arrayBufferView;
        this._width = options.width;
        this._height = options.height;
        this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
        this._preMultiplyAlpha = options.preMultiplyAlpha || this._pixelFormat === PixelFormatEnum.RGB || this._pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options.flipY ?? true;
        this.sampler = new Sampler(options.sampler);
    }

    protected create(device: GraphicsDevice): Texture {
        return device.createTextureFromTypedArray({
            width: this._width,
            height: this._height,
            arrayBufferView: this._arrayBufferView,
            pixelFormat: this._pixelFormat,
            pixelDatatype: this._pixelDatatype,
            preMultiplyAlpha: this._preMultiplyAlpha,
            sampler: this.sampler,
            flipY: this._flipY,
        })
    }
    private _beDirty: boolean;
    changeData(options: Partial<Omit<IMemoryTextureOption, "arrayBufferView" | "width" | "height">>) {
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
    markDirty() {
        this._beDirty = true;
    }
}

export interface IMemoryTextureOption {
    width: number;
    height: number;
    arrayBufferView: TypedArray;
    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;

    // ----------------texParameteri-------------
    sampler?: ISamplerOptions;
}
