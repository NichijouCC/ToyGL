import { IndicesArray } from "../webgl/engine";
import { GlConstants } from "../render/GlConstant";
import { GeometryAttribute } from "./GeometryAttribute";

export class Geometry {
    atts: {
        [keyName: string]: GeometryAttribute;
    };
    indices?: IndicesArray;
    vaoDic: {
        [programeId: number]: WebGLVertexArrayObject;
    };
    // vao?: WebGLVertexArrayObject;
    primitiveType: number;
    constructor(option: IgeometryOptions) {
        this.atts = option.atts;
        this.indices = option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
    }
}
export interface IgeometryOptions {
    atts?: {
        [keyName: string]: GeometryAttribute;
    };
    indices?: IndicesArray;
    primitiveType?: number;
}
