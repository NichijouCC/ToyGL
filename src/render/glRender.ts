import {
    IgeometryInfo,
    IprogramInfo,
    IcontextOptions,
    IgeometryOptions,
    IprogramOptions,
    ItexImageDataOption,
    ItextureInfo,
    ItexViewDataOption,
    IarrayInfo,
} from "twebgl/dist/types/type";

import {
    createProgramInfo,
    drawBufferInfo,
    setUpWebgl,
    createGeometryInfo,
    setGeometry,
    setProgram,
    createVaoByPrograme,
    setGeometryAndProgramWithCached,
    setViewPortWithCached,
    createTextureFromImageSource,
    setProgramUniforms,
    setClear,
    createTextureFromTypedArray,
    createGlBuffer,
} from "twebgl";
import { RenderLayerEnum } from "../ec/ec";
import { AutoUniform } from "./autoUniform";
import { UniformTypeEnum } from "../resources/assets/shader";
export {
    IprogramInfo,
    IgeometryInfo,
    IgeometryOptions,
    IprogramOptions,
    ItextureInfo,
    ItexImageDataOption,
    ItexViewDataOption,
    IarrayInfo
};

// export interface IshaderOptions extends IprogramOptions {
//     layer?: RenderLayerEnum;
// }

// export interface IshaderInfo extends IprogramInfo {
//     layer: RenderLayerEnum;
// }

export class GlRender {
    private static context: WebGLRenderingContext;
    static autoUniform: AutoUniform;
    static init(canvas: HTMLCanvasElement, options: IcontextOptions = {}) {
        this.context = setUpWebgl(canvas, options);
    }

    //---------------------capacities
    private static _maxVertexAttribs: number;
    static get maxVertexAttribs(): number {
        if (this._maxVertexAttribs == null) {
            this.context.getParameter(this.context.MAX_VERTEX_ATTRIBS);
        }
        return this._maxVertexAttribs;
    }

    private static _maxTexturesImageUnits: number;
    static get maxTexturesImageUnits(): number {
        if (this._maxTexturesImageUnits == null) {
            this.context.getParameter(this.context.MAX_TEXTURE_IMAGE_UNITS);
        }
        return this._maxTexturesImageUnits;
    }

    static setViewPort(viewport: Float32Array): void {
        setViewPortWithCached(
            this.context,
            viewport[0] * this.context.drawingBufferWidth,
            viewport[1] * this.context.drawingBufferHeight,
            viewport[2] * this.context.drawingBufferWidth,
            viewport[3] * this.context.drawingBufferHeight,
        );
    }
    static setClear(clearDepth: boolean, clearColor: Float32Array, clearStencil?: boolean) {
        setClear(this.context, clearDepth, clearColor, clearStencil);
    }

    static setState(): void {
        throw new Error("Method not implemented.");
    }

    static createGeometry(op: IgeometryOptions): IgeometryInfo {
        let info = createGeometryInfo(this.context, op);
        return info;
    }

    static createProgram(op: IprogramOptions): IprogramInfo {
        let info = createProgramInfo(this.context, op);
        // info.layer = op.layer || RenderLayerEnum.Geometry;
        return info;
    }

    static createTextureFromImg(img: TexImageSource, texop?: ItexImageDataOption): ItextureInfo {
        return createTextureFromImageSource(this.context, img, texop);
    }
    static createTextureFromViewData(viewData: ArrayBufferView, texop: ItexViewDataOption) {
        return createTextureFromTypedArray(this.context, viewData, texop);
    }

    static setGeometryAndProgram(geometry: IgeometryInfo, program: IprogramInfo) {
        setGeometryAndProgramWithCached(this.context, geometry, program);
    }

    static drawObject(
        geometry: IgeometryInfo,
        program: IprogramInfo,
        uniforms?: { [name: string]: any },
        mapUniformDef?: { [key: string]: { type: UniformTypeEnum; value: any } },
        instancecount?: number,
    ): void {
        // setProgram(this.context, program);
        // setProgram(this.context,program);
        // setGeometry(this.context,geometry,program);
        setGeometryAndProgramWithCached(this.context, geometry, program);
        //set uniforms
        let uniformsDic = program.bassProgram.uniformsDic;
        for (const key in uniformsDic) {
            if (uniforms[key] != null) {
                uniformsDic[key].setter(uniforms[key]);
            } else if (this.autoUniform && this.autoUniform.autoUniforms[key]) {
                let value = this.autoUniform.autoUniforms[key]();
                uniformsDic[key].setter(value);
            } else {
                uniformsDic[key].setter(mapUniformDef && mapUniformDef[key].value);
            }
        }
        drawBufferInfo(this.context, geometry, instancecount);
    }

    static createBuffer(target: number, viewData: ArrayBufferView): WebGLBuffer {
        return createGlBuffer(this.context, target, viewData);
    }
}


export class GlTextrue{
    private static _white:ItextureInfo;
    static get WHITE():ItextureInfo
    {
        if(this._white==null)
        {
            this._white= GlRender.createTextureFromViewData(new Uint8Array([255,255,255,255]),{width:1,height:1});
        }
        return this._white;
    }
    private static _grid:ItextureInfo;
    static get GIRD():ItextureInfo
    {
        if(this._grid==null)
        {
            let width = 256;
            let height = 256;
            let data = new Uint8Array(width * width * 4);
            for (let y = 0; y < height; y++)
            {
                for (let x = 0; x < width; x++)
                {
                    let seek = (y * width + x) * 4;

                    if (((x - width * 0.5) * (y - height * 0.5)) > 0)
                    {
                        data[seek] = 0;
                        data[seek + 1] = 0;
                        data[seek + 2] = 0;
                        data[seek + 3] = 255;
                    }
                    else
                    {
                        data[seek] = 255;
                        data[seek + 1] = 0;
                        data[seek + 2] = 0;
                        data[seek + 3] = 255;
                    }
                }
            }
            this._grid= GlRender.createTextureFromViewData(data,{width:width,height:height});
        }
        return this._grid;
    }

}

