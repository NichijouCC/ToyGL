import { ParseBufferNode } from "./parseBufferNode";
import { IGltfJson, IGltfBufferView } from "../loadGltf";

export class ParseBufferViewNode {
    static parse(index: number, gltf: IGltfJson): Promise<IGltfBufferView> {
        if (gltf.cache.bufferViewNodeCache[index]) {
            return gltf.cache.bufferViewNodeCache[index];
        } else {
            const bufferview = gltf.bufferViews[index];
            const bufferindex = bufferview.buffer;
            const task = ParseBufferNode.parse(bufferindex, gltf)
                .then(buffer => {
                    const viewbuffer = new Uint8Array(buffer.buffer, (bufferview.byteOffset ?? 0) + buffer.byteOffset, bufferview.byteLength);
                    return { viewBuffer: viewbuffer, byteStride: bufferview.byteStride, target: bufferview.target, __debuge: bufferview };
                })
                .catch(err => {
                    console.error("ParseBufferViewNode error", err);
                    return Promise.reject(err);
                })
            gltf.cache.bufferViewNodeCache[index] = task;
            return task;
        }
    }
}
