import { ParseBufferViewNode } from "./parseBufferViewNode";
import { IGltfJson } from "./loadGltf";
import { loadImgFromArrayBuffer, loadImg, Texture2D } from "../../index";

export class ParseTextureNode {
    static parse(index: number, gltf: IGltfJson): Promise<Texture2D | null> {
        if (gltf.cache.textureNodeCache[index]) {
            return gltf.cache.textureNodeCache[index];
        } else {
            if (gltf.textures == null) return null;
            const node = gltf.textures[index];
            if (gltf.images == null) return null;
            const imageNode = gltf.images[node.source];

            if (imageNode.uri != null) {
                const imagUrl = gltf.rootURL + "/" + imageNode.uri;

                const task = loadImg(imagUrl)
                    .then(img => {
                        const texOp = {} as any;
                        if (node.sampler != null) {
                            const samplerInfo = gltf.samplers[node.sampler];
                            if (samplerInfo.wrapS != null) {
                                texOp.wrapS = samplerInfo.wrapS;
                            }
                            if (samplerInfo.wrapT) {
                                texOp.wrapT = samplerInfo.wrapT;
                            }
                            if (samplerInfo.magFilter) {
                                texOp.magFilter = samplerInfo.magFilter;
                            }
                            if (samplerInfo.minFilter) {
                                texOp.minFilter = samplerInfo.minFilter;
                            }
                        }
                        const texture: Texture2D = new Texture2D({ image: img, flipY: false });
                        return texture;
                    })
                    .catch(err => {
                        console.error("ParseTextureNode->img error", err);
                        return Promise.reject(err);
                    });
                gltf.cache.textureNodeCache[index] = task;
                return task;
            } else {
                const task = ParseBufferViewNode.parse(imageNode.bufferView, gltf)
                    .then(viewNode => {
                        const texOp = {} as any; // todo
                        if (node.sampler != null) {
                            const samplerInfo = gltf.samplers[node.sampler];
                            if (samplerInfo.wrapS != null) {
                                texOp.wrapS = samplerInfo.wrapS;
                            }
                            if (samplerInfo.wrapT) {
                                texOp.wrapT = samplerInfo.wrapT;
                            }
                            if (samplerInfo.magFilter) {
                                texOp.magFilter = samplerInfo.magFilter;
                            }
                            if (samplerInfo.minFilter) {
                                texOp.minFilter = samplerInfo.minFilter;
                            }
                        }
                        return loadImgFromArrayBuffer(viewNode.viewBuffer, imageNode.mimeType)
                            .then((img) => {
                                const texture = new Texture2D({ image: img, flipY: false });
                                return texture;
                            });
                    })
                    .catch(err => {
                        console.error("ParseTextureNode->bufferView error", err);
                        return Promise.reject(err);
                    });
                gltf.cache.textureNodeCache[index] = task;
                return task;
            }
            // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
        }
    }
}
