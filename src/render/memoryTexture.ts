import { TypedArray } from "../core/typedArray";
import { GraphicsDevice, IBaseTextureOptions, Texture } from "../webgl";
import { BaseTexture } from "./baseTexture";

export class MemoryTexture extends BaseTexture {
    private _width: number;
    private _sourceDirty: boolean = false;
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

    set(options: Partial<IMemoryTextureOption>): void {
        super.set(options);
        if (options.arrayBufferView) {
            this._arrayBufferView = options.arrayBufferView;
            this._width = options.width;
            this._height = options.height;
            this._sourceDirty = true;
        }
    }
    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            this._glTarget = this.create(device);
            this.beDirty = false;
            this._sourceDirty = false;
        } else {
            if (this._sourceDirty) {
                this._sourceDirty = false;
                this.beDirty = false;
                this._glTarget.destroy();
                this._glTarget = this.create(device);
            } else if (this.beDirty) {
                this.beDirty = false;
                this._glTarget.set({
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
                });
            }
        }
        return this._glTarget;
    }
}

export interface IMemoryTextureOption extends IBaseTextureOptions {
    width: number;
    height: number;
    arrayBufferView?: TypedArray;
}
