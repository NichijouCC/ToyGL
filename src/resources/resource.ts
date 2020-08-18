import { getAssetExtralName } from "./Util";
import { Asset } from "../scene/asset/Asset";

export interface IassetLoader {
    load(url: string): Promise<Asset>
}

export class Resource {
    private resLoaderDic: { [ExtralName: string]: IassetLoader } = {};
    registerAssetLoader(extral: string, factory: IassetLoader) {
        console.warn("loader type:", extral);
        this.resLoaderDic[extral] = factory;
    }
    getAssetLoader(url: string): IassetLoader {
        let extralType = getAssetExtralName(url);
        let factory = this.resLoaderDic[extralType];
        return factory;
    }
    /**
     * 调用load方法就会塞到这里面来
     */
    private loadMap: { [url: string]: Promise<Asset> } = {};

    /**
     * 加载资源
     * @param url 地址
     * @param onFinish  load回调]
     */
    load(url: string): Promise<Asset> {
        if (this.loadMap[url]) {
            return this.loadMap[url]
        } else {
            let loader = this.getAssetLoader(url);
            if (loader == null) {
                let errorMsg = "ERROR: load Asset error. INfo: not have Load Func to handle (" + getAssetExtralName(url) + ") type File.  load URL:" + url;
                return Promise.reject(errorMsg);
            } else {
                this.loadMap[url] = loader.load(url);
                return this.loadMap[url];
            }
        }
    }
}