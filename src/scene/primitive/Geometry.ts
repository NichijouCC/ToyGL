import { GeometryAttribute, IgeometryAttributeOptions } from "./GeometryAttribute";
import { IndicesArray, IndexBuffer } from "../../webgl/IndexBuffer";
import { BoundingSphere } from "../Bounds";
import { GlConstants } from "../../webgl/GLconstant";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { PrimitiveTypeEnum } from "../../core/PrimitiveTypeEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { BufferUsageEnum } from "../../webgl/Buffer";
import { IvertexAttributeOption } from "../../webgl/VertexAttribute";
import { VertexBuffer } from "../../webgl/VertexBuffer";
import { VertexArray } from "../../webgl/VertextArray";

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
    // vertexArray: VertexArray;
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

    static createVertexArray(context: GraphicsDevice, geometry: Geometry)
    {
        let usage = geometry.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW;
        let geAtts = geometry.attributes;
        let vertexAtts = Object.keys(geAtts).map(attName =>
        {
            let geAtt = geAtts[attName];
            let att: IvertexAttributeOption = {
                type: geAtt.type,
                componentDatatype: geAtt.componentDatatype,
                componentsPerAttribute: geAtt.componentsPerAttribute,
                normalize: geAtt.normalize,
            };

            if (geAtt.values)
            {
                att.vertexBuffer = new VertexBuffer({
                    context: context,
                    usage: usage,
                    typedArray: geAtt.values
                });
            } else
            {
                att.value = geAtt.value
            }
            return att;
        })

        let indexBuffer;
        if (geometry.indices)
        {
            indexBuffer = new IndexBuffer({
                context: context,
                usage: usage,
                typedArray: geometry.indices,
            })
        }
        return new VertexArray({
            context: context,
            vertexAttributes: vertexAtts,
            indexBuffer: indexBuffer
        });
    }
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
