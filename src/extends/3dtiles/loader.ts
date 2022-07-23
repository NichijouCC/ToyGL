import { Asset, IAssetLoader } from "../../index";
import { LoadGlTF } from "../glTF/index";
import { TileSet } from "./tile";

export class Loader implements IAssetLoader {
    loadJson: (url: string) => Promise<any>
    loadBin: (url: string) => Promise<ArrayBuffer>
    readonly gltfLoader = new LoadGlTF();
    load(url: string): Promise<Cesium3dTiles> {
        return Promise.resolve(new Cesium3dTiles(url, this));
    }
}

export class Cesium3dTiles extends Asset {
    readonly data: TileSet;
    readonly url: string;
    readonly loader: Loader;
    constructor(url: string, loader: Loader) {
        super();
        this.url = url;
        this.loader = loader;
        this.data = new TileSet(url, loader);
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    tick() {
        this.data.tick();
    }
}
