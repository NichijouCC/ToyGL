import { Texture, TextureFilter, TextureWrap } from "@esotericsoftware/spine-core";
import { Texture2D, TextureFilterEnum } from "../../render";

export class SpineTexture extends Texture {
    private _texture: Texture2D;
    get texture(): Texture2D { return this._texture; }
    get width() { return this._texture.width }
    get height() { return this._texture.height }
    constructor(image: HTMLImageElement | ImageBitmap) {
        super(image);
        this._texture = new Texture2D({ image, flipY: false });
    }
    setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void {
        switch (minFilter) {
            case TextureFilter.Linear:
                this._texture.filterMin = TextureFilterEnum.LINEAR;
                break;
            case TextureFilter.Nearest:
                this._texture.filterMin = TextureFilterEnum.NEAREST;
                break;
            case TextureFilter.MipMapLinearLinear:
                this._texture.enableMipmap = true;
                this._texture.filterMin = TextureFilterEnum.LINEAR;
                this._texture.mipmapFilter = TextureFilterEnum.LINEAR;
                break;
            case TextureFilter.MipMapLinearNearest:
                this._texture.enableMipmap = true;
                this._texture.filterMin = TextureFilterEnum.LINEAR;
                this._texture.mipmapFilter = TextureFilterEnum.NEAREST;
                break;
            case TextureFilter.MipMapNearestLinear:
                this._texture.enableMipmap = true;
                this._texture.filterMin = TextureFilterEnum.NEAREST;
                this._texture.mipmapFilter = TextureFilterEnum.LINEAR;
            case TextureFilter.MipMapNearestNearest:
                this._texture.enableMipmap = true;
                this._texture.filterMin = TextureFilterEnum.NEAREST;
                this._texture.mipmapFilter = TextureFilterEnum.NEAREST;
                break;
            case TextureFilter.MipMap:
                this._texture.enableMipmap = true;
                break;
        }
        switch (magFilter) {
            case TextureFilter.Linear:
                this._texture.filterMax = TextureFilterEnum.LINEAR;
                break;
            case TextureFilter.Nearest:
                this._texture.filterMax = TextureFilterEnum.NEAREST;
                break;
            default:
                console.warn("unsupported magFilter type", magFilter);
        }
    }
    setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void {
        this._texture.wrapS = uWrap as any;
        this._texture.wrapT = vWrap as any;
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
}