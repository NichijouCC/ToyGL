import { Asset, IAssetLoader, IRenderable, vec3 } from "../../index";
import { LoadGlTF } from "../glTF/index";
import { Gltf1Loader } from "./gltf1";
import { Tileset } from "./tileset";
import { ITileFrameState } from "./tilesetSystem";

export class Loader implements IAssetLoader {
    readonly gltfLoader = new Gltf1Loader();
    load(url: string): Promise<Cesium3dTileset> {
        return Cesium3dTileset.create(url, this)
    }
}

export class Cesium3dTileset extends Asset {
    private _data: Tileset;
    get data() { return this._data }
    get boundingVolume() { return this._data.boundingVolume }
    static create(url: string, loader: Loader) {
        let tileset = new Cesium3dTileset();
        return Tileset.create(url, loader)
            .then((res) => {
                tileset._data = res;
                return tileset;
            })
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    update(options: ITileFrameState) {
        this.data.update(options);
    }
}
