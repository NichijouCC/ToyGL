import { mat4, vec3 } from "../../mathD";
import { BoundingBox, BoundingSphere } from "../../scene";
import { B3dmTile } from "./b3dm";
import { Loader } from "./loader";
import { I3dTiles, IRefine, ITile, ITileFormat } from "./type";

export class TileSet implements IFeatureTile {
    beActive: boolean;
    loadState: LoadState;
    geometricError: number;
    root: TileNode;
    //json
    readonly url: string;
    readonly loader: Loader;
    constructor(url: string, loader: Loader) {
        this.url = url;
        this.beActive = false;
        this.loadState = "NONE"
        this.loader = loader;
    }
    show() {
        throw new Error("Method not implemented.");
    }
    hide() {
        throw new Error("Method not implemented.");
    }
    parse(json: I3dTiles, baseUrl: string) {
        this.geometricError = json.geometricError;
        this.root = new TileNode(json.root, baseUrl, this.loader);
    }
    tick() {

    }
}

export class TileNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    transform: mat4;//mat4
    content?: IFeatureTile;
    viewerRequestVolume?: IBoundingVolume;
    refine?: IRefine;
    children?: TileNode[];
    extras?: any;

    readonly loader: Loader;
    constructor(node: ITile, baseUrl: string, loader: Loader) {
        this.loader = loader;
        this.geometricError = node.geometricError;
        this.boundingVolume = parseBoundingVolume(node.boundingVolume);
        if (node.transform) {
            this.transform = mat4.fromArray(node.transform);
        } else {
            this.transform = mat4.create();
        }
        if (node.content) {
            let url = node.content.url;
            if (url.endsWith("b3dm")) {
                this.content = new B3dmTile(node.content, loader);
            } else if (url.endsWith("i3dm")) {

            } else if (url.endsWith("pnts")) {

            } else if (url.endsWith("cmpt")) {

            } else if (url.endsWith("json")) {

            }
            else {
                throw new Error(`unknown tile format ${url}`)
            }
        }
        if (node.children) {
            this.children = [];
            for (let i = 0; i < node.children.length; i++) {
                let childTile = new TileNode(node.children[i], baseUrl, loader);
                this.children.push(childTile);
            }
        }
    }
}

export function parseBoundingVolume(bv: any) {
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
        let radius = data[4];
        return BoundingSphere.create({ center, radius });
    } else if (bv["region"]) {
        let data = bv["region"];
        let region = [data[0], data[1], data[2], data[3]];
        let minHeight = data[4];
        let maxHeight = data[5];
        return BoundingRegion.create({ region, maxHeight, minHeight });
    } else {
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

}

type LoadState = "NONE" | "JSON_LOADING" | "JSON_READY" | "ASSET_LOADING" | "ASSET_READY"

export interface IFeatureTile {
    beActive: boolean
    loadState: LoadState
    show()
    hide()
}