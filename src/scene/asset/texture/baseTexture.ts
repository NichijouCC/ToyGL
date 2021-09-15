import { Asset } from "../asset";
import { Texture } from "../../../webgl/texture";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";

export abstract class BaseTexture extends Asset {
    graphicAsset: Texture;
    protected beNeedRefreshGraphicAsset: boolean = false;
    protected abstract create(device: GraphicsDevice): Texture
    protected abstract refresh(device: GraphicsDevice): void

    bind(device: GraphicsDevice) {
        if (this.graphicAsset == null) {
            this.graphicAsset = this.create(device);
            this.onCreated.raiseEvent();
            this.beNeedRefreshGraphicAsset = false;
        }
        if (this.beNeedRefreshGraphicAsset) {
            this.refresh(device);
            this.beNeedRefreshGraphicAsset = false;
        }
        // this.graphicAsset?.bind();
    }

    unbind() {
        this.graphicAsset.unbind();
    }

    markDirty() {
        this.beNeedRefreshGraphicAsset = true;
    }

    destroy() {
        this.graphicAsset?.destroy();
    }
}
