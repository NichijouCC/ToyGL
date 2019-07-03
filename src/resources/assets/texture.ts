import { GlTextrue, ItextureDesInfo } from './../../render/glRender';
import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItexImageDataOption } from "../../render/glRender";

export class Texture extends ToyAsset implements ItextureInfo {
    // texture:WebGLTexture;
    private _textrue:WebGLTexture
    get texture(): WebGLTexture
    {
        return this._textrue||GlTextrue.WHITE;
    }
    set texture(value:WebGLTexture)
    {
        this._textrue=value;
    }
    texDes: ItextureDesInfo;
    // samplerInfo: TextureOption = new TextureOption();
    constructor(param?: ItoyAsset) {
        super(param);
    }
    dispose() {}
}