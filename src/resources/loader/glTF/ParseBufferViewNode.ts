import { ParseBufferNode } from "./ParseBufferNode";
import { IgltfJson, IgltfBufferview } from "../LoadglTF";
import { GlBuffer } from "../../../render/webglRender";
import { Buffer, BufferTargetEnum, BufferUsageEnum } from "../../../webgl/Buffer";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";

export class ParseBufferViewNode
{
    static parse(index: number, gltf: IgltfJson): Promise<IgltfBufferview>
    {
        if (gltf.cache.bufferviewNodeCache[index])
        {
            return gltf.cache.bufferviewNodeCache[index];
        } else
        {
            let bufferview = gltf.bufferViews[index];
            let bufferindex = bufferview.buffer;
            let task = ParseBufferNode.parse(bufferindex, gltf).then(buffer =>
            {
                let viewbuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);
                // let stride = bufferview.byteStride;
                // let glbuffer = bufferview.target && GlRender.createBuffer(bufferview.target, viewbuffer);
                // let glbuffer = bufferview.target && GlBuffer.fromViewData(bufferview.target, viewbuffer);
                return { viewBuffer: viewbuffer, byteStride: bufferview.byteStride, target: bufferview.target };
            });
            gltf.cache.bufferviewNodeCache[index] = task;
            return task;
        }
    }
}