import { IGltf, IProperty } from "./gltfJsonStruct";
import { ParseSceneNode } from "./parseSceneNode";
import { ParseAnimationNode } from "./parseAnimationNode";
import { BinReader, Geometry, getAssetDirectory, GraphicBuffer, IAssetLoader, loadArrayBuffer, loadJson, Material, Prefab, Texture2D, World } from "../../index";
import { GltfAsset } from "./gltfAsset";

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
    load(url: string): Promise<GltfAsset> {
        if (url.endsWith(".gltf")) {
            return this.loadGltf(url)
        } else {
            return this.loadGlb(url)
        }
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

    loadGltf(url: string) {
        return loadJson(url)
            .then(json => {
                const gltfJson = json as any;
                gltfJson.cache = new GltfNodeCache();
                gltfJson.rootURL = getAssetDirectory(url);
                return gltfJson;
            })
            .then((data) => this.parseJson(data))
            .then(data => new GltfAsset(data))
    }

    loadGlb(url: string) {
        return loadArrayBuffer(url)
            .then((bin) => this.loadGltfBin(bin))
            .then(data => new GltfAsset(data))
    }

    loadGltfBin(bin: ArrayBuffer) {
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
        _json.cache = new GltfNodeCache();
        for (let i = 0; i < _chunkBin.length; i++) {
            _json.cache.bufferNodeCache[i] = Promise.resolve(_chunkBin[i]);
        }
        return this.parseJson(_json);
    }

    private async parseJson(gltfJson: any) {
        const scene = gltfJson.scene != null ? gltfJson.scene : 0;
        const sceneRoot = await ParseSceneNode.parse(scene, gltfJson);
        if (gltfJson.animations != null) {
            const animations = await Promise.all(gltfJson.animations.map((item, index) => {
                return ParseAnimationNode.parse(index, gltfJson);
            }));
            sceneRoot.animations = animations;
        }
        return sceneRoot
    }
}
