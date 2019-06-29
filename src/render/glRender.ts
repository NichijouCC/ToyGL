import {
    IgeometryInfo,
    IprogramInfo,
    IcontextOptions,
    IgeometryOptions,
    IprogramOptions,
    ItexImageDataOption,
    ItextureInfo,
    ItexViewDataOption,
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
        defUniforms?: { [key: string]: { type: UniformTypeEnum; value: any } },
        instancecount?: number,
    ): void {
        // setProgram(this.context, program);
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
                uniformsDic[key].setter(defUniforms && defUniforms[key].value);
            }
        }
        drawBufferInfo(this.context, geometry, instancecount);
    }
}
