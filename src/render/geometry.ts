
import { GeometryAttribute, IGeometryAttributeOptions } from "./geometryAttribute";
import { BoundingBox } from "../scene/bounds";
import { TypedArray } from "../core/typedArray";
import { GraphicIndexBuffer } from "./buffer";
import { Asset } from "../resources/asset";
import { ComponentDatatypeEnum, GlConstants, GraphicsDevice, IndicesArray, PrimitiveTypeEnum, VertexArray, VertexAttEnum, VertexAttribute } from "../webgl";
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

    private _indices?: GraphicIndexBuffer;
    get indices() { return this._indices }
    set indices(data: IndicesArray | Array<number> | GraphicIndexBuffer) {
        if (data instanceof GraphicIndexBuffer) {
            if (this._indices != null) {
                this._indices.off("BeDirty", this.listenToBeDirty)
            }
            this._indices = data;
        } else {
            if (this._indices != null) {
                if (data instanceof Array) {
                    this._indices.set({ data: new Uint16Array(data) })
                } else if (ArrayBuffer.isView(data)) {
                    this._indices.set({ data })
                }
            } else {
                if (data instanceof Array) {
                    this._indices = new GraphicIndexBuffer({ data: new Uint16Array(data) });
                } else if (ArrayBuffer.isView(data)) {
                    this._indices = new GraphicIndexBuffer({ data });
                }
            }
        }
        this._beDirty = true;
    }

    private _primitiveType: PrimitiveTypeEnum;
    get primitiveType() { return this._primitiveType }
    set primitiveType(value: PrimitiveTypeEnum) {
        this._primitiveType = value;
        this._beDirty = true;
    }

    private _bytesOffset: number;
    get bytesOffset() { return this._bytesOffset }
    set bytesOffset(value: number) {
        this._bytesOffset = value;
        this._beDirty = true;
    }

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

    private _beDirty: boolean = true;
    constructor(option?: IGeometryOptions) {
        super();
        option = option ?? {};
        option.attributes?.forEach(item => {
            this.addAttribute(item);
        });
        if (option.indices) {
            this.indices = option.indices;
        }
        this.primitiveType = option.primitiveType ?? GlConstants.TRIANGLES;
        this.bytesOffset = option.bytesOffset ?? 0;
        this._count = option.count;
        this._bounding = option.boundingBox;
    }

    addAttribute(data: IGeometryAttributeOptions | GeometryAttribute) {
        let vAtt: GeometryAttribute = data as any;
        if (!(data instanceof GeometryAttribute)) {
            vAtt = new GeometryAttribute({ ...data });
        }
        this.attributes[vAtt.type]?.off("BeDirty", this.listenToAttBeDirty);
        this.attributes[vAtt.type] = vAtt;
        vAtt.on("BeDirty", this.listenToAttBeDirty);
        this._beDirty = true;
    }

    private _dirtyAtts = new Set<number>();
    private listenToAttBeDirty = (type: number) => {
        this._dirtyAtts.add(type);
        this._beDirty = true;
    }
    private listenToBeDirty = () => {
        this._beDirty = true;
    }
    private _glTarget: VertexArray;
    /**
     * Private
     */
    syncDataAndBind(device: GraphicsDevice) {
        if (this._glTarget == null) {
            device.unbindVao();
            let vertexAtts: VertexAttribute[] = [];
            for (let key in this.attributes) {
                let target = this.attributes[key].syncData(device);
                vertexAtts.push(target);
            }
            let indexBuffer = this._indices?.syncData(device);
            this._glTarget = device.createVertexArray({
                vertexAttributes: vertexAtts,
                indices: indexBuffer,
                primitiveType: this.primitiveType,
                bytesOffset: this.bytesOffset,
                count: this.count,
            });
            this._beDirty = false
        } else {
            if (this._beDirty) {
                this._beDirty = false;
                device.unbindVao();
                if (this.indices) {
                    this._glTarget.indexBuffer = this._indices.syncData(device);
                }
                this._glTarget.primitiveType = this._primitiveType;
                this._glTarget.bytesOffset = this._bytesOffset;
                this._glTarget.count = this._count;
                if (this._dirtyAtts.size > 0) {
                    this._dirtyAtts.forEach(attType => {
                        let attTarget = this.attributes[attType].syncData(device);
                        this._glTarget.addAttribute(attTarget);
                    })
                    this._dirtyAtts.clear();
                }
            }

            this._glTarget.bind();
        }
        return this._glTarget;
    }
    destroy(): void {
        this._glTarget?.destroy();
    }
}


export interface IGeometryOptions {
    attributes?: (GeometryAttribute | IGeometryAttributeOptions)[];
    indices?: IndicesArray | Array<number> | GraphicIndexBuffer;
    primitiveType?: number;
    boundingBox?: BoundingBox;
    bytesOffset?: number;
    count?: number;
}
