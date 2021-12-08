import { getAssetDirectory } from "../resources/util";
import { loadJson, loadArrayBuffer } from "../io/loadTool";
import { BinReader } from "../io/stream";
import { IGltf, IProperty } from "./glTF/gltfJsonStruct";
import { ParseSceneNode } from "./glTF/parseSceneNode";
import { Material } from "../render/material";
import { IAssetLoader } from "../resources/resource";
import { Prefab } from "../resources/prefab";
import { Texture2D } from "../render/texture2d";
import { ParseAnimationNode } from "./glTF/parseAnimationNode";
import { Animation } from "../components/animation";
import { GraphicBuffer, GraphicIndexBuffer } from "../render/buffer";
import { Geometry } from "../render/geometry";
import { InterScene } from "../scene/index";

export interface IglTFExtension {
    load(extensionNode: any, loader: LoadGlTF): Promise<any>;
}

export interface IGltfPrimitive {
    geometry: Geometry;
    material: Material;
}

export interface IGltfBufferView {
    viewBuffer: Uint8Array;
    byteStride?: number,
    target?: number
}
export class GltfNodeCache {
    meshNodeCache: { [index: number]: Promise<IGltfPrimitive[]> } = {};
    bufferViewNodeCache: { [index: number]: Promise<IGltfBufferView> } = {};
    bufferNodeCache: { [index: number]: Promise<Uint8Array> } = {};
    materialNodeCache: { [index: number]: Promise<Material> } = {};
    textureNodeCache: { [index: number]: Promise<Texture2D> } = {};
    bufferCache: { [index: number]: GraphicBuffer } = {};
}

export interface IGltfJson extends IGltf {
    rootURL: string;
    cache: GltfNodeCache;
}
export class LoadGlTF implements IAssetLoader {
    private _scene: InterScene;
    constructor(scene: InterScene) {
        this._scene = scene;
    }

    load(url: string): Promise<Prefab> {
        return this.loadAsync(url)
            .then(async (gltfJson) => {
                const scene = gltfJson.scene != null ? gltfJson.scene : 0;
                const sceneRoot = await ParseSceneNode.parse(this._scene, scene, gltfJson);

                if (gltfJson.animations != null) {
                    const animations = await Promise.all(gltfJson.animations.map((item, index) => {
                        return ParseAnimationNode.parse(index, gltfJson);
                    }));
                    const comp = sceneRoot.addComponent(Animation);
                    animations.forEach(item => comp.addAnimationClip(item));
                }
                const prefab = new Prefab();
                prefab.root = sceneRoot;
                return prefab;
            });
    }

    // ------------------extensions
    static ExtensionDic: { [type: string]: IglTFExtension } = {};
    static regExtension(type: string, extension: IglTFExtension) {
        this.ExtensionDic[type] = extension;
    }

    getExtensionData(node: IProperty, extendName: string): Promise<any> {
        if (node.extensions == null) return null;
        const extension = LoadGlTF.ExtensionDic[extendName];
        if (extension == null) return null;
        const info = node.extensions[extendName];
        if (info == null) return null;
        return extension.load(info, this);
    }

    // ------------------------------------load bundle asset
    private loadAsync(url: string): Promise<IGltfJson> {
        if (url.endsWith(".gltf")) {
            return loadJson(url).then(json => {
                const gltfJson = json as any;
                gltfJson.cache = new GltfNodeCache();
                gltfJson.rootURL = getAssetDirectory(url);
                return gltfJson;
            });
        } else {
            return this.loadGltfBin(url)
                .then((value: { json: any; chunkBin: Uint8Array[] }) => {
                    const gltfJson = value.json as IGltfJson;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetDirectory(url);

                    for (let i = 0; i < value.chunkBin.length; i++) {
                        gltfJson.cache.bufferNodeCache[i] = Promise.resolve(value.chunkBin[i]);
                    }
                    return gltfJson;
                });
        }
    }

    private async loadGltfBin(url: string): Promise<{ json: JSON; chunkBin: Uint8Array[] }> {
        return loadArrayBuffer(url).then(bin => {
            const Binary = {
                Magic: 0x46546c67
            };
            const bReader = new BinReader(bin);
            const magic = bReader.readUint32();
            if (magic !== Binary.Magic) {
                throw new Error("Unexpected magic: " + magic);
            }
            const version = bReader.readUint32();
            if (version != 2) {
                throw new Error("Unsupported version:" + version);
            }
            const length = bReader.readUint32();
            if (length !== bReader.getLength()) {
                throw new Error(
                    "Length in header does not match actual data length: " + length + " != " + bReader.getLength()
                );
            }

            const ChunkFormat = {
                JSON: 0x4e4f534a,
                BIN: 0x004e4942
            };
            // JSON chunk
            const chunkLength = bReader.readUint32();
            const chunkFormat = bReader.readUint32();
            if (chunkFormat !== ChunkFormat.JSON) {
                throw new Error("First chunk format is not JSON");
            }
            const _json = JSON.parse(bReader.readUint8ArrToString(chunkLength));
            const _chunkBin: Uint8Array[] = [];
            while (bReader.canRead() > 0) {
                const chunkLength = bReader.readUint32();
                const chunkFormat = bReader.readUint32();
                switch (chunkFormat) {
                    case ChunkFormat.JSON:
                        throw new Error("Unexpected JSON chunk");
                    case ChunkFormat.BIN:
                        _chunkBin.push(bReader.readUint8Array(chunkLength));
                        break;
                    default:
                        // ignore unrecognized chunkFormat
                        bReader.skipBytes(chunkLength);
                        break;
                }
            }
            return { json: _json, chunkBin: _chunkBin };
        });
    }
}
