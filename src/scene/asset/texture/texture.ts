import { ImemoryTextureOption, MemoryTexture } from "./memoryTexture";
import { Itexture2dOption, Texture2D } from "./texture2d";
import { loadImg } from "../../../io/loadTool";

export class TextureAsset {
    static fromTypeArray(options: ImemoryTextureOption) {
        return new MemoryTexture(options);
    }

    static async fromUrl(options: Omit<Itexture2dOption, "image"> & { image: string }) {
        const image = await loadImg(options.image);
        return new Texture2D({ ...options, image });
    }

    static fromImageSource(options: Itexture2dOption) {
        return new Texture2D(options);
    }
}
