import { GlTextrue, ItextureDesInfo, GlRender } from "./../../render/glRender";
import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItexImageDataOption } from "../../render/glRender";
import { TypedArray, ItexViewDataOption } from "twebgl/dist/types/type";

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
    dispose() {}

    static fromImageSource(img: TexImageSource, texOp?: ItexImageDataOption, texture?: Texture) {
        let imaginfo = GlRender.createTextureFromImg(img, texOp);
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
        viewData: TypedArray,
        width: number,
        height: number,
        texOp?: ItextureDesInfo,
        texture?: Texture,
    ) {
        let imaginfo = GlRender.createTextureFromViewData(viewData, width, height, texOp);
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
