import { GlTextrue, ItextureDesInfo, WebglRender } from "../../render/webglRender";
import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo } from "../../render/webglRender";

export class Texture extends ToyAsset implements ItextureInfo {
    // texture:WebGLTexture;
    private _textrue: WebGLTexture;
    get texture(): WebGLTexture {
        return this._textrue || GlTextrue.WHITE.texture;
    }
    set texture(value: WebGLTexture) {
        this._textrue = value;
    }
    texDes: ItextureDesInfo;
    // samplerInfo: TextureOption = new TextureOption();
    constructor(param?: ItoyAsset) {
        super(param);
    }
    dispose() { }

    static fromImageSource(img: TexImageSource, texOp?: ItextureDesInfo, texture?: Texture) {
        let imaginfo = WebglRender.createTextureFromImg(img, texOp);
        if (texture != null) {
            texture.texture = imaginfo.texture;
            texture.texDes = imaginfo.texDes;
            return texture;
        } else {
            let texture = new Texture();
            texture.texture = imaginfo.texture;
            texture.texDes = imaginfo.texDes;
            return texture;
        }
    }

    static fromViewData(
        viewData: ArrayBufferView,
        width: number,
        height: number,
        texOp?: ItextureDesInfo,
        texture?: Texture,
    ) {
        let imaginfo = WebglRender.createTextureFromViewData(viewData, width, height, texOp);
        if (texture != null) {
            texture.texture = imaginfo.texture;
            texture.texDes = imaginfo.texDes;
            return texture;
        } else {
            let texture = new Texture();
            texture.texture = imaginfo.texture;
            texture.texDes = imaginfo.texDes;
            return texture;
        }
    }
}
