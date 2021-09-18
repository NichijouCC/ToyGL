import { Asset } from "../asset/asset";
import { Texture } from "../../webgl/texture";
import { GraphicsDevice } from "../../webgl/graphicsDevice";

export abstract class BaseTexture extends Asset {
    glTarget: Texture;
    abstract bind(device: GraphicsDevice): void
    destroy() {
        this.glTarget?.destroy();
    }
}
