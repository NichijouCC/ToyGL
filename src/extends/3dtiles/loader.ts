import { Asset, BinReader, IAssetLoader, IRenderable, mat4, vec3 } from "../../index";
import { GltfNode, LoadGlTF } from "../glTF/index";
import { Cesium3dTileset } from "./Cesium3dTileset";
import { Gltf1Loader } from "./gltf1";

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
    tasks: QueuedTask[] = [];
    private doingCount = 0;
    limitCount = 5;
    push<T = any>(task: () => Promise<T>, options?: { priority?: () => number, checkNeedCancel?: () => boolean, onCancel?: () => void }) {
        let newTask: QueuedTask = { task, ...options, } as any;
        newTask.cancel = () => this.tasks.splice(this.tasks.indexOf(newTask), 1);
        this.tasks.push(newTask);
        this.tasks.sort((a, b) => {

            if (a.priority && b.priority) {
                return a.priority() - b.priority()
            } else {
                if (a.priority == null) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
        this.checkQueue();
        return newTask;
    }
    private checkQueue() {
        if (this.doingCount < this.limitCount) {
            let task = this.tasks.shift();
            if (task != null) {
                if (task.checkNeedCancel == null || !task.checkNeedCancel()) {
                    this.doingCount++;
                    task.task().then(() => {
                        this.doingCount--;
                        this.checkQueue();
                    })
                } else {
                    task.onCancel?.();
                    this.checkQueue();
                }
            }
        }
    }
}

export class QueuedTask {
    task: () => Promise<any>;
    priority: () => number;
    cancel() { };
    checkNeedCancel?: () => boolean;
    onCancel?: () => void;
}

