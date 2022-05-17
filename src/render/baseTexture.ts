import { Asset } from "../resources/asset";
import { GraphicsDevice, IBaseTextureOptions, PixelDatatypeEnum, PixelFormatEnum, Texture, TextureFilterEnum, TextureWrapEnum } from "../webgl";

export abstract class BaseTexture extends Asset {
    protected _pixelFormat: PixelFormatEnum;
    get pixelFormat() { return this._pixelFormat };
    set pixelFormat(value: PixelFormatEnum) {
        this._pixelFormat = value;
        this.beDirty = true;
    }
    protected _pixelDatatype: PixelDatatypeEnum;
    get pixelDatatype() { return this._pixelDatatype };
    set pixelDatatype(value: PixelDatatypeEnum) {
        this._pixelDatatype = value;
        this.beDirty = true;
    }

    protected _preMultiplyAlpha: boolean;
    get preMultiplyAlpha() { return this._preMultiplyAlpha }
    set preMultiplyAlpha(value: boolean) {
        this._preMultiplyAlpha = value;
        this.beDirty = true;
    }
    protected _flipY: boolean;
    set flipY(value: boolean) { this._flipY = value; }
    get flipY() { return this._flipY }

    protected _filterMax: TextureFilterEnum;
    get filterMax() { return this._filterMax; }
    set filterMax(value: TextureFilterEnum) {
        this._filterMax = value;
        this.beDirty = true;
    }
    protected _filterMin: TextureFilterEnum;
    get filterMin() { return this._filterMin }
    set filterMin(value: TextureFilterEnum) {
        this._filterMin = value;
        this.beDirty = true;
    }
    protected _wrapS: TextureWrapEnum;
    get wrapS() { return this._wrapS }
    set wrapS(value: TextureWrapEnum) {
        this._wrapS = value;
        this.beDirty = true;
    }
    protected _wrapT: TextureWrapEnum;
    get wrapT() { return this._wrapT }
    set wrapT(value: TextureWrapEnum) {
        this._wrapT = value;
        this.beDirty = true;
    }
    protected _maximumAnisotropy: number;
    get maximumAnisotropy() { return this._maximumAnisotropy; }
    set maximumAnisotropy(value: number) {
        this._maximumAnisotropy = value;
        this.beDirty = true;
    }
    protected _enableMipmap: boolean;
    get enableMipmap() { return this._enableMipmap }
    set enableMipmap(value: boolean) {
        this._enableMipmap = value;
        this.beDirty = true;
    }
    protected _mipmapFilter: TextureFilterEnum;
    get mipmapFilter() { return this._mipmapFilter }
    set mipmapFilter(value: TextureFilterEnum) {
        this._mipmapFilter = value;
        this.beDirty = true;
    }
    protected _glTarget: Texture;
    get glTarget() { return this._glTarget };

    constructor(options: IBaseTextureOptions) {
        super();
        this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
        this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
        this._preMultiplyAlpha = options.preMultiplyAlpha || this._pixelFormat === PixelFormatEnum.RGB || this._pixelFormat === PixelFormatEnum.LUMINANCE;
        this._flipY = options.flipY ?? false;

        this._filterMax = options.filterMax ?? TextureFilterEnum.LINEAR;
        this._filterMin = options.filterMin ?? TextureFilterEnum.LINEAR;
        this._wrapS = options.wrapS ?? TextureWrapEnum.REPEAT;
        this._wrapT = options.wrapT ?? TextureWrapEnum.REPEAT;
        this._maximumAnisotropy = options?.maximumAnisotropy ?? 1.0;
        this._enableMipmap = options.enableMipmap ?? true;
        this._mipmapFilter = options.mipmapFilter ?? TextureFilterEnum.LINEAR;
    }

    set(options: Partial<IBaseTextureOptions>) {
        if (options.pixelFormat != null) this._pixelFormat = options.pixelFormat;
        if (options.pixelDatatype != null) this._pixelDatatype = options.pixelDatatype;
        if (options.preMultiplyAlpha != null) this._preMultiplyAlpha = options.preMultiplyAlpha;
        if (options.flipY != null) this._flipY = options.flipY;
        if (options.filterMax != null) this._filterMax = options.filterMax;
        if (options.filterMin != null) this._filterMin = options.filterMin;
        if (options.wrapS != null) this._wrapS = options.wrapS;
        if (options.wrapT != null) this._wrapT = options.wrapT;
        if (options.maximumAnisotropy != null) this._maximumAnisotropy = options.maximumAnisotropy;
        if (options.enableMipmap != null) this._enableMipmap = options.enableMipmap;
        if (options.mipmapFilter != null) this._mipmapFilter = options.mipmapFilter;
        this.beDirty = true;
    }
    protected beDirty: boolean = false;
    syncData(device: GraphicsDevice) {
        if (this._glTarget == null) {
            this._glTarget = this.create(device);
            this.beDirty = false;
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
        return this._glTarget;
    }

    protected abstract create(device: GraphicsDevice): Texture

    destroy() {
        this.glTarget?.destroy();
    }
}
