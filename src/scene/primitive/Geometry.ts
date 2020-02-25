import { GeometryAttribute, IgeometryAttributeOptions } from "./GeometryAttribute";
import { IndicesArray, IndexBuffer } from "../../webgl/IndexBuffer";
import { BoundingSphere, BoundingBox } from "../Bounds";
import { GlConstants } from "../../webgl/GLconstant";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { PrimitiveTypeEnum } from "../../core/PrimitiveTypeEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { BufferUsageEnum } from "../../webgl/Buffer";
import { IvertexAttributeOption } from "../../webgl/VertexAttribute";
import { VertexBuffer } from "../../webgl/VertexBuffer";
import { VertexArray } from "../../webgl/VertextArray";
import { BaseGeometryAsset } from "../asset/BassGeoemtryAsset";
import { TypedArray } from "../../core/TypedArray";

/**
 * 
 * @example useage
 * ```
 * var geometry = new Geometry({
 *   attributes : [
 * ]{
 *    {
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
export class Geometry extends BaseGeometryAsset
{
    attributes: { [keyName: string]: GeometryAttribute } = {};
    indices?: IndicesArray;
    primitiveType: PrimitiveTypeEnum;
    boundingSphere: BoundingSphere;
    constructor(option: IgeometryOptions)
    {
        super();
        // this.attributes = option.attributes;
        option.attributes.forEach(item =>
        {
            this.setAttribute(item.type, item);
        })
        this.indices = option.indices instanceof Array ? new Uint16Array(option.indices) : option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }

    private _vertexCount: number;
    get vertexCount() { return this._vertexCount };

    private beDirty = false;
    private dirtyAtt: { [name: string]: GeometryAttribute } = {};
    setAttribute(attributeType: VertexAttEnum, options: IgeometryAttributeOptions)
    {
        let geAtt = new GeometryAttribute({ ...options, type: attributeType });
        this.attributes[attributeType] = geAtt;
        if (attributeType === VertexAttEnum.POSITION)
        {
            this._vertexCount = geAtt.values.length / geAtt.componentsPerAttribute;
        }
        if (this._vertexArray != null)
        {
            this.beDirty = true;
            this.dirtyAtt[attributeType] = geAtt;
        }
    }

    updateAttributeData(attributeType: VertexAttEnum, data: TypedArray)
    {
        this.beDirty = true;
        this.attributes[attributeType].values = data;
        this.dirtyAtt[attributeType] = this.attributes[attributeType];
    }

    bind(device: GraphicsDevice)
    {
        if (this._vertexArray == null)
        {
            this._vertexArray = Geometry.createVertexArray(device, this);
            this.beDirty = false;
            this.dirtyAtt = {};
        }
        if (this.beDirty)
        {
            for (let key in this.dirtyAtt)
            {
                if (this._vertexArray.hasAttribute(key))
                {
                    this._vertexArray.updateVertexBuffer(key, this.dirtyAtt[key].values);
                } else
                {
                    let geAtt = this.dirtyAtt[key];
                    let att: IvertexAttributeOption = {
                        type: geAtt.type,
                        componentDatatype: geAtt.componentDatatype,
                        componentsPerAttribute: geAtt.componentsPerAttribute,
                        normalize: geAtt.normalize,
                    };
                    att.vertexBuffer = new VertexBuffer({
                        context: device,
                        usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                        typedArray: geAtt.values
                    });
                    this._vertexArray.update(att);
                }
            }
        }
        super.bind(device);
    }

    get bounding()
    {
        if (this._aabb == null)
        {
            this._aabb = BoundingSphere.fromTypedArray(this.attributes[VertexAttEnum.POSITION]?.values);
        }
        return this._aabb;
    }

    static createVertexArray(context: GraphicsDevice, geometry: Geometry)
    {
        let geAtts = geometry.attributes;
        let vertexAtts = Object.keys(geAtts).map(attName =>
        {
            let geAtt = geAtts[attName] as GeometryAttribute;
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
                    usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
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
    attributes?: IgeometryAttributeOptions[];
    indices?: IndicesArray | Array<number>;
    primitiveType?: number;
    boundingSphere?: BoundingSphere;
    count?: number;
    offset?: number;
}
