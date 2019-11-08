import { IndicesArray } from "../webgl/engine";
import { GlConstants } from "../render/GlConstant";
import { GeometryAttribute } from "./GeometryAttribute";
import { BoundingSphere } from "../scene/bounds";
import { FrameState } from "./FrameState";
import { VertexArray } from "../webgl/vertextArray";

export class Geometry {
    atts: { [keyName: string]: GeometryAttribute };
    indices?: IndicesArray;
    // vao?: WebGLVertexArrayObject;
    primitiveType: number;
    boundingSphere: BoundingSphere;
    constructor(option: IgeometryOptions) {
        this.atts = option.atts;
        this.indices = option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }
}
export interface IgeometryOptions {
    atts?: { [keyName: string]: GeometryAttribute };
    indices?: IndicesArray;
    primitiveType?: number;
    boundingSphere?: BoundingSphere;
}
