import { BoundingBox, BoundingSphere, IRenderable, loadJson, Ray, vec3 } from "../../index";
import { Cesium3dTileset } from "./Cesium3dTileset";
import { TileNode } from "./tileNode";
import { ITileFrameState } from "./tilesetSystem";

export class Tileset {
    loadState: LoadState = "NONE"
    geometricError: number;
    root: TileNode;
    //json
    readonly url: string;
    readonly asset: Cesium3dTileset;

    get boundingVolume() { return this.root.boundingVolume }
    constructor(url: string, asset: Cesium3dTileset) {
        this.url = url;
        this.loadState = "NONE"
        this.asset = asset;
    }
    static create(url: string, asset: Cesium3dTileset) {
        let tile = new Tileset(url, asset);
        return tile._load()
    }

    recycleResource() { }

    update(options: ITileFrameState) {
        switch (this.loadState) {
            case "NONE":
                this._load();
                break;
            case "ASSET_READY":
                this.root.update(options);
                break;
        }
    }

    private _load() {
        return this.asset.loader.taskPool.push(() => {
            return loadJson(this.url)
                .then((json) => {
                    this.geometricError = json.geometricError;
                    this.root = new TileNode(json.root, null, this.url.substring(0, this.url.lastIndexOf("/")), this.asset);
                    // console.log("load tileset json", this.url)
                    this.loadState = "ASSET_READY";
                    return this
                })
        })
    }
}

export function parseBoundingVolume(bv: any): IBoundingVolume {
    if (bv["box"]) {
        let data = bv["box"];
        let center = vec3.fromValues(data[0], data[1], data[2]);
        let halfSize = vec3.fromValues(data[3], data[7], data[11]);
        if (data[4] != 0 || data[5] != 0 || data[6] != 0 || data[8] != 0 || data[9] != 0 || data[10] != 0) {
            throw new Error("something wrong！")
        }
        return BoundingBox.create(center, halfSize);
    } else if (bv["sphere"]) {
        let data = bv["sphere"];
        let center = vec3.fromValues(data[0], data[1], data[2]);
        let radius = data[3];
        return BoundingSphere.create({ center, radius });
    }
    // else if (bv["region"]) {
    //     let data = bv["region"];
    //     let region = [data[0], data[1], data[2], data[3]];
    //     let minHeight = data[4];
    //     let maxHeight = data[5];
    //     return BoundingRegion.create({ region, maxHeight, minHeight });
    // } 
    else {
        throw new Error("Something wrong!")
    }
}


//[west, south, east, north, minimum height, maximum height]
export class BoundingRegion {
    region: number[];
    minHeight: number;
    maxHeight: number;
    static create(params: BoundingRegion) {
        let bv = new BoundingRegion();
        bv.region = params.region;
        bv.minHeight = params.minHeight;
        bv.maxHeight = params.maxHeight;
        return bv
    }
}

export interface IBoundingVolume {
    center: vec3;
}

export type LoadState = "NONE" | "ASSET_LOADING" | "ASSET_READY"

export interface I3DTileContent {
    loadState: LoadState
    update(state: ITileFrameState)
    recycleResource()
}