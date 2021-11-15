import { mat4, vec3 } from "../../mathD";
import { Asset } from "../../resources";
import { BoundingBox, BoundingSphere } from "../../scene";
import { I3dTilesJson, IRefine, ITile, ITileFormat } from "./type";

export class Tileset3dParser {
    static parse(json: I3dTilesJson, baseUrl: string) {
        let tiles = new Cesium3dTiles();
        tiles.geometricError = json.geometricError;
        tiles.root = this.parseTileNode(json.root, baseUrl);
        return tiles;
    }

    static parseTileNode(node: ITile, baseUrl: string) {
        let tile = new TilesNode();
        tile.geometricError = node.geometricError;
        tile.boundingVolume = parseBoundingVolume(node.boundingVolume);
        if (node.transform) {
            tile.transform = mat4.fromArray(node.transform);
        } else {
            tile.transform = mat4.create();
        }
        if (node.content) {
            tile.content = {} as any;
            if (node.content.boundingVolume) {
                tile.content.boundingVolume = parseBoundingVolume(node.content.boundingVolume);
            }
            tile.content.url = node.content.url;
            if (tile.content.url.endsWith("b3dm")) {
                tile.content.format = "b3dm";
            } else if (tile.content.url.endsWith("i3dm")) {
                tile.content.format = "i3dm";
            } else if (tile.content.url.endsWith("pnts")) {
                tile.content.format = "pnts";
            } else if (tile.content.url.endsWith("cmpt")) {
                tile.content.format = "cmpt";
            } else if (tile.content.url.endsWith("json")) {
                tile.content.format = "json";
            }
            else {
                throw new Error(`unknown tile format ${tile.content.url}`)
            }
        }
        if (node.children) {
            tile.children = [];
            for (let i = 0; i < node.children.length; i++) {
                let childTile = this.parseTileNode(node.children[i], baseUrl);
                tile.children.push(childTile);
            }
        }
        return tile;
    }
}

function parseBoundingVolume(bv: any) {
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
export interface ITileContent {

}


export class Cesium3dTiles extends Asset {
    geometricError: number;
    root: TilesNode;
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class TilesNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    transform: mat4;//mat4
    content?: {
        boundingVolume?: IBoundingVolume,
        url: string,
        format: ITileFormat;
        tile: ITileContent;
    };
    viewerRequestVolume?: IBoundingVolume;
    refine?: IRefine;
    children?: TilesNode[];
    extras?: any;
}