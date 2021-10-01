import { loadArrayBuffer } from "../../io/loadTool";
import { IGltfJson } from "../loadGltf";

export class ParseBufferNode {
    static parse(index: number, gltf: IGltfJson): Promise<Uint8Array> {
        if (gltf.cache.bufferNodeCache[index]) {
            return gltf.cache.bufferNodeCache[index];
        } else {
            const bufferNode = gltf.buffers[index];
            const url = gltf.rootURL + "/" + bufferNode.uri;
            const task = loadArrayBuffer(url).then(buffer => {
                return new Uint8Array(buffer);
            });
            gltf.cache.bufferNodeCache[index] = task;
            return task;
        }
    }
}
