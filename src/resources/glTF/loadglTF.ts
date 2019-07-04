import { IassetLoader, Iasset, IassetLoadInfo } from "../type";
import { getFileName, getAssetFlode } from "../base/helper";
import { GltfAsset } from "../assets/gltfAsset";
import { loadText, loadJson, loadArrayBuffer } from "../../io/loadtool";
import { BinReader } from "../../io/stream";
import { Igltf, Iproperty } from "./gltfJsonStruct";
import { Material } from "../assets/material";
import { Texture } from "../assets/texture";
import { Geometry } from "../assets/geometry";
import { ParseSceneNode } from "./parseSceneNode";
import { LoadEnum } from "../base/loadEnum";
import { GlBuffer } from "../../render/glRender";

export interface IglTFExtension {
    load(extensionNode: any, loader: LoadGlTF): Promise<any>;
}

export interface IgltfPrimitive {
    geometry: Geometry;
    material: Material;
}

export interface IgltfBufferview {
    viewBuffer: Uint8Array;
    glBuffer?: GlBuffer;
    byteStride: number;
}
export class GltfNodeCache {
    meshNodeCache: { [index: number]: Promise<IgltfPrimitive[]> } = {};
    bufferviewNodeCache: { [index: number]: Promise<IgltfBufferview> } = {};
    bufferNodeCache: { [index: number]: Promise<ArrayBuffer> } = {};
    materialNodeCache: { [index: number]: Promise<Material> } = {};
    textrueNodeCache: { [index: number]: Promise<Texture> } = {};
    // beContainAnimation: boolean = false;
    // skinNodeCache: { [index: number]: SkinNode } = {};
    // animationNodeCache: { [index: number]: AnimationClip } = {};
}

export interface IgltfJson extends Igltf {
    rootURL: string;
    cache: GltfNodeCache;
}
export class LoadGlTF implements IassetLoader {
    onProgress: (progress: number) => void;
    onFinish: (asset: Iasset, state: IassetLoadInfo) => void;
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void,
    ): Iasset {
        let name = getFileName(url);
        let asset = new GltfAsset({ name: name, URL: url });

        this.onProgress = onProgress;
        this.onFinish = onFinish;
        this.loadAsync(url)
            .then(gltfJson => {
                let scene = gltfJson.scene ? gltfJson.scene : 0;
                ParseSceneNode.parse(scene, gltfJson).then(trans => {
                    asset.roots = trans;

                    if (this.onFinish) {
                        this.onFinish(asset, { loadState: LoadEnum.Success, url: url });
                    }
                });
            })
            .catch(error => {
                let errorMsg = "ERROR: Load GLTFAsset Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
                console.error(errorMsg);
            });
        return asset;
    }
    //------------------extensions
    static ExtensionDic: { [type: string]: IglTFExtension } = {};
    static regExtension(type: string, extension: IglTFExtension) {
        this.ExtensionDic[type] = extension;
    }

    getExtensionData(node: Iproperty, extendname: string): Promise<any> {
        if (node.extensions == null) return null;
        let extension = LoadGlTF.ExtensionDic[extendname];
        if (extension == null) return null;
        let info = node.extensions[extendname];
        if (info == null) return null;
        return extension.load(info, this);
    }

    //------------------------------------load bundle asset
    private loadAsync(url: string): Promise<IgltfJson> {
        if (url.endsWith(".gltf")) {
            return loadJson(url).then(json => {
                let gltfJson = json as any;
                gltfJson.cache = new GltfNodeCache();
                gltfJson.rootURL = getAssetFlode(url);
                return gltfJson;
            });
        } else {
            return this.loadglTFBin(url).then((value: { json: any; chunkbin: Uint8Array[] }) => {
                let gltfJson = value.json as IgltfJson;
                gltfJson.cache = new GltfNodeCache();
                gltfJson.rootURL = getAssetFlode(url);

                for (let i = 0; i < value.chunkbin.length; i++) {
                    gltfJson.cache.bufferNodeCache[i] = Promise.resolve(value.chunkbin[i].buffer);
                }
                return gltfJson;
            });
        }
    }
    private async loadglTFBin(url: string): Promise<{ json: JSON; chunkbin: Uint8Array[] }> {
        return loadArrayBuffer(url).then(bin => {
            const Binary = {
                Magic: 0x46546c67,
            };
            let breader = new BinReader(bin);
            let magic = breader.readUint32();
            if (magic !== Binary.Magic) {
                throw new Error("Unexpected magic: " + magic);
            }
            let version = breader.readUint32();
            if (version != 2) {
                throw new Error("Unsupported version:" + version);
            }
            let length = breader.readUint32();
            if (length !== breader.getLength()) {
                throw new Error(
                    "Length in header does not match actual data length: " + length + " != " + breader.getLength(),
                );
            }

            let ChunkFormat = {
                JSON: 0x4e4f534a,
                BIN: 0x004e4942,
            };
            // JSON chunk
            let chunkLength = breader.readUint32();
            let chunkFormat = breader.readUint32();
            if (chunkFormat !== ChunkFormat.JSON) {
                throw new Error("First chunk format is not JSON");
            }
            let _json = JSON.parse(breader.readUint8ArrToString(chunkLength));
            let _chunkbin: Uint8Array[] = [];
            while (breader.canread() > 0) {
                const chunkLength = breader.readUint32();
                const chunkFormat = breader.readUint32();
                switch (chunkFormat) {
                    case ChunkFormat.JSON:
                        throw new Error("Unexpected JSON chunk");
                    case ChunkFormat.BIN:
                        _chunkbin.push(breader.readUint8Array(chunkLength));
                        break;
                    default:
                        // ignore unrecognized chunkFormat
                        breader.skipBytes(chunkLength);
                        break;
                }
            }
            return { json: _json, chunkbin: _chunkbin };
        });
    }
}
