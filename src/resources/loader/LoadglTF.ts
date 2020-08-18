import { getFileName, getAssetDirectory } from "../Util";
import { loadText, loadJson, loadArrayBuffer } from "../../io/Loadtool";
import { BinReader } from "../../io/Stream";
import { Igltf, Iproperty } from "./glTF/GltfJsonStruct";
import { ParseSceneNode } from "./glTF/ParseSceneNode";
import { Material } from "../../scene/asset/material/Material";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { StaticMesh, SubMesh } from "../../scene/asset/geometry/StaticMesh";
import { IassetLoader } from "../Resource";
import { Prefab } from "../../scene/asset/Prefab";
import { Texture2D } from "../../scene/asset/texture/Texture2d";
import { VertexBuffer } from "../../webgl/VertexBuffer";
import { IndexBuffer } from "../../webgl/IndexBuffer";
import { ParseAnimationNode } from "./glTF/ParseAnimationNode";
import { Animation } from '../../components/Animation'

export interface IglTFExtension {
    load(extensionNode: any, loader: LoadGlTF): Promise<any>;
}

export interface IgltfPrimitive {
    mesh: SubMesh;
    material: Material;
}

export interface IgltfBufferview {
    viewBuffer: Uint8Array;
    byteStride?: number,
    target?: number
}
export class GltfNodeCache {
    meshNodeCache: { [index: number]: Promise<IgltfPrimitive[]> } = {};
    bufferviewNodeCache: { [index: number]: Promise<IgltfBufferview> } = {};
    bufferNodeCache: { [index: number]: Promise<ArrayBuffer> } = {};
    materialNodeCache: { [index: number]: Promise<Material> } = {};
    textrueNodeCache: { [index: number]: Promise<Texture2D> } = {};
    vertexBufferCache: { [index: number]: VertexBuffer } = {};
    indexBufferCache: { [index: number]: IndexBuffer } = {};

    // beContainAnimation: boolean = false;
    // skinNodeCache: { [index: number]: SkinNode } = {};
    // animationNodeCache: { [index: number]: AnimationClip } = {};
}

export interface IgltfJson extends Igltf {
    rootURL: string;
    cache: GltfNodeCache;
}
export class LoadGlTF implements IassetLoader {
    private context: GraphicsDevice;
    constructor(device: GraphicsDevice) {
        this.context = device;
    }
    load(url: string): Promise<Prefab> {
        return this.loadAsync(url)
            .then(async (gltfJson) => {
                let scene = gltfJson.scene != null ? gltfJson.scene : 0;
                let sceneRoot = await ParseSceneNode.parse(scene, gltfJson, this.context);

                if (gltfJson.animations != null) {
                    let animations = await Promise.all(gltfJson.animations.map((item, index) => {
                        return ParseAnimationNode.parse(index, gltfJson);
                    }));
                    let comp = sceneRoot.addComponent("Animation") as Animation;
                    animations.forEach(item => comp.addAnimationClip(item));
                }
                let rpefab = new Prefab();
                rpefab.root = sceneRoot;
                return rpefab;
            })
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
                gltfJson.rootURL = getAssetDirectory(url);
                return gltfJson;
            });
        } else {
            return this.loadglTFBin(url)
                .then((value: { json: any; chunkbin: Uint8Array[] }) => {
                    let gltfJson = value.json as IgltfJson;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetDirectory(url);

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
