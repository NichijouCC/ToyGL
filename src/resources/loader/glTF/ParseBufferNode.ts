import { loadArrayBuffer } from "../../../io/Loadtool";
import { IgltfJson } from "../LoadglTF";

export class ParseBufferNode {
    static parse(index: number, gltf: IgltfJson): Promise<ArrayBuffer> {
        if (gltf.cache.bufferNodeCache[index]) {
            return gltf.cache.bufferNodeCache[index];
        } else {
            let bufferNode = gltf.buffers[index];
            let url = gltf.rootURL + "/" + bufferNode.uri;
            let task = loadArrayBuffer(url).then(buffer => {
                return buffer;
            });
            gltf.cache.bufferNodeCache[index] = task;
            return task;
        }
    }
}
