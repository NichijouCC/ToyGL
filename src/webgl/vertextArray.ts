import { Context } from "../core/context";
import { Geometry } from "../render_V2/Geometry";
import { VertexBuffer } from "./engine";

interface IvertexAttribute {
    index: number; // 0;
    enabled: boolean; // true;
    vertexBuffer: any; // positionBuffer;
    componentsPerAttribute: number; // 3;
    componentDatatype: number; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}

export class VertexArray {
    private context: Context;
    private attributes: VertexBuffer[];
    private _vao: any;
    constructor(options: { context: Context; attributes: IvertexAttribute[] }) {
        this.context = options.context;
        this.attributes = this.attributes;
    }
}
