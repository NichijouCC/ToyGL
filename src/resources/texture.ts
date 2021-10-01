import { loadImg } from "../io/loadTool";
import { IMemoryTextureOption, ITexture2dOption, MemoryTexture, Texture2D } from "../render";

export class TextureAsset {
    static fromTypeArray(options: IMemoryTextureOption) {
        return new MemoryTexture(options);
    }

    static async fromUrl(options: Omit<ITexture2dOption, "image"> & { image: string }) {
        const image = await loadImg(options.image);
        return new Texture2D({ ...options, image });
    }

    static fromImageSource(options: ITexture2dOption) {
        return new Texture2D(options);
    }
}
