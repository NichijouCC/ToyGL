import { loadArrayBuffer } from "../../io/loadtool";
import { IgltfJson } from "./loadglTF";

export class ParseBufferNode {
    static parse(index: number, gltf: IgltfJson): Promise<ArrayBuffer> {
        if (gltf.cache.bufferNodeCache[index]) {
            return Promise.resolve(gltf.cache.bufferNodeCache[index]);
        } else {
            let bufferNode = gltf.buffers[index];
            return loadArrayBuffer(bufferNode.uri).then(buffer => {
                gltf.cache.bufferNodeCache[index] = buffer;
                return buffer;
            });
        }
    }
}
