import { IndicesArray, IndexBuffer } from "../../../webgl/IndexBuffer";
import { GeometryAsset } from "./baseGeometry";
import { GeometryAttribute, IgeometryAttributeOptions } from "./geometryAttribute";
import { PrimitiveTypeEnum } from "../../../webgl/PrimitiveTypeEnum";
import { BoundingSphere } from "../../bounds";
import { GlConstants } from "../../../webgl/GLconstant";
import { VertexAttEnum } from "../../../webgl/vertexAttEnum";
import { TypedArray } from "../../../core/typedArray";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { VertexArray } from "../../../webgl/vertextArray";
import { IvertexAttributeOption, VertexAttribute } from "../../../webgl/vertexAttribute";
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
        });
        this.indices = option.indices instanceof Array ? new Uint16Array(option.indices) : option.indices;
        this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
        this.boundingSphere = option.boundingSphere;
    }

    private _vertexCount: number;
    get vertexCount() { return this._vertexCount; };
    get bounding() {
        if (this.boundingSphere == null) {
            this.boundingSphere = BoundingSphere.fromTypedArray(this.attributes[VertexAttEnum.POSITION]?.values);
        }
        return this.boundingSphere;
    }

    private newAtts: { [name: string]: GeometryAttribute } = {};
    private dirtyAtt: { [name: string]: TypedArray } = {};
    addAttribute(attributeType: VertexAttEnum, options: Omit<IgeometryAttributeOptions, "type">) {
        const geAtt = new GeometryAttribute({ ...options, type: attributeType });
        this.attributes[attributeType] = geAtt;
        if (attributeType === VertexAttEnum.POSITION) {
            this._vertexCount = geAtt.values.length / geAtt.componentsPerAttribute;
        }
        if (this.graphicAsset != null) {
            this.beNeedRefreshGraphicAsset = true;
            this.newAtts[attributeType] = geAtt;
        }
    }

    updateAttributeData(attributeType: VertexAttEnum, data: TypedArray) {
        if (this.attributes[attributeType]) {
            this.beNeedRefreshGraphicAsset = true;
            this.attributes[attributeType].values = data;
            this.dirtyAtt[attributeType] = data;
        } else {
            console.warn("updateAttributeData failed");
        }
    }

    protected create(device: GraphicsDevice): VertexArray {
        const geAtts = this.attributes;
        const vertexAtts = Object.keys(geAtts).map(attName => {
            const geAtt = geAtts[attName] as GeometryAttribute;
            const att: IvertexAttributeOption = {
                type: geAtt.type,
                componentDatatype: geAtt.componentDatatype,
                componentsPerAttribute: geAtt.componentsPerAttribute,
                normalize: geAtt.normalize
            };

            if (geAtt.values) {
                att.vertexBuffer = new VertexBuffer({
                    context: device,
                    usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                    typedArray: geAtt.values
                });
            } else {
                att.value = geAtt.value;
            }
            return att;
        });

        let indexBuffer;
        if (this.indices) {
            indexBuffer = new IndexBuffer({
                context: device,
                typedArray: this.indices
            });
        }
        return new VertexArray({
            context: device,
            vertexAttributes: vertexAtts,
            indexBuffer: indexBuffer
        });
    }

    protected updateDirtyAtts(device: GraphicsDevice): void {
        Object.values(this.newAtts).forEach(geAtt => {
            // let geAtt = this.dirtyAtt[key];
            const att: IvertexAttributeOption = {
                type: geAtt.type,
                componentDatatype: geAtt.componentDatatype,
                componentsPerAttribute: geAtt.componentsPerAttribute,
                normalize: geAtt.normalize
            };
            att.vertexBuffer = new VertexBuffer({
                context: device,
                usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                typedArray: geAtt.values
            });
            this.graphicAsset.addNewAttribute(att);
        });
        this.newAtts = {};

        const newDatas = Object.entries(this.dirtyAtt).map(item => { return { att: item[0], values: item[1] }; }) as any;
        this.graphicAsset.updateAttributesData(newDatas);
        this.dirtyAtt = {};
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
