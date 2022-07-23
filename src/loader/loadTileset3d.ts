import { IAssetLoader, loadJson } from "../index";
import { Cesium3dTiles, Tileset3dParser } from "./3dtiles/tileset3d";

export class LoadTileset3d implements IAssetLoader {
    load(url: string): Promise<Cesium3dTiles> {
        return loadJson(url)
            .then((res: any) => {
                let rootUrl = url.substr(0, url.lastIndexOf("/"));
                return Tileset3dParser.parse(res, rootUrl)
            })
    }
}