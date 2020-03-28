import { IndicesArray, IndexBuffer } from "../../../webgl/IndexBuffer";
import { GeometryAsset } from "./GeoemtryAsset";
import { GeometryAttribute, IgeometryAttributeOptions } from "./GeometryAttribute";
import { PrimitiveTypeEnum } from "../../../webgl/PrimitiveTypeEnum";
import { BoundingSphere } from "../../Bounds";
import { GlConstants } from "../../../webgl/GLconstant";
import { VertexAttEnum } from "../../../webgl/VertexAttEnum";
import { TypedArray } from "../../../core/TypedArray";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { VertexArray } from "../../../webgl/VertextArray";
import { IvertexAttributeOption } from "../../../webgl/VertexAttribute";
import { VertexBuffer } from "../../../webgl/VertexBuffer";
import { BufferUsageEnum } from "../../../webgl/Buffer";

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
export class Geometry extends GeometryAsset {
    attributes: { [keyName: string]: GeometryAttribute } = {};
    indices?: IndicesArray;
    primitiveType: PrimitiveTypeEnum;
    boundingSphere: BoundingSphere;
    constructor(option: IgeometryOptions) {
        super();
        // this.attributes = option.attributes;
        option.attributes.forEach(item => {
            this.addAttribute(item.type, item);
        })
        this.indices = option.indices instanceof Array ? new Uint16Array(option.indices) : option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }
    private _vertexCount: number;
    get vertexCount() { return this._vertexCount };
    get bounding() {
        if (this.boundingSphere == null) {
            this.boundingSphere = BoundingSphere.fromTypedArray(this.attributes[VertexAttEnum.POSITION]?.values);
        }
        return this.boundingSphere;
    }

    private dirtyAtt: { [name: string]: GeometryAttribute } = {};
    addAttribute(attributeType: VertexAttEnum, options: IgeometryAttributeOptions) {
        let geAtt = new GeometryAttribute({ ...options, type: attributeType });
        this.attributes[attributeType] = geAtt;
        if (attributeType === VertexAttEnum.POSITION) {
            this._vertexCount = geAtt.values.length / geAtt.componentsPerAttribute;
        }
        if (this.graphicAsset != null) {
            this.beNeedRefreshGraphicAsset = true;
            this.dirtyAtt[attributeType] = geAtt;
        }
    }

    updateAttributeData(attributeType: VertexAttEnum, data: TypedArray) {
        this.beNeedRefreshGraphicAsset = true;
        this.attributes[attributeType].values = data;
        this.dirtyAtt[attributeType] = this.attributes[attributeType];
    }

    protected create(device: GraphicsDevice): VertexArray {
        let geAtts = this.attributes;
        let vertexAtts = Object.keys(geAtts).map(attName => {
            let geAtt = geAtts[attName] as GeometryAttribute;
            let att: IvertexAttributeOption = {
                type: geAtt.type,
                componentDatatype: geAtt.componentDatatype,
                componentsPerAttribute: geAtt.componentsPerAttribute,
                normalize: geAtt.normalize,
            };

            if (geAtt.values) {
                att.vertexBuffer = new VertexBuffer({
                    context: device,
                    usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                    typedArray: geAtt.values
                });
            } else {
                att.value = geAtt.value
            }
            return att;
        })

        let indexBuffer;
        if (this.indices) {
            indexBuffer = new IndexBuffer({
                context: device,
                typedArray: this.indices,
            })
        }
        return new VertexArray({
            context: device,
            vertexAttributes: vertexAtts,
            indexBuffer: indexBuffer
        });
    }

    protected refresh(device: GraphicsDevice): void {
        for (let key in this.dirtyAtt) {
            if (this.graphicAsset.hasAttribute(key)) {
                this.graphicAsset.updateAttributeBufferData(key, this.dirtyAtt[key].values);
            } else {
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
                this.graphicAsset.update(att);
            }
        }
    }

}

export interface IgeometryOptions {
    attributes?: IgeometryAttributeOptions[];
    indices?: IndicesArray | Array<number>;
    primitiveType?: number;
    boundingSphere?: BoundingSphere;
    count?: number;
    offset?: number;
}
