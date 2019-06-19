import { ToyAsset } from "../base/toyAsset";

export class Texture extends ToyAsset {
    imageData: Uint8Array | HTMLImageElement | HTMLCanvasElement;
    width: number = 0;
    height: number = 0;

    // samplerInfo: TextureOption = new TextureOption();
    constructor(name?: string, url?: string) {
        super({ name: name, URL: url });
    }
    glTexture: WebGLTexture;
    dispose() {}
}
