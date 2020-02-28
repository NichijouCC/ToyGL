import { Asset } from "../asset/Asset";
import { Texture } from "../../webgl/Texture";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";

export abstract class TextureAsset extends Asset
{
    protected graphicAsset: Texture;
    protected beNeedRefreshGraphicAsset: boolean = false;
    protected abstract create(device: GraphicsDevice): Texture
    protected abstract refresh(device: GraphicsDevice): void

    bind(device: GraphicsDevice, unit: number = 0)
    {
        if (this.graphicAsset == null)
        {
            this.graphicAsset = this.create(device);
            this.onCreated.raiseEvent();
            this.beNeedRefreshGraphicAsset = false;
        }
        if (this.beNeedRefreshGraphicAsset)
        {
            this.refresh(device);
            this.beNeedRefreshGraphicAsset = false;
        }
        this.graphicAsset?.bind(unit);
    }
    unbind()
    {
        this.graphicAsset.unbind();
    }

    destroy()
    {
        this.graphicAsset?.destroy();
        super.destroy();
    }
}