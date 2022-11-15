import { Asset } from "../../index";
import { Loader } from "./loader";
import { TileNode } from "./tileNode";
import { Tileset } from "./tileset";
import { ITileFrameState } from "./tilesetSystem";

export class Cesium3dTileset extends Asset {
    private _data: Tileset;
    get data() { return this._data; }
    get boundingVolume() { return this._data.boundingVolume; }
    private _loader: Loader;
    get loader() { return this._loader; };
    static create(url: string, loader: Loader) {
        let tileset = new Cesium3dTileset();
        tileset._loader = loader;
        return Tileset.create(url, tileset)
            .then((res) => {
                tileset._data = res;
                return tileset;
            });
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    loadedNode: Set<TileNode> = new Set();
    needNodes: Set<TileNode> = new Set();
    update(options: ITileFrameState) {

        let { loadedNode, needNodes } = this;
        needNodes.clear();
        this.data.update({ ...options, needNodes });
        let allLoadReady = true;
        for (let value of needNodes) {
            if (value.content.loadState != "ASSET_READY") {
                allLoadReady = false;
            }
        }

        if (allLoadReady && loadedNode.size != needNodes.size) {
            loadedNode.forEach(el => {
                if (!needNodes.has(el)) {
                    el.content.recycleResource();
                }
            });
        }
        if (!allLoadReady) {
            loadedNode.forEach(el => {
                if (!needNodes.has(el)) {
                    el.content?.update(options);
                }
            })
        }
    }
}
