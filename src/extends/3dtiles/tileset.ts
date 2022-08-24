import { BoundingBox, BoundingSphere, IRenderable, loadJson, Ray, vec3 } from "../../index";
import { Loader } from "./loader";
import { TileNode } from "./tileNode";
import { ITileFrameState } from "./tilesetSystem";
import { I3dTiles, ITileFormat } from "./type";

export class Tileset implements I3DTileContent {
    beActive: boolean;
    loadState: LoadState = "NONE"
    geometricError: number;
    root: TileNode;
    //json
    readonly url: string;
    readonly loader: Loader;

    get boundingVolume() { return this.root.boundingVolume }
    constructor(url: string, loader: Loader) {
        this.url = url;
        this.beActive = false;
        this.loadState = "NONE"
        this.loader = loader;
    }
    static create(url: string, loader: Loader) {
        let tile = new Tileset(url, loader);
        return tile.load()
    }

    update(options: ITileFrameState) {
        switch (this.loadState) {
            case "NONE":
                this.load();
                break;
            case "ASSET_READY":
                this.root.update(options);
                break;
        }
    }

    private load() {
        this.loadState = "ASSET_LOADING";
        return this.loader.queue.push(() => {
            return loadJson(this.url)
                .then((json) => {
                    this.geometricError = json.geometricError;
                    this.root = new TileNode(json.root, null, this.url.substring(0, this.url.lastIndexOf("/")), this.loader);
                    console.log("load tileset json", this.url)
                    this.loadState = "ASSET_READY";
                    return this;
                })
        })
    }

    rayTest(ray: Ray) {

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
    beActive: boolean
    loadState: LoadState
    update(state: ITileFrameState)
}