//通过url获取资源的名称(包含尾缀)
export function getFileName(url: string): string {
    let filei = url.lastIndexOf("/");
    let file = url.substr(filei + 1);
    return file;
}
export function getFileNameWithoutExtralName(url: string): string {
    let filei = url.lastIndexOf("/");
    let file = url.substr(filei + 1);

    let index = file.indexOf(".", 0);
    let name = file.substr(0, index);
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
export function getAssetExtralName(url: string): string {
    let index = url.lastIndexOf("/");
    let filename = url.substr(index + 1);
    index = filename.indexOf(".", 0);
    let extname = filename.substr(index);
    return extname;
}

export function getAssetFlode(url: string): string {
    let filei = url.lastIndexOf("/");
    let file = url.substr(0, filei);
    return file;
}
