import { IndicesArray } from "../webgl/indexBuffer";
import { GeometryAttribute, IGeometryAttributeOptions } from "./geometryAttribute";
import { PrimitiveTypeEnum } from "../webgl/PrimitiveTypeEnum";
import { BoundingBox } from "../scene/bounds";
import { GlConstants } from "../webgl/glConstant";
import { VertexAttEnum } from "../webgl/vertexAttEnum";
import { TypedArray } from "../core/typedArray";
import { GraphicsDevice } from "../webgl/graphicsDevice";
import { VertexArray } from "../webgl/vertexArray";
import { GraphicIndexBuffer } from "./buffer";
import { ComponentDatatypeEnum } from "../webgl";
import { Asset } from "../scene/asset";

/**
 * 
 * @example useage
 * ```
 * var geometry = new Geometry({
 *     attributes: [
 *         {
 *             type: VertexAttEnum.POSITION,
 *             componentSize: 3,
 *             data: new Float32Array([
 *                 1.0, 0.0, 0.0,
 *                 1.0, 1.0, 0.0,
 *                 -1.0, 1.0, 0.0,
 *                 -1.0,0.0,0.0
 *             ])
 *         }
 *     ],
 *     indices: new Uint16Array([1, 2, 3, 1, 3, 4])
 * });
 * ```
 */
export class Geometry extends Asset {
    attributes: { [keyName: string]: GeometryAttribute } = {};
    indices?: GraphicIndexBuffer;
    primitiveType: PrimitiveTypeEnum;
    bytesOffset: number;
    private _count?: number;
    get count() { return this._count }
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
    constructor(option?: IGeometryOptions) {
        super();
        option = option ?? {};
        option.attributes?.forEach(item => {
            this.addAttribute(item.type, item);
        });
        if (option.indices instanceof Array) {
            this.indices = new GraphicIndexBuffer({ data: new Uint16Array(option.indices) });
        } else if (option.indices instanceof GraphicIndexBuffer) {
            this.indices = option.indices;
        }
        this.primitiveType = option.primitiveType ?? GlConstants.TRIANGLES;
        this.bytesOffset = option.bytesOffset ?? 0;
        this._count = option.count;
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

    setIndices(data: IndicesArray | Array<number> | GraphicIndexBuffer) {
        if (this.glTarget != null) {
            throw new Error("出问题了,VAO已创建")
        } else {
            if (this.indices != null) {
                if (data instanceof Array) {
                    this.indices.changeData({ data: new Uint16Array(data) })
                } else if (ArrayBuffer.isView(data)) {
                    this.indices.changeData({ data })
                } else {
                    //TODO
                    throw new Error("出问题了")
                }
            } else {
                if (data instanceof Array) {
                    this.indices = new GraphicIndexBuffer({ data: new Uint16Array(data) });
                } else if (data instanceof GraphicIndexBuffer) {
                    this.indices = data;
                } else if (ArrayBuffer.isView(data)) {
                    this.indices = new GraphicIndexBuffer({ data });
                }
            }
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
            indices: indexBuffer,
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
