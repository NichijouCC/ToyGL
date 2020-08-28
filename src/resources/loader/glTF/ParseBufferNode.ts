import { loadArrayBuffer } from "../../../io/Loadtool";
import { IgltfJson } from "../LoadglTF";

export class ParseBufferNode {
    static parse(index: number, gltf: IgltfJson): Promise<ArrayBuffer> {
        if (gltf.cache.bufferNodeCache[index]) {
            return gltf.cache.bufferNodeCache[index];
        } else {
            const bufferNode = gltf.buffers[index];
            const url = gltf.rootURL + "/" + bufferNode.uri;
            const task = loadArrayBuffer(url).then(buffer => {
                return buffer;
            });
            gltf.cache.bufferNodeCache[index] = task;
            return task;
        }
    }
}
