import { Asset, IgraphicAsset } from "./Asset";
import { Texture } from "../../webgl/Texture";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";

export class Texture2D extends Asset implements IgraphicAsset
{
    private _tex: Texture;
    set glTexture(tex: Texture)
    {
        if (this._tex != null)
        {
            this._tex.destroy();
        }
        this._tex = tex;
    }
    get glTexture() { return this._tex }
    bind(device: GraphicsDevice): void
    {
        this._tex?.bind();
    }
    unbind(): void
    {
        this._tex?.unbind();
    }
    destroy(): void
    {
        this._tex?.destroy();
    }
}