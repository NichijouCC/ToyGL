import { GlConstants } from "../render/GlConstant";
import { GeometryAttribute } from "./GeometryAttribute";
import { BoundingSphere } from "../scene/bounds";
import { IndicesArray } from "../webgl/IndexBuffer";
/**
 * 
 * @example useage
 * ```
 * var geometry = new Geometry({
 *   attributes : {
 *     position : new GeometryAttribute({
 *       componentDatatype : ComponentDatatype.FLOAT,
 *       componentsPerAttribute : 3,
 *       values : new Float32Array([
 *         0.0, 0.0, 0.0,
 *         7500000.0, 0.0, 0.0,
 *         0.0, 7500000.0, 0.0
 *       ])
 *     })
 *   },
 *   primitiveType : PrimitiveType.LINE_LOOP
 * });
 * ```
 */
export class Geometry {
    attributes: { [keyName: string]: GeometryAttribute };
    indices?: IndicesArray;
    // vao?: WebGLVertexArrayObject;
    primitiveType: number;
    boundingSphere: BoundingSphere;
    constructor(option: IgeometryOptions) {
        this.attributes = option.attributes;
        this.indices = option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }
}
export interface IgeometryOptions {
    attributes?: { [keyName: string]: GeometryAttribute };
    indices?: IndicesArray;
    primitiveType?: number;
    boundingSphere?: BoundingSphere;
}
