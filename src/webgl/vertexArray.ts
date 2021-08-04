import { IndexBuffer, IndicesArray } from "./indexBuffer";
import { GraphicsDevice } from "./graphicsDevice";
import { IVertexAttributeOption, VertexAttribute } from "./vertexAttribute";
import { IglElement } from "../core/iglElement";
import { VertexAttEnum } from "./vertexAttEnum";
import { TypedArray } from "../core/typedArray";
import { PrimitiveTypeEnum } from "./primitiveTypeEnum";

/**
 * @example
 * var positionBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         index                  : 0,
 *         enabled                : true,
 *         vertexBuffer           : positionBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : false,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 0 // tightly packed
 *         instanceDivisor        : 0 // not instanced
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * var positionBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var normalBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         type                   : VertexAttEnum.POSITION
 *         vertexBuffer           : positionBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     },
 *     {
 *         type                   : VertexAttEnum.TANGENT
 *         vertexBuffer           : normalBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * var buffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 24,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         type                   : VertexAttEnum.POSITION
 *         vertexBuffer           : buffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 24
 *     },
 *     {
 *         type                   : VertexAttEnum.TANGENT
 *         vertexBuffer           : buffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : true,
 *         offsetInBytes          : 12,
 *         strideInBytes          : 24
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 */

export class VertexArray implements IglElement {
    private _vertexAttributes: { [type: string]: VertexAttribute } = {};
    private _indexBuffer: IndexBuffer;
    private _vao: any;
    private _context: GraphicsDevice;
    private _primitiveType: PrimitiveTypeEnum;
    private _primitiveCount: number;
    private _primitiveByteOffset: number = 0;

    private dirtyMeta: { [att: string]: { newData: TypedArray | number, beDirty: boolean } } = {};
    private indicesDirtyMeta: { newData: TypedArray | number, beDirty: boolean } = null;

    get vertexAttributes() { return this._vertexAttributes; }
    get vertexCount() {
        return this._vertexAttributes[VertexAttEnum.POSITION].count;
    }

    get primitiveType() { return this._primitiveType; }
    set primitiveType(type: PrimitiveTypeEnum) { this._primitiveType = type; };

    set primitiveCount(count: number) { this._primitiveCount = count; }
    get primitiveCount() { return this._primitiveCount ?? this._indexBuffer?.numberOfIndices ?? this.vertexCount; }

    get primitiveByteOffset() { return this._primitiveByteOffset; }
    set primitiveByteOffset(offset: number) {
        this._primitiveByteOffset = offset;
    }

    get indexBuffer() { return this._indexBuffer; }

    updateAttributesData(data: { att: VertexAttEnum, value: TypedArray | number }[]) {
        data.forEach(({ att, value }) => {
            this.dirtyMeta[att] = { beDirty: true, newData: value };
        });
    }

    updateIndicesData(data: TypedArray | number) {
        this.indicesDirtyMeta = { beDirty: true, newData: data };
    }

    addNewAttribute(att: IVertexAttributeOption) {
        this._vertexAttributes[att.type] = new VertexAttribute(this._context, att);
        this.dirtyMeta[att.type] = { beDirty: true, newData: null };
    }

    constructor(options: IVaoOptions) {
        this._context = options.context;
        // this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
        options.vertexAttributes.forEach(item => {
            this._vertexAttributes[item.type] = new VertexAttribute(options.context, item);
        });
        this._indexBuffer = options.indexBuffer;
        this._primitiveType = options.primitiveType ?? PrimitiveTypeEnum.TRIANGLES;
        this._primitiveByteOffset = options.primitiveByteOffset ?? 0;
        this._primitiveCount = options.primitiveCount;

        const gl = options.context.gl;

        if (options.context.caps.vertexArrayObject) {
            this._bind = () => {
                if (this._vao != this._context.bindingVao) {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);

                    const dirtyAtts = Object.keys(this.dirtyMeta);
                    if (dirtyAtts.length > 0) {
                        for (const key in this.dirtyMeta) {
                            const { beDirty, newData } = this.dirtyMeta[key];
                            if (beDirty) {
                                if (newData) {
                                    this._vertexAttributes[key].vertexBuffer.update(newData);
                                } else {
                                    this._vertexAttributes[key].bind();
                                }
                            }
                        }
                        this.dirtyMeta = {};
                    }
                    if (this.indicesDirtyMeta != null) {
                        const { newData, beDirty } = this.indicesDirtyMeta;
                        if (beDirty) {
                            if (newData) {
                                this.indexBuffer.update(this.indicesDirtyMeta.newData);
                            } else {
                                this.indexBuffer.bind();
                            }
                        }
                        this.indicesDirtyMeta = null;
                    }
                }
            };
            this._unbind = () => {
                this._context.bindingVao = null;
                gl.bindVertexArray(null);
            };

            this._vao = gl.createVertexArray();
            this._bind();
            bindVertexAttributes(this._vertexAttributes, this._indexBuffer);
            this._unbind();

            this.destroy = () => {
                gl.deleteVertexArray(this._vao);
            };
        } else {
            this._bind = () => {
                const dirtyAtts = Object.keys(this.dirtyMeta);
                if (dirtyAtts.length > 0) {
                    for (const key in this._vertexAttributes) {
                        if (this.dirtyMeta[key]?.newData) {
                            this._vertexAttributes[key].vertexBuffer.update(this.dirtyMeta[key].newData);
                        } else {
                            this._vertexAttributes[key].bind();
                        }
                    }
                    this.dirtyMeta = {};
                } else {
                    for (const key in this._vertexAttributes) {
                        this._vertexAttributes[key].bind();
                    }
                }

                if (this._indexBuffer) {
                    if (this.indicesDirtyMeta?.newData) {
                        this._indexBuffer.update(this.indicesDirtyMeta.newData);
                        this.indicesDirtyMeta = null;
                    } else {
                        this._indexBuffer.bind();
                    }
                }
            };
            this._unbind = () => {
                unbindAttributes(this._vertexAttributes, this._indexBuffer);
            };
        }
    }

    hasAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] != null; }

    private _bind() { }
    private _unbind() { }
    static _cachedVertexArray: VertexArray;

    bind() {
        this._bind();
    }

    unbind() {
        this._unbind();
        VertexArray._cachedVertexArray = null;
    }

    destroy() { }
}

export interface IVaoOptions {
    context: GraphicsDevice;
    vertexAttributes: IVertexAttributeOption[];
    indexBuffer?: IndexBuffer;
    offset?: number
    primitiveType?: PrimitiveTypeEnum;
    primitiveByteOffset?: number;
    primitiveCount?: number;
}

function bindVertexAttributes(vertexAtts: { [type: string]: VertexAttribute }, indexBuffer?: IndexBuffer): void {
    for (const key in vertexAtts) {
        vertexAtts[key].bind();
    }
    if (indexBuffer) {
        indexBuffer.bind();
    }
}
function unbindAttributes(vertexAtts: { [type: string]: VertexAttribute }, indexBuffer?: IndexBuffer) {
    for (const key in vertexAtts) {
        vertexAtts[key].unbind();
    }
    if (indexBuffer) {
        indexBuffer.unbind();
    }
}
