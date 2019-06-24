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
import { RenderContext } from "./renderContext";
import { AutoUniform } from "./autoUniform";
export { IprogramInfo, IgeometryInfo };

export interface IshaderOptions extends IprogramOptions {
    layer: RenderLayerEnum;
}

export interface IshaderInfo extends IprogramInfo {
    layer: RenderLayerEnum;
}

export class GlRender {
    private context: WebGLRenderingContext;
    private autoUniform: AutoUniform;
    constructor(canvas: HTMLCanvasElement, autoUniform: AutoUniform, options: IcontextOptions = null) {
        this.context = setUpWebgl(canvas, options);
        this.autoUniform = autoUniform;
    }

    //---------------------capacities
    private _maxVertexAttribs: number;
    get maxVertexAttribs(): number {
        if (this._maxVertexAttribs == null) {
            this.context.getParameter(this.context.MAX_VERTEX_ATTRIBS);
        }
        return this._maxVertexAttribs;
    }

    private _maxTexturesImageUnits: number;
    get maxTexturesImageUnits(): number {
        if (this._maxTexturesImageUnits == null) {
            this.context.getParameter(this.context.MAX_TEXTURE_IMAGE_UNITS);
        }
        return this._maxTexturesImageUnits;
    }

    setViewPort(viewport: Float32Array): void {
        setViewPortWithCached(
            this.context,
            viewport[0] * this.context.drawingBufferWidth,
            viewport[1] * this.context.drawingBufferHeight,
            viewport[2] * this.context.drawingBufferWidth,
            viewport[3] * this.context.drawingBufferHeight,
        );
    }
    setClear(clearDepth: boolean, clearColor: Float32Array, clearStencil?: boolean) {
        setClear(this.context, clearDepth, clearColor, clearStencil);
    }

    setState(): void {
        throw new Error("Method not implemented.");
    }

    createGeometry(op: IgeometryOptions): IgeometryInfo {
        let info = createGeometryInfo(this.context, op);
        return info;
    }

    createPrograme(op: IshaderOptions): IshaderInfo {
        let info = createProgramInfo(this.context, op) as IshaderInfo;
        info.layer = op.layer || RenderLayerEnum.Geometry;
        return info;
    }

    createTextureFromImg(img: TexImageSource): WebGLTexture {
        return createTextureFromImageSource(this.context, img);
    }

    setGeometryAndProgram(geometry: IgeometryInfo, program: IprogramInfo) {
        setGeometryAndProgramWithCached(this.context, geometry, program);
    }

    drawObject(
        geometry: IgeometryInfo,
        program: IprogramInfo,
        uniforms?: { [name: string]: any },
        instancecount?: number,
    ): void {
        // setProgram(this.context, program);
        setGeometryAndProgramWithCached(this.context, geometry, program);
        //set uniforms
        for (const key in program.uniformsDic) {
            let func = this.autoUniform.AutoUniforms[key];
            let value = func ? func() : uniforms[key];
            program.uniformsDic[key].setter(value);
        }
        drawBufferInfo(this.context, geometry, instancecount);
    }
}
