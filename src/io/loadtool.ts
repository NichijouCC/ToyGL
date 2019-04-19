export enum LoadStateEnum {
    Loading,
    Finish,
    Failed,
}

export enum ResponseTypeEnum {
    text = "text",
    json = "json",
    blob = "blob",
    arraybuffer = "arraybuffer",
}

/**
 * Load a script (identified by an url). When the url returns, the
 * content of this file is added into a new script element, attached to the DOM (body element)
 */
export function LoadScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptUrl;
        head.appendChild(script);
        script.onload = () => {
            resolve();
        };
        script.onerror = e => {
            reject(e);
        };
    });
}
interface IdownloadInfo {
    loaded: number;
    total: number;
}

function httpRequeset(
    url: string,
    type: ResponseTypeEnum,
    onProgress: (info: IdownloadInfo) => void = null,
): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.responseType = type;

        req.onprogress = e => {
            if (onProgress) {
                onProgress({ loaded: e.loaded, total: e.total });
            }
        };
        req.onerror = e => {
            reject(e);
        };
        req.send();

        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 404) {
                    reject(new Error("got a 404:" + url));
                    return;
                }
                resolve(req.response);
            }
        };
    });
}
export function loadJson(url: string, onProgress: (info: IdownloadInfo) => void = null): Promise<JSON> {
    return httpRequeset(url, ResponseTypeEnum.json, onProgress);
}
export function loadText(url: string, onProgress: (info: IdownloadInfo) => void = null): Promise<string> {
    return httpRequeset(url, ResponseTypeEnum.text, onProgress);
}
export function loadArrayBuffer(url: string, onProgress: (info: IdownloadInfo) => void = null): Promise<ArrayBuffer> {
    return httpRequeset(url, ResponseTypeEnum.arraybuffer, onProgress);
}

export function loadBlob(url: string, onProgress: (info: IdownloadInfo) => void = null): Promise<Blob> {
    return httpRequeset(url, ResponseTypeEnum.blob, onProgress);
}

export function loadImg(
    input: string | ArrayBuffer | Blob,
    onProgress: (info: IdownloadInfo) => void = null,
): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        let url: string;
        if (input instanceof ArrayBuffer) {
            url = URL.createObjectURL(new Blob([input]));
        } else if (input instanceof Blob) {
            url = URL.createObjectURL(input);
        } else {
            url = input;
        }
        let img = new Image();
        img.src = url;
        img.onerror = error => {
            reject(error);
        };
        img.onprogress = e => {
            if (onProgress) {
                onProgress({ loaded: e.loaded, total: e.total });
            }
        };
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img);
        };
    });
}
