/**
 * 通过url获取资源的名称(包含尾缀)
 */
export function getFileName(url: string): string {
    const mark_index = url.lastIndexOf("/");
    const file = url.substr(mark_index + 1);
    return file;
}

/**
 * 通过url获取资源的名称(无尾缀)
 */
export function getFileNameWithoutExtraName(url: string): string {
    const mark_index = url.lastIndexOf("/");
    const file = url.substr(mark_index + 1);

    const index = file.indexOf(".", 0);
    const name = file.substr(0, index);
    return name;
}

/**
 * 通过url获取资源的尾缀
 * @param url 
 */
export function getAssetExtraName(url: string): string {
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
    const mark_index = url.lastIndexOf("/");
    const file = url.substr(0, mark_index);
    return file;
}
