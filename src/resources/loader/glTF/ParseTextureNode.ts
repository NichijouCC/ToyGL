import { loadImg } from "../../../io/loadtool";
import { LoadTextureSample } from "../loadTexture";
import { ParseBufferViewNode } from "./ParseBufferViewNode";
import { IgltfJson } from "../LoadglTF";
import { Texture2D } from "../../../scene/asset/texture/Texture2d";
import { Primitive } from "../../../scene/primitive/Primitive";

export class ParseTextureNode
{
    static parse(index: number, gltf: IgltfJson): Promise<Texture2D | null>
    {
        if (gltf.cache.textrueNodeCache[index])
        {
            return gltf.cache.textrueNodeCache[index];
        } else
        {
            if (gltf.textures == null) return null;
            let node = gltf.textures[index];
            if (gltf.images == null) return null;
            let imageNode = gltf.images[node.source];

            if (imageNode.uri != null)
            {
                let imagUrl = gltf.rootURL + "/" + imageNode.uri;

                let task = loadImg(imagUrl).then(img =>
                {
                    let texOp = {} as any;
                    if (node.sampler != null)
                    {
                        let samplerinfo = gltf.samplers[node.sampler];
                        if (samplerinfo.wrapS != null)
                        {
                            texOp.wrapS = samplerinfo.wrapS;
                        }
                        if (samplerinfo.wrapT)
                        {
                            texOp.wrapT = samplerinfo.wrapT;
                        }
                        if (samplerinfo.magFilter)
                        {
                            texOp.filterMax = samplerinfo.magFilter;
                        }
                        if (samplerinfo.minFilter)
                        {
                            texOp.filterMin = samplerinfo.minFilter;
                        }
                    }
                    let texture: Texture2D = new Texture2D({ image: img });
                    return texture;
                });
                gltf.cache.textrueNodeCache[index] = task;
                return task;
            } else
            {

                let task = ParseBufferViewNode.parse(imageNode.bufferView, gltf)
                    .then(viewnode =>
                    {
                        let texOp = {} as any; //todo
                        if (node.sampler != null)
                        {
                            let samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null)
                            {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT)
                            {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter)
                            {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter)
                            {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }

                        return new Promise<HTMLImageElement>((resolve, reject) =>
                        {
                            var blob = new Blob([viewnode.viewBuffer], { type: imageNode.mimeType });
                            var imageUrl = window.URL.createObjectURL(blob);
                            let img: HTMLImageElement = new Image();
                            img.src = imageUrl;
                            img.onerror = error =>
                            {
                                reject(error);
                            };
                            img.onload = () =>
                            {
                                URL.revokeObjectURL(img.src);
                                resolve(img);
                            };
                        }).then((img) =>
                        {
                            let texture = new Texture2D({ image: img });
                            return texture;
                        })
                    });
                gltf.cache.textrueNodeCache[index] = task;
                return task;
            }
            // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
        }
    }
}
