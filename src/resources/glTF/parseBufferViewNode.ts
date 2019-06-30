import { ParseBufferNode } from "./parseBufferNode";
import { IgltfJson, IgltfBufferview } from "./loadglTF";

export class ParseBufferViewNode {
    static parse(index: number, gltf: IgltfJson): Promise<IgltfBufferview> {
        if (gltf.cache.bufferviewNodeCache[index]) {
            return gltf.cache.bufferviewNodeCache[index];
        } else {
            let bufferview = gltf.bufferViews[index];
            let bufferindex = bufferview.buffer;
            let task = ParseBufferNode.parse(bufferindex, gltf).then(buffer => {
                console.warn("@@@@@view index:", index);
                let viewbuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);
                let stride = bufferview.byteStride;
                return { buffer: viewbuffer, byteStride: stride };
            });
            gltf.cache.bufferviewNodeCache[index] = task;
            return task;
        }
    }
}
