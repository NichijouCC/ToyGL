import { ParseBufferNode } from "./parseBufferNode";
import { IGltfJson, IGltfBufferView } from "../loadGltf";

export class ParseBufferViewNode {
    static parse(index: number, gltf: IGltfJson): Promise<IGltfBufferView> {
        if (gltf.cache.bufferViewNodeCache[index]) {
            return gltf.cache.bufferViewNodeCache[index];
        } else {
            const bufferView = gltf.bufferViews[index];
            const bufferIndex = bufferView.buffer;
            const task = ParseBufferNode.parse(bufferIndex, gltf)
                .then(buffer => {
                    const viewBuffer = new Uint8Array(buffer.buffer, (bufferView.byteOffset ?? 0) + buffer.byteOffset, bufferView.byteLength);
                    return { viewBuffer: viewBuffer, byteStride: bufferView.byteStride, target: bufferView.target };
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
