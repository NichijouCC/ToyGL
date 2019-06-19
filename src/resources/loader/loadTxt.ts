import { IassetLoader, Iasset, IassetLoadInfo } from "../type";
import { getFileName } from "../base/helper";
import { TextAsset } from "../assets/textasset";
import { loadText } from "../../io/loadtool";
import { LoadEnum } from "../base/loadEnum";

export class LoadTxt implements IassetLoader {
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void,
    ): Iasset {
        let name = getFileName(url);
        let text = new TextAsset(name, url);
        loadText(url, info => {
            if (onProgress) {
                onProgress(info.loaded / info.total);
            }
        })
            .then(value => {
                text.content = value;
                if (onFinish) {
                    onFinish(text, { url: url, loadState: LoadEnum.Success });
                }
            })
            .catch(error => {
                let errorMsg = "ERROR:Load Txt/json Error!\n  Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
                if (onFinish) {
                    onFinish(text, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                }
            });
        return text;
    }
}
const _loadtxt: LoadTxt = new LoadTxt();
// AssetMgr.RegisterAssetLoader(".vs.glsl", () => _loadtxt);
// AssetMgr.RegisterAssetLoader(".fs.glsl", () => _loadtxt);
// AssetMgr.RegisterAssetLoader(".txt", () => _loadtxt);
