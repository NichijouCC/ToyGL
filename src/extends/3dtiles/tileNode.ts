import { BoundingSphere, mat4, Ray } from "../../index";
import { B3dmTile } from "./b3dm";
import { ITileFrameState } from "./tilesetSystem";
import { IRefine, ITile } from "./type";
import { IBoundingVolume, I3DTileContent, parseBoundingVolume, Tileset } from "./tileset";
import { Cesium3dTileset } from "./Cesium3dTileset";


export class TileNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    transform: mat4; //mat4
    content?: I3DTileContent | Tileset;
    viewerRequestVolume?: IBoundingVolume;
    refine?: IRefine;
    parent?: TileNode;
    children?: TileNode[];
    extras?: any;
    root: Cesium3dTileset;

    readonly asset: Cesium3dTileset;
    constructor(data: ITile, parentNode: TileNode, baseUrl: string, asset: Cesium3dTileset) {
        this.asset = asset;
        this.geometricError = data.geometricError;
        this.boundingVolume = parseBoundingVolume(data.boundingVolume);
        if (data.transform) {
            this.transform = mat4.fromArray(data.transform);
        } else {
            this.transform = mat4.create();
        }
        this.parent = parentNode;
        this.refine = data.refine ?? parentNode.refine;
        if (data.content) {
            let url = data.content.url ?? data.content.uri;
            if (url.endsWith("b3dm")) {
                this.content = new B3dmTile(data.content, baseUrl, this);
            } else if (url.endsWith("i3dm")) {
            } else if (url.endsWith("pnts")) {
            } else if (url.endsWith("cmpt")) {
            } else if (url.endsWith("json")) {
                this.content = new Tileset(`${baseUrl}/${url}`, this.asset);
            }
            else {
                throw new Error(`unknown tile format ${url}`);
            }
        }
        if (data.children) {
            this.children = [];
            for (let i = 0; i < data.children.length; i++) {
                let childTile = new TileNode(data.children[i], this, baseUrl, asset);
                this.children.push(childTile);
            }
        }
    }
    currentSSE: number;
    update(options: ITileFrameState) {
        if (this.children != null && this.refine == "REPLACE") {
            let useChild = false;
            for (let i = 0; i < this.children.length; i++) {
                let childSSE = options.computeTileNodeSSE(this.children[i]);
                this.children[i].currentSSE = childSSE;
                if (childSSE > options.maximumScreenSpaceError) {
                    useChild = true;
                    break;
                }
            }
            if (useChild) {
                this.children.forEach(el => {
                    el.update(options);
                });
            } else {
                if (this.content) {
                    if (this.content instanceof Tileset) {
                        this.content.update(options);
                    } else {
                        options.needNodes.add(this);
                    }
                    // this.content.update(options);
                }
            }
        } else {
            if (this.content) {
                if (this.content instanceof Tileset) {
                    this.content.update(options);
                } else {
                    options.needNodes.add(this);
                }
                // this.content.update(options);
            }
            this.children?.forEach(el => el.update(options));
        }
    }
}
