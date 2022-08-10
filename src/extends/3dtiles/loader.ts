import { Asset, BinReader, IAssetLoader, IRenderable, mat4, vec3 } from "../../index";
import { GltfNode, LoadGlTF } from "../glTF/index";
import { Gltf1Loader } from "./gltf1";
import { Tileset } from "./tileset";
import { ITileFrameState } from "./tilesetSystem";

export class Loader implements IAssetLoader {
    readonly gltfLoader = new Gltf1Loader();
    load(url: string): Promise<Cesium3dTileset> {
        return Cesium3dTileset.create(url, this)
    }
    private _gltf1Loader: Gltf1Loader;
    private get gltf1Loader() {
        if (this._gltf1Loader == null) this._gltf1Loader = new Gltf1Loader();
        return this._gltf1Loader;
    }

    private _gltf2Loader: LoadGlTF;
    private get gltf2Loader() {
        if (this._gltf2Loader == null) this._gltf2Loader = new LoadGlTF();
        return this._gltf2Loader;
    }
    queue = new QueueTask();
    loadGltfBin(bin: ArrayBuffer, offset = 0) {
        const bReader = new BinReader(bin, offset);
        const magic = bReader.readUint32();
        const version = bReader.readUint32();
        if (version == 1) {
            let node = this.gltf1Loader.loadGltfBin(bin, offset);
            return Promise.resolve(node)
        } else {
            return this.gltf2Loader.loadGltfBin(bin)
        }
    }
}

export class QueueTask {
    tasks: (() => Promise<any>)[] = [];
    private doingCount = 0;
    limitCount = 5;
    push<T = any>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.tasks.push(() => {
                return task().then(result => {
                    resolve(result);
                })
            });
            this.checkQueue();
        })
    }
    private checkQueue() {
        if (this.doingCount < this.limitCount) {
            let task = this.tasks.shift();
            if (task != null) {
                this.doingCount++;
                task().then(() => {
                    this.doingCount--;
                    this.checkQueue();
                })
            }
        }
    }
}


export class Cesium3dTileset extends Asset {
    private _data: Tileset;
    get data() { return this._data }
    get boundingVolume() { return this._data.boundingVolume }
    static create(url: string, loader: Loader) {
        let tileset = new Cesium3dTileset();
        return Tileset.create(url, loader)
            .then((res) => {
                tileset._data = res;
                return tileset;
            })
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    update(options: ITileFrameState) {
        this.data.update(options);
    }
}
