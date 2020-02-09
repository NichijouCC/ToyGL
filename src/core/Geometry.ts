import { GeometryAttribute, IgeometryAttributeOptions } from "./GeometryAttribute";
import { IndicesArray } from "../webgl/IndexBuffer";
import { BoundingSphere } from "../scene/Bounds";
import { GlConstants } from "../webgl/GLconstant";
import { VertexArray } from "../webgl/VertextArray";
import { VertexAttEnum } from "../webgl/VertexAttEnum";
import { IvertexAttributeOption } from "../webgl/VertexAttribute";
import { PrimitiveTypeEnum } from "./PrimitiveTypeEnum";

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
export class Geometry
{
    attributes: { [keyName: string]: GeometryAttribute };
    indices?: IndicesArray;
    // vao?: WebGLVertexArrayObject;
    primitiveType: PrimitiveTypeEnum;
    boundingSphere: BoundingSphere;
    vertexArray: VertexArray;
    beDynamic: boolean;
    constructor(option: IgeometryOptions)
    {
        // this.attributes = option.attributes;
        for (let key in option.attributes)
        {
            this.setAttribute(key as any, option.attributes[key]);
        }
        this.indices = option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }
    vertexCount: number;
    setAttribute(attributeType: VertexAttEnum, options: IgeometryAttributeOptions, upload = false)
    {
        let geAtt = new GeometryAttribute({ ...options, type: attributeType });
        this.attributes[attributeType] = geAtt;
        if (attributeType === VertexAttEnum.POSITION)
        {
            this.vertexCount = geAtt.values.length / geAtt.componentsPerAttribute;
        }
    }
}

function mapGeometryAttToVertexAtt()
{

}
export interface IgeometryOptions
{
    attributes?: { [keyName: string]: IgeometryAttributeOptions };
    indices?: IndicesArray;
    primitiveType?: number;
    boundingSphere?: BoundingSphere;
    count?: number;
    offset?: number;
}
