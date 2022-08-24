import { BoundingSphere, mat4, Ray } from "../../index";
import { B3dmTile } from "./b3dm";
import { Loader } from "./loader";
import { ITileFrameState } from "./tilesetSystem";
import { IRefine, ITile } from "./type";
import { IBoundingVolume, I3DTileContent, parseBoundingVolume, Tileset } from "./tileset";


export class TileNode {
    geometricError: number;
    boundingVolume: IBoundingVolume;
    transform: mat4; //mat4
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
                this.content = new B3dmTile(node.content, baseUrl, this);
            } else if (url.endsWith("i3dm")) {
            } else if (url.endsWith("pnts")) {
            } else if (url.endsWith("cmpt")) {
            } else if (url.endsWith("json")) {
                this.content = new Tileset(`${baseUrl}/${url}`, this.loader);
            }
            else {
                throw new Error(`unknown tile format ${url}`);
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
                this.children.forEach(el => el.update(options));
                // let useParent = false;
                // for (let i = 0; i < this.children.length; i++) {
                //     if (this.children[i].content?.loadState != "ASSET_READY") {
                //         useParent = true;
                //         break;
                //     }
                // }
                // if (useParent) {
                //     this.content?.update(options);
                // }
            } else {
                this.content?.update(options);
            }
        } else {
            this.content?.update(options);
            this.children?.forEach(el => el.update(options));
        }
    }
}
