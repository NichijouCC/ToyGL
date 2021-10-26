import { loadJson } from "../io";
import { mat4 } from "../mathD";
import { IAssetLoader } from "../resources";
import { Asset } from "../resources";
import { I3dTilesJson, IRefine } from "./3dtiles/type";

export class Load3dtiles implements IAssetLoader {
    load(url: string): Promise<Asset> {
        loadJson(url)
            .then((res: I3dTilesJson) => {

            })
    }
}

export interface IBoundingVolume {

}

export class TilesNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    content?: {
        boundingVolume: IBoundingVolume,
        uri: string,
    };
    viewerRequestVolume?: IBoundingVolume;
    transform?: mat4;//mat4
    refine?: IRefine;
    children?: TilesNode[];
    extras?: any;
}