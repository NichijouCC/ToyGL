/**
 * 通过url获取资源的名称(包含尾缀)
 */
export function getFileName(url: string): string {
    const filei = url.lastIndexOf("/");
    const file = url.substr(filei + 1);
    return file;
}

/**
 * 通过url获取资源的名称(无尾缀)
 */
export function getFileNameWithoutExtralName(url: string): string {
    const filei = url.lastIndexOf("/");
    const file = url.substr(filei + 1);

    const index = file.indexOf(".", 0);
    const name = file.substr(0, index);
    return name;
}
// static getAssetExtralType(url: string): AssetExtralEnum {
//     let index = url.lastIndexOf("/");
//     let filename = url.substr(index + 1);
//     index = filename.indexOf(".", 0);
//     let extname = filename.substr(index);
//     let type = this.ExtendNameDic[extname];
//     if (type == null) {
//         console.warn("Load Asset Failed.type:(" + type + ") not have loader yet");
//     }
//     return type;
// }

/**
 * 通过url获取资源的尾缀
 * @param url 
 */
export function getAssetExtralName(url: string): string {
    let index = url.lastIndexOf("/");
    const filename = url.substr(index + 1);
    index = filename.indexOf(".", 0);
    const extname = filename.substr(index);
    return extname;
}

/**
 * 通过url获取资源的路径
 * @param url 
 */
export function getAssetDirectory(url: string): string {
    const filei = url.lastIndexOf("/");
    const file = url.substr(0, filei);
    return file;
}