export enum ResponseTypeEnum {
    text = "text",
    json = "json",
    blob = "blob",
    arraybuffer = "arraybuffer",
}

type requestType = keyof typeof ResponseTypeEnum;

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

export function LoadCss(cssUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.setAttribute("type", "text/css");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", cssUrl);
        head.appendChild(link);
        link.onload = () => {
            resolve();
        };
        link.onerror = e => {
            reject(e);
        };
    });
}

interface IDownloadInfo {
    loaded: number;
    total: number;
}

function httpRequest(
    url: string,
    type: requestType,
    onProgress?: (info: IDownloadInfo) => void
): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open("GET", url);
        req.responseType = type;
        req.onprogress = e => {
            onProgress?.({ loaded: e.loaded, total: e.total });
        };
        req.onerror = e => {
            reject(e);
        };
        req.ontimeout = () => {
            reject("请求超时");
        }
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    if (req.status == 404) {
                        reject(new Error("req 404 ：" + url));
                    }
                }
            }
        };
        req.send();
    });
}
export function loadJson(url: string, onProgress: (info: IDownloadInfo) => void = null): Promise<any> {
    return httpRequest(url, ResponseTypeEnum.json, onProgress);
}
export function loadText(url: string, onProgress: (info: IDownloadInfo) => void = null): Promise<string> {
    return httpRequest(url, ResponseTypeEnum.text, onProgress);
}
export function loadArrayBuffer(url: string, onProgress: (info: IDownloadInfo) => void = null): Promise<ArrayBuffer> {
    return httpRequest(url, ResponseTypeEnum.arraybuffer, onProgress);
}

export function loadBlob(url: string, onProgress: (info: IDownloadInfo) => void = null): Promise<Blob> {
    return httpRequest(url, ResponseTypeEnum.blob, onProgress);
}

export function loadImg(url: string, onProgress: (info: IDownloadInfo) => void = null): Promise<HTMLImageElement> {
    return loadArrayBuffer(url, onProgress)
        .then(res => loadImgFromArrayBuffer(res, url.endsWith("png") ? "image/png" : "image/jpeg"));
}

export function loadImgFromArrayBuffer(arrayBufferView: Uint8Array | ArrayBuffer, mimeType: string = "image/jpeg"): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        var blob = new Blob([arrayBufferView], { type: mimeType });
        var imageUrl = window.URL.createObjectURL(blob);
        const img: HTMLImageElement = new Image();
        img.src = imageUrl;
        img.onerror = error => {
            reject(error);
        };
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img);
        };
    });
}
