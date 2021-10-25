import { loadJson } from "../io";
import { IAssetLoader } from "../resources";
import { Asset } from "../resources";

export class Load3dtiles implements IAssetLoader {
    load(url: string): Promise<Asset> {
        loadJson(url).then(res => {

        })
    }
}