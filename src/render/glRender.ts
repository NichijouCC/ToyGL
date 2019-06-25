import {
    IgeometryInfo,
    IprogramInfo,
    IcontextOptions,
    IgeometryOptions,
    IprogramOptions,
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
} from "twebgl";
import { RenderLayerEnum } from "../ec/ec";
import { AutoUniform } from "./autoUniform";
export { IprogramInfo, IgeometryInfo };

export interface IshaderOptions extends IprogramOptions {
    layer: RenderLayerEnum;
}

export interface IshaderInfo extends IprogramInfo {
    layer: RenderLayerEnum;
}

export class GlRender {
    private static context: WebGLRenderingContext;
    static autoUniform: AutoUniform;
    static init(canvas: HTMLCanvasElement, options: IcontextOptions = null) {
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

    static createPrograme(op: IshaderOptions): IshaderInfo {
        let info = createProgramInfo(this.context, op) as IshaderInfo;
        info.layer = op.layer || RenderLayerEnum.Geometry;
        return info;
    }

    static createTextureFromImg(img: TexImageSource): WebGLTexture {
        return createTextureFromImageSource(this.context, img);
    }

    static setGeometryAndProgram(geometry: IgeometryInfo, program: IprogramInfo) {
        setGeometryAndProgramWithCached(this.context, geometry, program);
    }

    static drawObject(
        geometry: IgeometryInfo,
        program: IprogramInfo,
        uniforms?: { [name: string]: any },
        instancecount?: number,
    ): void {
        // setProgram(this.context, program);
        setGeometryAndProgramWithCached(this.context, geometry, program);
        //set uniforms
        for (const key in program.uniformsDic) {
            let func = this.autoUniform && this.autoUniform.autoUniforms[key];
            let value = func ? func() : uniforms[key];
            program.uniformsDic[key].setter(value);
        }
        drawBufferInfo(this.context, geometry, instancecount);
    }
}
