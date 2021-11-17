import { getAssetExtraName } from "./util";
import { Asset } from "./asset";

export interface IAssetLoader {
    load(url: string): Promise<Asset>
}

export class Resource {
    private extLoaderDic: { [extraName: string]: IAssetLoader } = {};
    private typeLoaderDic: { [type: string]: IAssetLoader } = {};

    registLoaderWithExt(ext: string, factory: IAssetLoader) {
        console.info(`regist new loader to handle asset that it's fileExtension is ${ext}`);
        this.extLoaderDic[ext] = factory;
    }
    registLoaderWithType(type: string, factory: IAssetLoader) {
        console.info(`regist new loader to handle asset that it's type is ${type}`,);
        this.typeLoaderDic[type] = factory;
    }

    /**
     * 调用load方法就会塞到这里面来
     */
    private loadMap: { [url: string]: { request: Promise<Asset>, tag?: string } } = {};

    /**
     * 加载资源
     * @param url 地址
     * @param onFinish  load回调]
     */
    load<T = Asset>(url: string, options?: { type?: string, cache?: boolean, tag?: string }): Promise<T> {
        if (this.loadMap[url]) {
            return this.loadMap[url] as any;
        } else {
            const extName = getAssetExtraName(url);
            let loader = this.extLoaderDic[extName];
            if (loader == null && options?.type != null) {
                loader = this.typeLoaderDic[options.type];
            }
            if (loader == null) {
                return Promise.reject(`failed to find loader,url: ${url} type: ${options?.type}`);
            } else {
                let request = loader.load(url);
                if (options?.cache) {
                    this.loadMap[url] = { request, tag: options.tag };
                }
                return request as any;
            }
        }
    }
    /**
     * 清除缓存
     * @param tag 资源标签
     */
    clearCache(tag?: string) {
        if (tag == null) {
            this.loadMap = {};
        } else {
            for (let key in this.loadMap) {
                if (this.loadMap[key].tag == tag) {
                    delete this.loadMap[key]
                }
            }
        }
    }
}
