import { IndicesArray } from "../../webgl/indexBuffer";
import { GeometryAttribute, IGeometryAttributeOptions } from "./geometryAttribute";
import { PrimitiveTypeEnum } from "../../webgl/PrimitiveTypeEnum";
import { BoundingBox } from "../bounds";
import { GlConstants } from "../../webgl/glConstant";
import { VertexAttEnum } from "../../webgl/vertexAttEnum";
import { TypedArray } from "../../core/typedArray";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { VertexArray } from "../../webgl/vertexArray";
import { GraphicIndexBuffer } from "./buffer";
import { ComponentDatatypeEnum } from "../../webgl";

/**
 * 
 * @example useage
 * ```
 * var geometry = new Geometry({
 *   attributes : [
 * ]{
 *    {
 *       componentDatatype : ComponentDatatype.FLOAT,
 *       componentSize : 3,
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
    attributes: { [keyName: string]: GeometryAttribute } = {};
    indices?: GraphicIndexBuffer;
    primitiveType: PrimitiveTypeEnum;
    bytesOffset: number;
    count?: number;

    private _vertexCount: number;
    get vertexCount() { return this._vertexCount; };

    private _bounding: BoundingBox;
    get boundingBox() {
        if (this._bounding == null) {
            this._bounding = BoundingBox.fromTypedArray(this.attributes[VertexAttEnum.POSITION]?.data);
        }
        return this._bounding;
    }
    set boundingBox(box: BoundingBox) {
        this._bounding = box;
    }
    constructor(option: IGeometryOptions) {
        option.attributes.forEach(item => {
            this.addAttribute(item.type, item);
        });
        if (option.indices instanceof Array) {
            this.indices = new GraphicIndexBuffer({ data: new Uint16Array(option.indices) });
        } else if (option.indices instanceof GraphicIndexBuffer) {
            this.indices = option.indices;
        }
        this.primitiveType = option?.primitiveType ?? GlConstants.TRIANGLES;
        this.bytesOffset = option.bytesOffset ?? 0;
        this.count = option.count;
        this._bounding = option.boundingBox;
    }

    addAttribute(attributeType: VertexAttEnum, options: Omit<IGeometryAttributeOptions, "type">) {
        const geAtt = new GeometryAttribute({ ...options, type: attributeType });
        this.attributes[attributeType] = geAtt;
        if (attributeType === VertexAttEnum.POSITION) {
            this._vertexCount = geAtt.data?.length / geAtt.componentSize;
        }
    }

    updateAttributeData(attributeType: VertexAttEnum, data: TypedArray, dataType?: ComponentDatatypeEnum) {
        if (this.attributes[attributeType]) {
            this.attributes[attributeType].changeData({ data: data, componentDatatype: dataType });
        } else {
            console.warn("updateAttributeData failed");
        }
    }

    private glTarget: VertexArray;
    /**
     * Private
     */
    bind(device: GraphicsDevice) {
        if (this.glTarget == null) {
            this.glTarget = this.create(device);
        }
        this.glTarget.bind();
        for (let key in this.attributes) {
            this.attributes[key].bind(device);
        }
        return this.glTarget;
    }

    protected create(device: GraphicsDevice): VertexArray {
        const geAtts = this.attributes;
        device.unbindVao();
        const vertexAtts = Object.keys(geAtts).map(attName => {
            const geAtt = geAtts[attName] as GeometryAttribute;
            return geAtt.getGlTarget(device);
        });

        let indexBuffer = this.indices?.getGlTarget(device);
        return device.createVertexArray({
            vertexAttributes: vertexAtts,
            indexBuffer: indexBuffer,
            primitiveType: this.primitiveType,
            bytesOffset: this.bytesOffset,
            count: this.count,
        });
    }
    destroy(): void {
        this.glTarget?.destroy();
    }
}

export interface IGeometryOptions {
    attributes?: IGeometryAttributeOptions[];
    indices?: IndicesArray | Array<number> | GraphicIndexBuffer;
    primitiveType?: number;
    boundingBox?: BoundingBox;
    bytesOffset?: number;
    count?: number;
}
