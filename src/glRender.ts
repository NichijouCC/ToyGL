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
} from "twebgl";
export { IprogramInfo, IgeometryInfo };
export class GlRender {
    private context: WebGLRenderingContext;
    constructor(canvas: HTMLCanvasElement, options: IcontextOptions = null) {
        this.context = setUpWebgl(canvas, options);
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
    setState(): void {
        throw new Error("Method not implemented.");
    }

    createGeometry(op: IgeometryOptions): IgeometryInfo {
        let info = createGeometryInfo(this.context, op);
        return info;
    }

    createPrograme(op: IprogramOptions): IprogramInfo {
        let info = createProgramInfo(this.context, op);
        return info;
    }

    createTextureFromImg(img: TexImageSource): WebGLTexture {
        return createTextureFromImageSource(this.context, img);
    }

    setGeometryAndProgram(geometry: IgeometryInfo, program: IprogramInfo) {
        setGeometryAndProgramWithCached(this.context, geometry, program);
    }

    drawObject(geometry: IgeometryInfo, program: IprogramInfo, instancecount?: number): void {
        // setProgram(this.context, program);
        setGeometryAndProgramWithCached(this.context, geometry, program);
        drawBufferInfo(this.context, geometry, instancecount);
    }
}
