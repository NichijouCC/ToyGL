import { BufferUsageEnum, Buffer } from "./Buffer";
import { IndexBuffer, IndicesArray } from "./IndexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { VertexBuffer } from "./VertexBuffer";
import { IvertexAttributeOption, VertexAttribute } from "./VertexAttribute";
import { IglElement } from "../core/IglElement";
import { VertexAttEnum } from "./VertexAttEnum";
import { TypedArray } from "../core/TypedArray";
import { PrimitiveTypeEnum } from "./PrimitiveTypeEnum";

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
    private _indexbuffer: IndexBuffer;
    private _vao: any;
    private _context: GraphicsDevice;
    private _primitiveType: PrimitiveTypeEnum;
    private _primitiveCount: number;
    private _primitiveByteOffset: number = 0;

    private dirtyMeta: { [att: string]: { newData: TypedArray | number, beDirty: boolean } } = {};
    private indiceDirtyMeta: { newData: TypedArray | number, beDirty: boolean } = null;

    get vertexAttributes() { return this._vertexAttributes }
    get vertexcount() {
        return this._vertexAttributes[VertexAttEnum.POSITION].count;
    }
    get primitiveType() { return this._primitiveType }
    set primitiveType(type: PrimitiveTypeEnum) { this._primitiveType = type };

    set primitiveCount(count: number) { this._primitiveCount = count; }
    get primitveCount() { return this._primitiveCount ?? this._indexbuffer?.numberOfIndices ?? this.vertexcount; }

    get primitiveByteOffset() { return this._primitiveByteOffset; }
    set primitiveByteOffset(offset: number) {
        this._primitiveByteOffset = offset;
    }
    get indexBuffer() { return this._indexbuffer; }

    updateAttributesData(data: { att: VertexAttEnum, value: TypedArray | number }[]) {
        data.forEach(({ att, value }) => {
            this.dirtyMeta[att] = { beDirty: true, newData: value };
        })
    }

    updateindiceData(data: TypedArray | number) {
        this.indiceDirtyMeta = { beDirty: true, newData: data };
    }

    addNewAttribute(att: IvertexAttributeOption) {
        this._vertexAttributes[att.type] = new VertexAttribute(this._context, att);
        this.dirtyMeta[att.type] = { beDirty: true, newData: null }
    }


    constructor(options: IvaoOptions) {
        this._context = options.context;
        // this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
        options.vertexAttributes.forEach(item => {
            this._vertexAttributes[item.type] = new VertexAttribute(options.context, item)
        })
        this._indexbuffer = options.indexBuffer;
        this._primitiveType = options.primitiveType ?? PrimitiveTypeEnum.TRIANGLES;
        this._primitiveByteOffset = options.primitiveByteOffset ?? 0;
        this._primitiveCount = options.primitiveCount;

        let gl = options.context.gl;

        if (options.context.caps.vertexArrayObject) {
            this._bind = () => {
                if (this._vao != this._context.bindingVao) {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);

                    let dirtyAtts = Object.keys(this.dirtyMeta);
                    if (dirtyAtts.length > 0) {
                        for (let key in this.dirtyMeta) {
                            let { beDirty, newData } = this.dirtyMeta[key];
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
                    if (this.indiceDirtyMeta != null) {
                        let { newData, beDirty } = this.indiceDirtyMeta;
                        if (beDirty) {
                            if (newData) {
                                this.indexBuffer.update(this.indiceDirtyMeta.newData);
                            } else {
                                this.indexBuffer.bind();
                            }
                        }
                        this.indiceDirtyMeta = null;
                    }
                }
            }
            this._unbind = () => {
                this._context.bindingVao = null;
                gl.bindVertexArray(null);
            }

            this._vao = gl.createVertexArray();
            this._bind();
            bindVertexAttributes(gl, this._vertexAttributes, this._indexbuffer);
            this._unbind();

            this.destroy = () => {
                gl.deleteVertexArray(this._vao);
            }

        } else {
            this._bind = () => {

                let dirtyAtts = Object.keys(this.dirtyMeta);
                if (dirtyAtts.length > 0) {
                    for (let key in this._vertexAttributes) {
                        if (this.dirtyMeta[key]?.newData) {
                            this._vertexAttributes[key].vertexBuffer.update(this.dirtyMeta[key].newData);
                        } else {
                            this._vertexAttributes[key].bind();
                        }
                    }
                    this.dirtyMeta = {};
                } else {
                    for (let key in this._vertexAttributes) {
                        this._vertexAttributes[key].bind();
                    }
                }

                if (this._indexbuffer) {
                    if (this.indiceDirtyMeta?.newData) {
                        this._indexbuffer.update(this.indiceDirtyMeta.newData);
                        this.indiceDirtyMeta = null;
                    } else {
                        this._indexbuffer.bind();
                    }
                }
            }
            this._unbind = () => {
                unbindAttributes(gl, this._vertexAttributes, this._indexbuffer);
            }
        }
    }
    hasAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] != null; }


    updateAttributeBufferData(att: VertexAttEnum | string, sizeInBytesOrTypedArray: TypedArray | number) {
        // if (this._vao) { this._bind(); }
        // this._vertexAttributes[att].vertexBuffer.update(sizeInBytesOrTypedArray);

        this.dirtyMeta[att] = sizeInBytesOrTypedArray;
    }

    updateIndexBufferData(sizeInBytesOrTypedArray: IndicesArray | number) {
        // if (this._vao) { this._bind(); }
        // this.indexBuffer.update(sizeInBytesOrTypedArray);

        this.indiceDirtyMeta = sizeInBytesOrTypedArray;
    }

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

export interface IvaoOptions {
    context: GraphicsDevice;
    vertexAttributes: IvertexAttributeOption[];
    indexBuffer?: IndexBuffer;
    offset?: number
    primitiveType?: PrimitiveTypeEnum;
    primitiveByteOffset?: number;
    primitiveCount?: number;
}

function bindVertexAttributes(gl: WebGLRenderingContext, vertexAtts: { [type: string]: VertexAttribute }, indexBuffer?: IndexBuffer): void {
    for (let key in vertexAtts) {
        vertexAtts[key].bind();
    }
    if (indexBuffer) {
        indexBuffer.bind();
    }
}
function unbindAttributes(gl: WebGLRenderingContext, vertexAtts: { [type: string]: VertexAttribute }, indexBuffer?: IndexBuffer) {
    for (let key in vertexAtts) {
        vertexAtts[key].unbind();
    }
    if (indexBuffer) {
        indexBuffer.unbind();
    }
}