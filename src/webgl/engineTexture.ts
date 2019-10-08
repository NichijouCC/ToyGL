import { NearestPOT, filterFallback, isPowerOf2 } from "./tool";
//tip:TEXTURE_MAG_FILTER 固定为LINEAR https://community.khronos.org/t/bilinear-and-trilinear-cant-see-a-difference/39405

export class EngineTexture implements ItextureInfo {
    texture: WebGLTexture;
    texDes: ItexImageDataOption | ItexViewDataOption;
    private _gl: WebGLRenderingContext;
    static createTextureFromTypedArray(
        gl: WebGLRenderingContext,
        texOP: ItexViewDataOption,
        webGLVersion: number,
    ): EngineTexture {
        // deduceTextureTypedArrayOption(gl, data, texOP);
        let tex = gl.createTexture();
        let texDes = checkTextureOption(texOP, gl, webGLVersion);

        gl.bindTexture(texDes.target, tex);
        gl.texParameteri(texDes.target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(texDes.target, gl.TEXTURE_MIN_FILTER, texDes.filterModel);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_S, texDes.wrapS);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_T, texDes.wrapT);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texDes.flipY);

        if (texOP.mipmaps) {
            for (let i = 0; i < texOP.mipmaps.length; i++) {
                let levelData = texOP.mipmaps[i];
                gl.texImage2D(
                    texDes.target,
                    i,
                    texDes.pixelFormat,
                    levelData.width,
                    levelData.height,
                    0,
                    texDes.pixelFormat,
                    texDes.pixelDatatype,
                    levelData.viewData,
                );
            }
        } else {
            gl.texImage2D(
                texDes.target,
                0,
                texDes.pixelFormat,
                texOP.width,
                texOP.height,
                0,
                texDes.pixelFormat,
                texDes.pixelDatatype,
                texOP.viewData,
            );
            if (texDes.enableMipMap) {
                gl.generateMipmap(texDes.target);
            }
        }
        let etex = new EngineTexture();
        etex.texture = tex;
        etex.texDes = texDes;
        Reflect.set(etex, "_gl", gl);
        return etex;
    }

    static createTextureFromImageSource(
        gl: WebGLRenderingContext,
        texOP: ItexImageDataOption,
        webGLVersion: number,
    ): EngineTexture {
        let tex = gl.createTexture();
        texOP.width = texOP.img.width;
        texOP.height = texOP.img.height;

        let texDes = checkTextureOption(texOP, gl, webGLVersion);

        gl.bindTexture(texDes.target, tex);
        gl.texParameteri(texDes.target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(texDes.target, gl.TEXTURE_MIN_FILTER, texDes.filterModel);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_S, texDes.wrapS);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_T, texDes.wrapT);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texDes.flipY);

        if (texOP.mipmaps != null) {
            for (let i = 0; i < texOP.mipmaps.length; i++) {
                let levelData = texOP.mipmaps[i];
                gl.texImage2D(
                    texDes.target,
                    i,
                    texDes.pixelFormat,
                    texDes.pixelFormat,
                    texDes.pixelDatatype,
                    levelData.img,
                );
            }
        } else {
            gl.texImage2D(texDes.target, 0, texDes.pixelFormat, texDes.pixelFormat, texDes.pixelDatatype, texOP.img);
            if (texDes.enableMipMap) {
                gl.generateMipmap(texDes.target);
            }
        }
        let etex = new EngineTexture();
        etex.texture = tex;
        etex.texDes = texDes;
        Reflect.set(etex, "_gl", gl);
        return etex;
    }

    updateTextureFiltereParameter(filterMin: number, filterMax: number) {
        if (!this.texture) return;
        if (this.texDes.enableMipMap) {
            // this.texDes.filterMax = filterMax || this._gl.LINEAR;
            this.texDes.filterModel = filterMin || this._gl.NEAREST_MIPMAP_LINEAR;
        } else {
            // this.texDes.filterMax = filterFallback(this._gl, filterMax);
            this.texDes.filterModel = filterFallback(this._gl, filterMin);

            if (filterMin != this._gl.NEAREST || filterMin != this._gl.LINEAR) {
                console.warn("texture mimap filter need Img size be power of 2 And enable mimap option!");
            }
        }
    }
}

function checkTextureOption(
    texOP: ItexImageDataOption | ItexViewDataOption,
    gl: WebGLRenderingContext,
    webGLVersion: number,
): ItexImageDataOption | ItexViewDataOption {
    let texdes = { ...texOP };

    texdes.target = (texOP && texOP.target) || gl.TEXTURE_2D;
    texdes.pixelFormat = (texOP && texOP.pixelFormat) || gl.RGBA;
    texdes.pixelDatatype = (texOP && texOP.pixelDatatype) || gl.UNSIGNED_BYTE;
    texdes.flipY = texOP && texOP.flipY != null ? texOP.flipY : true;
    texdes.enableMipMap = texOP && texOP.enableMipMap != null ? texOP.enableMipMap : true;

    if (webGLVersion != 2) {
        let bePower2 = isPowerOf2(texdes.width) && isPowerOf2(texdes.height);
        if (!bePower2) {
            if (texdes.enableMipMap || texdes.wrapS == gl.REPEAT || texdes.wrapT == gl.REPEAT) {
                texdes.width = NearestPOT(texdes.width);
                texdes.height = NearestPOT(texdes.height);
            }
        }
    }
    texdes.wrapS = (texOP && texOP.wrapS) || gl.REPEAT;
    texdes.wrapT = (texOP && texOP.wrapT) || gl.REPEAT;
    if (texdes.enableMipMap) {
        // texdes.filterMax = (texOP && texOP.filterMax) || gl.LINEAR;
        texdes.filterModel = (texOP && texOP.filterModel) || gl.NEAREST_MIPMAP_LINEAR;
    } else {
        // texdes.filterMax = texOP && texOP.filterMax ? filterFallback(gl, texOP.filterMax) : gl.LINEAR;
        texdes.filterModel = texOP && texOP.filterModel ? filterFallback(gl, texOP.filterModel) : gl.LINEAR;
    }
    return texdes;
}

export interface ItextureInfo {
    texture: WebGLTexture;
    texDes: ItexImageDataOption | ItexViewDataOption;
}

export interface ItextureDesInfo {
    target?: number;
    // ----------------texParameteri-------------
    // filterMax?: number;
    filterModel?: number;
    /**
     * 为了uv滚动
     */
    wrapS?: number;
    wrapT?: number;
    /**
     * default=true
     */
    flipY?: boolean;

    // -----------------------------
    pixelFormat?: number;

    enableMipMap?: boolean;

    width?: number;

    height?: number;
}

export interface ItexViewDataOption extends ItextureDesInfo {
    viewData: ArrayBufferView;
    /**
     * when data is A Uint8Array , pixelDatatype  can be gl.UNSIGNED_BYTE.
     *
     * when data is A Uint16Array , pixelDatatype  can be gl.UNSIGNED_SHORT_5_6_5, gl.UNSIGNED_SHORT_4_4_4_4, gl.UNSIGNED_SHORT_5_5_5_1, gl.UNSIGNED_SHORT or ext.HALF_FLOAT_OES.
     *
     * when data is A Uint32Array , pixelDatatype  can be is gl.UNSIGNED_INT or ext.UNSIGNED_INT_24_8_WEBGL.
     *
     * when data is A Float32Array , pixelDatatype  can be gl.FLOAT.
     */
    pixelDatatype?: number;

    width: number;

    height: number;

    mipmaps?: { width: number; height: number; viewData: ArrayBufferView }[];
}

export interface ItexImageDataOption extends ItextureDesInfo {
    img: TexImageSource;
    pixelDatatype?: number;
    width?: number;
    height?: number;
    mipmaps?: { img: TexImageSource }[];
}
