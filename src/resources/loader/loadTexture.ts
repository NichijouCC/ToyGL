import { IassetLoader, IassetLoadInfo, Iasset } from "../type";
import { getFileName } from "../util";
import { Texture } from "../assets/texture";
import { loadImg, loadText, loadJson } from "../../io/loadTool";
import { LoadEnum } from "../base/loadEnum";

export class LoadTextureSample implements IassetLoader {
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void
    ): Iasset {
        const name = getFileName(url);
        let texture: Texture = new Texture({ name: name, URL: url });
        loadImg(url)
            .then(img => {
                texture = Texture.fromImageSource(img, null, texture);

                if (onFinish) {
                    onFinish(texture, { url: url, loadState: LoadEnum.Success });
                }
            })
            .catch(err => {
                const errorMsg = "ERROR: Load Image Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
                if (onFinish) {
                    onFinish(texture, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                }
            });
        return texture;
    }
}

export interface ItextureDesJson {
    texture: string;
}
export class LoadTextureDes implements IassetLoader {
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void
    ): Iasset {
        const name = getFileName(url);
        let texture: Texture = new Texture({ name: name, URL: url });
        // -------------load image des
        loadJson(url)
            .then(desjson => {
                const imgName = (desjson as any).texture;
                const desname = getFileName(url);

                const imgurl = url.replace(desname, imgName);
                loadImg(imgurl)
                    .then(img => {
                        texture = Texture.fromImageSource(img, null, texture);

                        if (onFinish) {
                            onFinish(texture, { url: url, loadState: LoadEnum.Success });
                        }
                    })
                    .catch(err => {
                        const errorMsg =
                            "ERROR: Load Image Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
                        if (onFinish) {
                            onFinish(texture, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                        }
                    });
            })
            .catch(err => {
                const errorMsg = "ERROR: Load Image Des Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
            });
        return texture;
    }

    // private static parse(tex: Texture, image: HTMLImageElement, Desjson: any, keepOrigeData = true) {
    //     let texop = this.getFromDesJson(Desjson);
    //     texop.data = image;
    //     texop.width = image.width;
    //     texop.height = image.height;

    //     tex.samplerInfo = texop;

    //     tex.imageData = image;
    //     tex.applyToGLTarget();
    // }

    // static getFromDesJson(json: any): webGraph.TextureOption {
    //     let op = new webGraph.TextureOption();
    //     //---------------暂时先这样
    //     if (json.flip_y) {
    //         op.flip_y = json.flip_y;
    //     }
    //     if (json.filterMode) {
    //         switch (json.filterMode) {
    //             case "Bilinear":
    //             case "Trilinear":
    //                 op.max_filter = webGraph.TexFilterEnum.linear;
    //                 break;
    //             case "Point":
    //                 op.max_filter = webGraph.TexFilterEnum.nearest;
    //                 break;
    //         }
    //     }
    //     if (json.wrapMode) {
    //         switch (json.wrapMode) {
    //             case "Clamp":
    //                 op.wrap_s = webGraph.TexWrapEnum.clampToEdge;
    //                 op.wrap_t = webGraph.TexWrapEnum.clampToEdge;
    //                 break;
    //             case "Repeat":
    //                 op.wrap_s = webGraph.TexWrapEnum.repeat;
    //                 op.wrap_t = webGraph.TexWrapEnum.repeat;
    //                 break;
    //         }
    //     }
    //     if (json.premultiplyAlpha) {
    //         op.preMultiply_alpha = json.premultiplyAlpha;
    //     }
    //     if (json.flip_y) {
    //         op.flip_y = json.flip_y;
    //     }
    //     return op;
    // }
}
