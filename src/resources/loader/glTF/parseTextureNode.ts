import { loadImg } from "../../../io/loadTool";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { IGltfJson } from "../loadGltf";
import { Texture2D } from "../../../scene/asset/texture/texture2d";
import { retryFn } from "@mtgoo/ctool";

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
                            const samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }
                        const texture: Texture2D = new Texture2D({ image: img });
                        return texture;
                    })
                    .catch(err => {
                        console.error("ParseTextureNode->img error", err);
                        return Promise.reject(err);
                    })
                gltf.cache.textureNodeCache[index] = task;
                return task;
            } else {
                const task = ParseBufferViewNode.parse(imageNode.bufferView, gltf)
                    .then(viewnode => {
                        const texOp = {} as any; // todo
                        if (node.sampler != null) {
                            const samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }

                        return new Promise<HTMLImageElement>((resolve, reject) => {
                            var blob = new Blob([viewnode.viewBuffer], { type: imageNode.mimeType });
                            var imageUrl = window.URL.createObjectURL(blob);
                            const img: HTMLImageElement = new Image();
                            img.crossOrigin = "";
                            img.src = imageUrl;
                            img.onerror = error => {
                                reject(error);
                            };
                            img.onload = () => {
                                URL.revokeObjectURL(img.src);
                                resolve(img);
                            };
                        }).then((img) => {
                            const texture = new Texture2D({ image: img });
                            return texture;
                        });
                    })
                    .catch(err => {
                        console.error("ParseTextureNode->bufferView error", err);
                        return Promise.reject(err);
                    })
                gltf.cache.textureNodeCache[index] = task;
                return task;
            }
            // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
        }
    }
}
