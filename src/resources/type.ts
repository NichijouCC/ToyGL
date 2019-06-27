import { LoadEnum } from "./base/loadEnum";

export interface IassetLoadInfo {
    url: string;
    loadState: LoadEnum;
    err?: Error;
    //value: Iasset | null = null;
    // progress: DownloadInfo;
}

export interface Iasset {
    //
    readonly name: string;
    readonly beDefaultAsset: boolean; //是否为系统默认资源
    readonly type: string;
    readonly URL: string | null;
    // use():void;
    // unuse(disposeNow?: boolean):void;
    dispose(): void;

    // onLoadEnd: () => void;
    // onLoadEnd:(asset:Iasset)=>void;
    //caclByteLength(): number;
}
export interface IassetConstructor {
    new (name: string | null, url: string | null): Iasset;
}

export interface IassetLoader {
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void,
    ): Iasset;
}

// export interface IassetMgr {
//     load(
//         url: string,
//         onFinish: (asset: Iasset, loadInfo?: IassetLoadInfo) => void,
//         onProgress: (progress: number) => void,
//     ): Iasset;
//     loadAsync(url: string): Promise<Iasset>;
// }
