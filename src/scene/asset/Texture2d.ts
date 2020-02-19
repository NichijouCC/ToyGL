import { Asset } from "./Asset";
import { Texture } from "../../webgl/Texture";

export class Texture2D extends Asset
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
}