import { Texture } from "../assets/texture";
import { loadImg } from "../../io/loadtool";
import { LoadTextureSample } from "../loader/loadTexture";
import { WebglRender, ItexImageDataOption, ItexViewDataOption, ItextureDesInfo } from "../../render/webglRender";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { IgltfJson } from "./loadglTF";
import { TextureWrapMode } from "./gltfJsonStruct";

export class ParseTextureNode {
    static parse(index: number, gltf: IgltfJson): Promise<Texture | null> {
        if (gltf.cache.textrueNodeCache[index]) {
            return gltf.cache.textrueNodeCache[index];
        } else {
            if (gltf.textures == null) return null;
            let node = gltf.textures[index];
            if (gltf.images == null) return null;
            let imageNode = gltf.images[node.source];

            if (imageNode.uri != null) {
                let imagUrl = gltf.rootURL + "/" + imageNode.uri;
                let texture: Texture = new Texture({ name: name, URL: imagUrl });
                let task = loadImg(imagUrl).then(img => {
                    let texOp: ItextureDesInfo = {};
                    if (node.sampler != null) {
                        let samplerinfo = gltf.samplers[node.sampler];
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

                    let imaginfo = WebglRender.createTextureFromImg(img, texOp);
                    texture.texture = imaginfo.texture;
                    texture.texDes = imaginfo.texDes;

                    return texture;
                });
                gltf.cache.textrueNodeCache[index] = task;
                return task;
            } else {
                let texture: Texture = new Texture({ name: name });
                let task = ParseBufferViewNode.parse(imageNode.bufferView, gltf).then(viewnode => {
                    //    let bob=new Blob([viewnode.view], { type: imageNode.mimeType })
                    //    let url = URL.createObjectURL(bob);
                    //    asset= loader.loadDependAsset(url) as Texture;
                    let texOp: ItextureDesInfo = {}; //todo
                    if (node.sampler != null) {
                        let samplerinfo = gltf.samplers[node.sampler];
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
                    let imaginfo = WebglRender.createTextureFromViewData(viewnode.viewBuffer, 100, 100, texOp);
                    texture.texture = imaginfo.texture;
                    texture.texDes = imaginfo.texDes;

                    return texture;
                });
                gltf.cache.textrueNodeCache[index] = task;
                return task;
            }
            // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
        }
    }
}
