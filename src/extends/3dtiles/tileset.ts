import { BoundingBox, BoundingSphere, IRenderable, loadJson, mat4, vec3 } from "../../index";
import { B3dmTile } from "./b3dm";
import { Loader } from "./loader";
import { ITileFrameState } from "./tilesetSystem";
import { I3dTiles, IRefine, ITile, ITileFormat } from "./type";

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
        return loadJson(this.url)
            .then((json) => {
                this.geometricError = json.geometricError;
                this.root = new TileNode(json.root, null, this.url.substring(0, this.url.lastIndexOf("/")), this.loader);
                console.log("load tileset json", this.url)
                this.loadState = "ASSET_READY";
                return this;
            })
    }
}

export class TileNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    transform: mat4;//mat4
    content?: I3DTileContent;
    viewerRequestVolume?: IBoundingVolume;
    refine?: IRefine;
    children?: TileNode[];
    extras?: any;

    readonly loader: Loader;
    constructor(node: ITile, parentNode: TileNode, baseUrl: string, loader: Loader) {
        this.loader = loader;
        this.geometricError = node.geometricError;
        this.boundingVolume = parseBoundingVolume(node.boundingVolume);
        if (node.transform) {
            this.transform = mat4.fromArray(node.transform);
        } else {
            this.transform = mat4.create();
        }
        this.refine = node.refine ?? parentNode.refine;
        if (node.content) {
            let url = node.content.url ?? node.content.uri;
            if (url.endsWith("b3dm")) {
                this.content = new B3dmTile(node.content, baseUrl, loader);
            } else if (url.endsWith("i3dm")) {

            } else if (url.endsWith("pnts")) {

            } else if (url.endsWith("cmpt")) {

            } else if (url.endsWith("json")) {
                this.content = new Tileset(`${baseUrl}/${url}`, this.loader);
            }
            else {
                throw new Error(`unknown tile format ${url}`)
            }
        }
        if (node.children) {
            this.children = [];
            for (let i = 0; i < node.children.length; i++) {
                let childTile = new TileNode(node.children[i], this, baseUrl, loader);
                this.children.push(childTile);
            }
        }
    }

    update(options: ITileFrameState) {
        if (this.children != null && this.refine == "REPLACE") {
            let useChild = false;
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].checkSSE(options)) {
                    useChild = true;
                    break;
                }
            }
            if (useChild) {
                this.children?.forEach(el => el.update(options));
            } else {
                this.content?.update(options);
            }
        } else {
            this.content?.update(options);
            this.children?.forEach(el => el.update(options));
        }
    }

    checkSSE(options: ITileFrameState) {
        let sse = options.sseParams * this.geometricError / vec3.distance(options.campos, this.boundingVolume.center);
        return sse > options.maxSSE;
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