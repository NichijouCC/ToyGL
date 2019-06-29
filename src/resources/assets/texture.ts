import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItexImageDataOption } from "../../render/glRender";

export class Texture extends ToyAsset implements ItextureInfo {
    texture: WebGLTexture;
    texDes: ItexImageDataOption;
    imageData: TexImageSource;
    width: number = 0;
    height: number = 0;

    // samplerInfo: TextureOption = new TextureOption();
    constructor(param?: ItoyAsset) {
        super(param);
    }
    dispose() {}
}
