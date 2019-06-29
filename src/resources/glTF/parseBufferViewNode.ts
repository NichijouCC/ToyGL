import { ParseBufferNode } from "./parseBufferNode";
import { IgltfJson, IgltfBufferview } from "./loadglTF";

export class ParseBufferViewNode {
    static parse(index: number, gltf: IgltfJson): Promise<IgltfBufferview> {
        if (gltf.cache.bufferviewNodeCache[index]) {
            return Promise.resolve(gltf.cache.bufferviewNodeCache[index]);
        } else {
            let bufferview = gltf.bufferViews[index];
            let bufferindex = bufferview.buffer;
            return ParseBufferNode.parse(bufferindex, gltf).then(buffer => {
                let viewbuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);
                let stride = bufferview.byteStride;
                gltf.cache.bufferviewNodeCache[index] = { buffer: viewbuffer, byteStride: stride };
                return gltf.cache.bufferviewNodeCache[index];
            });
        }
    }
}
