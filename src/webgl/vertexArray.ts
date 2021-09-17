import { IndexBuffer, IndicesArray } from "./indexBuffer";
import { GraphicsDevice } from "./graphicsDevice";
import { IVertexAttributeOption, VertexAttribute } from "./vertexAttribute";
import { IglElement } from "../core/iglElement";
import { VertexAttEnum } from "./vertexAttEnum";
import { TypedArray } from "../core/typedArray";
import { PrimitiveTypeEnum } from "./primitiveTypeEnum";
import { Buffer } from './buffer';

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
 *         bytesOffset          : 0,
 *         strideInBytes          : 24
 *     },
 *     {
 *         type                   : VertexAttEnum.TANGENT
 *         vertexBuffer           : buffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : true,
 *         bytesOffset          : 12,
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


    private dirtyMeta: { [att: string]: { newData: TypedArray | number, beDirty: boolean } } = {};
    private indicesDirtyMeta: { newData: TypedArray | number, beDirty: boolean } = null;

    get vertexAttributes() { return this._vertexAttributes; }
    get vertexCount() {
        return this._vertexAttributes[VertexAttEnum.POSITION].count;
    }
    get primitiveType() { return this._primitiveType; }
    set primitiveType(type: PrimitiveTypeEnum) { this._primitiveType = type; };

    private _count: number;
    private _bytesOffset: number = 0;
    set count(count: number) { this._count = count; }
    get count() { return this._count ?? this._indexBuffer?.count ?? this.vertexCount; }
    get bytesOffset() { return this._bytesOffset; }
    set bytesOffset(offset: number) { this._bytesOffset = offset; }
    get indexBuffer() { return this._indexBuffer; }
    constructor(options: IVaoOptions) {
        this._context = options.context;
        // this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
        let atts: VertexAttribute[] = [];
        if (options.vertexAttributes[0] instanceof VertexAttribute) {
            atts = options.vertexAttributes as any;
        } else {
            options.vertexAttributes.forEach(item => {
                atts.push(new VertexAttribute(options.context, item));
            });
        }
        atts.forEach(item => {
            this._vertexAttributes[item.type] = item;
        })
        this._indexBuffer = options.indexBuffer;
        this._primitiveType = options.primitiveType ?? PrimitiveTypeEnum.TRIANGLES;
        this._bytesOffset = options.bytesOffset ?? 0;
        this._count = options.count;

        const gl = options.context.gl;

        if (options.context.caps.vertexArrayObject) {
            this.bind = () => {
                if (this._vao != this._context.bindingVao) {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);
                }
            };
            this.unbind = () => {
                this._context.bindingVao = null;
                gl.bindVertexArray(null);
            };

            this._vao = gl.createVertexArray();
            this.bind();
            bindVertexAttributes(this._vertexAttributes, this._indexBuffer);
            this.unbind();

            this.destroy = () => {
                gl.deleteVertexArray(this._vao);
            };
        } else {
            this.bind = () => {
                for (const key in this._vertexAttributes) {
                    this._vertexAttributes[key].bind();
                }
                this._indexBuffer?.bind();
            };
            this.unbind = () => {
                unbindAttributes(this._vertexAttributes, this._indexBuffer);
            };
        }
    }

    hasAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] != null; }

    bind() { }
    unbind() { }

    destroy() { }
}

export interface IVaoOptions {
    context: GraphicsDevice;
    vertexAttributes: IVertexAttributeOption[] | VertexAttribute[];
    indexBuffer?: IndexBuffer;
    primitiveType?: PrimitiveTypeEnum;
    bytesOffset?: number;
    count?: number;
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


