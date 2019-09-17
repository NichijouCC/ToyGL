import { IassetLoader, IassetLoadInfo, Iasset } from "./type";
import { LoadEnum } from "./base/loadEnum";
import { IprogramInfo } from "../render/webglRender";
import { getAssetExtralName } from "./base/helper";
/**
 * 资源都继承web3dAsset 实现Iasset接口,有唯一ID
 *
 * assetmgr仅仅管理load进来的资源
 * load过的资源再次load不会造成重复加载
 * 所有的资源都是从资源管理器load（url）出来，其他接口全部封闭
 * 资源的来源有三种：new、load、内置资源
 * bundle包不会shared asset,bundle不会相互依赖。即如果多个bundle引用同一个asset,每个包都包含一份该资源.
 *
 *
 * 资源释放：
 * gameobject（new或instance的）通过dispose 销毁自己的内存，不销毁引用的asset
 * asset 可以通过dispose 销毁自己的内存。包释放(prefab/scene/gltfbundle)也属于asset的释放,包会释放自己依赖的asset。
 *
 */

export class AssetLoader {
    static RegisterAssetLoader(extral: string, factory: IassetLoader) {
        // this.ExtendNameDic[extral] = type;
        console.warn("loader type:", extral);
        this.RESLoadDic[extral] = factory;
    }
    //private static ExtendNameDic: { [name: string]: AssetExtralEnum } = {};
    private static RESLoadDic: { [ExtralName: string]: IassetLoader } = {};

    static getAssetLoader(url: string): IassetLoader {
        let extralType = getAssetExtralName(url);
        let factory = this.RESLoadDic[extralType];
        return factory;
    }
    // //-------------------资源加载拓展
    // static RegisterAssetExtensionLoader(extral: string, factory: () => IassetLoader) {
    //     this.RESExtensionLoadDic[extral] = factory;
    // }

    // private static RESExtensionLoadDic: { [ExtralName: string]: () => IassetLoader } = {};

    static async addLoader() {
        await import("./loader/loadTxt").then(mod => {
            this.RegisterAssetLoader(".txt", new mod.LoadTxt());
        });
        await import("./loader/loadShader").then(mod => {
            this.RegisterAssetLoader(".shader.json", new mod.LoadShader());
        });
        await import("./loader/loadTexture").then(mod => {
            this.RegisterAssetLoader(".png", new mod.LoadTextureSample());
            this.RegisterAssetLoader(".jpg", new mod.LoadTextureSample());
        });
        await import("./glTF/loadglTF").then(mod => {
            this.RegisterAssetLoader(".gltf", new mod.LoadGlTF());
        });
    }
}

export class Resource {
    //#endregion
    /**
     * 调用load方法就会塞到这里面来
     */
    private static loadMap: {
        [url: string]: { asset: Iasset | null; loadinfo: IassetLoadInfo | null };
    } = {};
    /**
     * load同一个资源监听回调
     */
    private static loadingUrl: { [url: string]: ((asset: Iasset | null, loadInfo?: IassetLoadInfo) => void)[] } = {}; //

    static getAssetLoadInfo(url: string): IassetLoadInfo | null {
        if (this.loadMap[url]) {
            return this.loadMap[url].loadinfo;
        } else {
            return null;
        }
    }

    /**
     * 加载资源
     * @param url 地址
     * @param onFinish  load回调]
     */
    static load(
        url: string,
        onFinish: ((asset: Iasset | null, loadInfo?: IassetLoadInfo) => void) | null = null,
        onProgress: (progress: number) => void = null,
    ): Iasset | null {
        if (this.loadMap[url]) {
            if (onFinish) {
                switch (this.loadMap[url].loadinfo.loadState) {
                    case LoadEnum.Success:
                    case LoadEnum.Failed:
                        onFinish(this.loadMap[url].asset, this.loadMap[url].loadinfo);
                        break;
                    case LoadEnum.Loading:
                        if (this.loadingUrl[url] == null) {
                            this.loadingUrl[url] = [];
                        }
                        this.loadingUrl[url].push(onFinish);
                        break;
                    default:
                    case LoadEnum.None:
                        console.error("load error 为啥出现这种情况！");
                        break;
                }
            }
            return this.loadMap[url].asset;
        } else {
            let factory: IassetLoader = AssetLoader.getAssetLoader(url);
            let _state: IassetLoadInfo = { url: url, loadState: LoadEnum.None };
            this.loadMap[url] = { asset: null, loadinfo: _state };

            if (factory == null) {
                let errorMsg =
                    "ERROR: load Asset error. INfo: not have Load Func to handle (" +
                    getAssetExtralName(url) +
                    ") type File.  load URL:" +
                    url;
                _state.err = new Error(errorMsg);
                console.error(errorMsg);
                if (onFinish) {
                    onFinish(null, _state);
                }
                return null;
            } else {
                let asset = factory.load(
                    url,
                    (asset, state) => {
                        //-------------------------------存进资源存储map
                        _state.loadState = state.loadState;
                        //---------------------回调事件
                        if (onFinish) {
                            onFinish(asset, state);
                        }
                        //------------------监听此资源loadfinish的事件
                        let arr = this.loadingUrl[url];
                        this.loadingUrl[url] = null;
                        delete this.loadingUrl[url]; //set loadingUrl null
                        if (arr) {
                            arr.forEach(func => {
                                func(asset, state);
                            });
                        }
                    },
                    onProgress,
                );
                _state.loadState = LoadEnum.Loading;
                this.loadMap[url].asset = asset;
                return asset;
            }
        }
    }

    static loadAsync(url: string): Promise<Iasset> {
        return new Promise((resolve, reject) => {
            this.load(url, (asset, loadInfo) => {
                if (loadInfo.loadState == LoadEnum.Success) {
                    resolve(asset);
                } else {
                    reject(new Error("Load Failed."));
                }
            });
        });
    }
}

//<<<<<<<--------1.  new出来的自己管理,如果进行管控,assetmgr必然持有该资源的引用。当用该资源的对象被释放,该对象对该资源的引用也就没了,但是assetmgr持有它的引用，资源也就是没被释放;
//释放对象的时候我们又不能对资源进行释放，不然其他对象使用该资源就会报错，对于new出的资源,没被使用就会被系统自动释放或者自己释放-------------------->>>>>>>>>
//<<<<<<<------- 2.  资源的name不作为asset的标识.不然造成一大堆麻烦。如果允许重名资源在assetmgr获取资源的需要通过bundlename /assetname才能正确获取资源,bundlename于asset来说不一定有;
//new asset的时候还要检查重名资源,允许还是不允许都是麻烦—--->>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<--------3.  资源本身的描述json，不会被作为资源被assetmgr管理起来-->>>
