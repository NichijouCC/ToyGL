import { ToyAsset, ItoyAsset } from "../base/toyAsset";

export class Texture extends ToyAsset {
    imageData:TexImageSource;
    width: number = 0;
    height: number = 0;

    // samplerInfo: TextureOption = new TextureOption();
    constructor(param?: ItoyAsset) {
        super(param);
    }
    glTexture: WebGLTexture;
    dispose() {}
}
