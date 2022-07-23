import { AssetManagerBase } from "@esotericsoftware/spine-core";
import { SpineTexture } from "./spineTexture";

export class AssetMgr extends AssetManagerBase {
    constructor(pathPrefix?: string) {
        super((image: HTMLImageElement | ImageBitmap) => new SpineTexture(image), pathPrefix);
    }
}