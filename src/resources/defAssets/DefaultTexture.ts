import { MemoryTexture } from "../../scene/asset/MemoryTexture";

namespace Private
{
    export let white: MemoryTexture = new MemoryTexture({
        width: 1,
        height: 1,
        arrayBufferView: new Uint8Array([255, 255, 255, 255])
    });
    export let black: MemoryTexture = new MemoryTexture({
        width: 1,
        height: 1,
        arrayBufferView: new Uint8Array([0, 0, 0, 255])
    });
    export let grid = new MemoryTexture({
        width: 256,
        height: 256,
        arrayBufferView: getGridTexData(256, 256),
    });

    function getGridTexData(width: number, height: number)
    {
        let data = new Uint8Array(width * width * 4);
        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                let seek = (y * width + x) * 4;

                if ((x - width * 0.5) * (y - height * 0.5) > 0)
                {
                    data[seek] = 0;
                    data[seek + 1] = 0;
                    data[seek + 2] = 0;
                    data[seek + 3] = 255;
                } else
                {
                    data[seek] = 255;
                    data[seek + 1] = 255;
                    data[seek + 2] = 255;
                    data[seek + 3] = 255;
                }
            }
        }
        return data;
    }
}


export class DefaultTexture
{
    get white() { return Private.white };
    get black() { return Private.black };
    get grid() { return Private.grid };
}

export function arraybufferToimage(arrayBufferView: Uint8Array, mimeType: string = "image/jpeg"): Promise<HTMLImageElement>
{
    return new Promise<HTMLImageElement>((resolve, reject) =>
    {
        var blob = new Blob([arrayBufferView], { type: mimeType });
        var imageUrl = window.URL.createObjectURL(blob);
        let img: HTMLImageElement = new Image();
        img.src = imageUrl;
        img.onerror = error =>
        {
            reject(error);
        };
        img.onload = () =>
        {
            URL.revokeObjectURL(img.src);
            resolve(img);
        };
    })
}