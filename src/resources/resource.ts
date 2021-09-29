import { getAssetExtraName } from "./util";
import { Asset } from "../scene/asset/asset";

export interface IAssetLoader {
    load(url: string): Promise<Asset>
}

export class Resource {
    private resLoaderDic: { [extraName: string]: IAssetLoader } = {};
    registerAssetLoader(extra: string, factory: IAssetLoader) {
        console.warn("loader type:", extra);
        this.resLoaderDic[extra] = factory;
    }

    getAssetLoader(url: string): IAssetLoader {
        const extraType = getAssetExtraName(url);
        const factory = this.resLoaderDic[extraType];
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
    load<T = Asset>(url: string): Promise<T> {
        if (this.loadMap[url]) {
            return this.loadMap[url] as any;
        } else {
            const loader = this.getAssetLoader(url);
            if (loader == null) {
                const errorMsg = "ERROR: load Asset error. INfo: not have Load Func to handle (" + getAssetExtraName(url) + ") type File.  load URL:" + url;
                return Promise.reject(errorMsg);
            } else {
                this.loadMap[url] = loader.load(url);
                return this.loadMap[url] as any;
            }
        }
    }
}
