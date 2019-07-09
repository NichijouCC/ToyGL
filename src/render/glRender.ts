import {
    IgeometryInfo,
    IprogramInfo,
    IcontextOptions,
    IgeometryOptions,
    IprogramOptions,
    ItexImageDataOption,
    ItextureInfo,
    ItexViewDataOption,
    ItextureDesInfo,
    IattributeInfo,
    IvertexAttrib,
    IprogramState,
    IviewArr,
    IvertexIndex,
} from "twebgl/dist/types/type";

import {
    createProgramInfo,
    drawBufferInfo,
    setUpWebgl,
    createGeometryInfo,
    setGeometryAndProgramWithCached,
    setViewPortWithCached,
    createTextureFromImageSource,
    setClear,
    createTextureFromTypedArray,
    createGlBuffer,
    updateAttributeBufferInfo,
    createAttributeBufferInfo,
} from "twebgl";
import { AutoUniform } from "./autoUniform";
import { UniformTypeEnum } from "../resources/assets/shader";
import { VertexAttEnum } from "./vertexAttType";
export {
    IprogramInfo,
    IgeometryInfo,
    IgeometryOptions,
    IprogramOptions,
    ItextureInfo,
    ItexImageDataOption,
    ItexViewDataOption,
    IviewArr,
    ItextureDesInfo,
    IprogramState,
};

// export interface IshaderOptions extends IprogramOptions {
//     layer?: RenderLayerEnum;
// }

// export interface IshaderInfo extends IprogramInfo {
//     layer: RenderLayerEnum;
// }

export class GlRender {
    private static context: WebGLRenderingContext;
    private static canvas: HTMLCanvasElement;
    static autoUniform: AutoUniform;
    static init(canvas: HTMLCanvasElement, options: IcontextOptions = {}) {
        this.context = setUpWebgl(canvas, options);
        this.canvas = canvas;
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
            viewport[0] * this.canvas.width,
            viewport[1] * this.canvas.height,
            viewport[2] * this.canvas.width,
            viewport[3] * this.canvas.height,
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
        let attdic = info.atts;
        let newAttdic: { [name: string]: IvertexAttrib } = {};
        for (let key in attdic) {
            newAttdic[getAttTypeFromName(key)] = attdic[key];
        }
        info.atts = newAttdic;
        return info;
    }

    static updateGeometry(geometry: IgeometryInfo, att: VertexAttEnum, data: ArrayBufferView) {
        updateAttributeBufferInfo(this.context, geometry.atts[att], data);
    }

    static createProgram(op: IprogramOptions): IprogramInfo {
        op.states = op.states || {};
        let info = createProgramInfo(this.context, op);
        let attdic = info.bassProgram.attsDic;
        let newAttdic: { [name: string]: IattributeInfo } = {};
        for (let key in attdic) {
            newAttdic[getAttTypeFromName(key)] = attdic[key];
        }
        info.bassProgram.attsDic = newAttdic;
        // info.layer = op.layer || RenderLayerEnum.Geometry;
        return info;
    }

    static createTextureFromImg(img: TexImageSource, texop?: ItextureDesInfo): ItextureInfo {
        return createTextureFromImageSource(this.context, { ...texop, img: img });
    }
    static createTextureFromViewData(
        viewData: ArrayBufferView,
        width: number,
        height: number,
        texop?: ItextureDesInfo,
    ) {
        return createTextureFromTypedArray(this.context, {
            ...texop,
            viewData: viewData,
            width: width,
            height: height,
        });
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

    static createAttributeBufferInfo(attName: string, data: IviewArr) {
        return createAttributeBufferInfo(this.context, attName, data);
    }
}

export class GlBuffer {
    buffer: WebGLBuffer;
    viewData: ArrayBufferView;
    static fromViewData(target: number, data: ArrayBufferView): GlBuffer {
        let newBuferr = new GlBuffer();
        newBuferr.buffer = GlRender.createBuffer(target, data);
        newBuferr.viewData = data;
        return newBuferr;
    }
}

export class VertexAttribute implements IvertexAttrib {
    name: string;
    viewBuffer?: ArrayBufferView;

    count: number;
    glBuffer: WebGLBuffer;
    drawType: number;

    componentSize: number;
    componentDataType: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;

    static fromViewArr(type: VertexAttEnum, data: IviewArr) {
        let attinfo = GlRender.createAttributeBufferInfo(type, data);
        let att = Object.assign(new VertexAttribute(), attinfo);
        return att;
    }
}

export class VertexIndex implements IvertexIndex {
    name: string;
    viewBuffer?: ArrayBufferView;
    count: number;
    componentDataType: number;
    glBuffer: WebGLBuffer;
    drawType: number;
}

export class GlTextrue {
    private static _white: ItextureInfo;
    static get WHITE(): ItextureInfo {
        if (this._white == null) {
            this._white = GlRender.createTextureFromViewData(new Uint8Array([255, 255, 255, 255]), 1, 1);
        }
        return this._white;
    }
    private static _grid: ItextureInfo;
    static get GIRD(): ItextureInfo {
        if (this._grid == null) {
            let width = 256;
            let height = 256;
            let data = new Uint8Array(width * width * 4);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let seek = (y * width + x) * 4;

                    if ((x - width * 0.5) * (y - height * 0.5) > 0) {
                        data[seek] = 0;
                        data[seek + 1] = 0;
                        data[seek + 2] = 0;
                        data[seek + 3] = 255;
                    } else {
                        data[seek] = 255;
                        data[seek + 1] = 255;
                        data[seek + 2] = 255;
                        data[seek + 3] = 255;
                    }
                }
            }
            this._grid = GlRender.createTextureFromViewData(data, width, height);
        }
        return this._grid;
    }
}

export function getAttTypeFromName(attName: string): string {
    attName = attName.toLowerCase();
    if (attName.indexOf("pos") != -1) {
        return VertexAttEnum.POSITION;
    }
    if (attName.indexOf("uv") != -1 || attName.indexOf("coord") != -1) {
        if (attName.indexOf("1") != -1) {
            return VertexAttEnum.TEXCOORD_1;
        } else if (attName.indexOf("2") != -1) {
            return VertexAttEnum.TEXCOORD_1;
        } else {
            return VertexAttEnum.TEXCOORD_0;
        }
    }
    if (attName.indexOf("normal") != -1) {
        return VertexAttEnum.NORMAL;
    }
    if (attName.indexOf("tangent") != -1) {
        return VertexAttEnum.TANGENT;
    }
    if (attName.indexOf("color") != -1) {
        return VertexAttEnum.COLOR_0;
    }
    if (attName.indexOf("weight") != -1) {
        return VertexAttEnum.WEIGHTS_0;
    }
    if (attName.indexOf("index") != -1) {
        return VertexAttEnum.JOINTS_0;
    }
}
