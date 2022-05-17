import { IndexBuffer, IndexBufferOption } from "./indexBuffer";
import { GraphicsDevice } from "./graphicsDevice";
import { IVertexAttributeOption, VertexAttribute } from "./vertexAttribute";
import { IglElement } from "../core/iglElement";
import { VertexAttEnum } from "./vertexAttEnum";
import { PrimitiveTypeEnum } from "./primitiveTypeEnum";

/**
 * @example
 * var positionBuffer = new VertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         buffer                 : positionBuffer,
 *         componentSize          : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : false,
 *         bytesOffset            : 0,
 *         bytesStride            : 0 
 *         instanceDivisor        : 0
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * var positionBuffer = new VertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var normalBuffer = new VertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         type                   : VertexAttEnum.POSITION
 *         buffer                 : positionBuffer,
 *         componentSize          : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     },
 *     {
 *         type                   : VertexAttEnum.TANGENT
 *         buffer                 : normalBuffer,
 *         componentSize          : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * var buffer = new VertexBuffer({
 *     context : context,
 *     sizeInBytes : 24,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         type                   : VertexAttEnum.POSITION
 *         buffer           : buffer,
 *         componentSize : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         bytesOffset          : 0,
 *         bytesStride          : 24
 *     },
 *     {
 *         type                   : VertexAttEnum.TANGENT
 *         buffer           : buffer,
 *         componentSize : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : true,
 *         bytesOffset          : 12,
 *         bytesStride          : 24
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
    get vertexCount() {
        return this._vertexAttributes[VertexAttEnum.POSITION].count;
    }
    get primitiveType() { return this._primitiveType; }
    set primitiveType(type: PrimitiveTypeEnum) { this._primitiveType = type; };

    private _count: number;
    private _bytesOffset: number;
    set count(count: number) { this._count = count; }
    get count() { return this._count ?? this._indexBuffer?.count ?? this.vertexCount; }
    get bytesOffset() { return this._bytesOffset ?? this._indexBuffer?.bytesOffset ?? 0; }
    set bytesOffset(offset: number) { this._bytesOffset = offset; }
    constructor(context: GraphicsDevice, options: IVaoOptions) {
        this._context = context;
        // this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
        options.vertexAttributes.forEach(item => {
            this.addAttribute(item);
        })
        if (options.indices != null) {
            if (options.indices instanceof IndexBuffer) {
                this._indexBuffer = options.indices;
            } else {
                this._indexBuffer = new IndexBuffer(context, options.indices);
            }
        }
        this._primitiveType = options.primitiveType ?? PrimitiveTypeEnum.TRIANGLES;
        this._bytesOffset = options.bytesOffset;
        this._count = options.count;

        const gl = context.gl;

        if (context.caps.vertexArrayObject) {
            this.bind = () => {
                if (this._vao != this._context.bindingVao) {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);
                }
                for (const key in this._vertexAttributes) {
                    this._vertexAttributes[key].bind(this);
                }
                this._indexBuffer?.bind(this);
            };
            this.unbind = () => {
                this._context.bindingVao = null;
                gl.bindVertexArray(null);
            };

            this.destroy = () => {
                gl.deleteVertexArray(this._vao);
            };

            this._vao = gl.createVertexArray();
            this.bind();
            // this.unbind();
        } else {
            this.bind = () => {
                for (const key in this._vertexAttributes) {
                    this._vertexAttributes[key].bind();
                }
                this._indexBuffer?.bind();
            };
            this.unbind = () => {
                for (const key in this._vertexAttributes) {
                    this._vertexAttributes[key].unbind();
                }
                this._indexBuffer?.unbind();
            };
        }
    }

    get vertexAttributes() { return this._vertexAttributes; }
    hasAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] != null; }
    getAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] }
    //不需要removeAttribute，即disableVertexAttribute
    addAttribute(att: VertexAttribute | IVertexAttributeOption) {
        let vAtt: VertexAttribute = att as any;
        if (!(att instanceof VertexAttribute)) {
            this._vertexAttributes[vAtt.type] = new VertexAttribute(this._context, att);
        } else {
            if (this._vertexAttributes[vAtt.type] == att) return;
            this._vertexAttributes[vAtt.type] = att;
        }
    }
    get indexBuffer() { return this._indexBuffer; }
    set indexBuffer(buffer: IndexBuffer) { this._indexBuffer = buffer; }
    bind() { }
    unbind() { }

    destroy() { }
}

export interface IVaoOptions {
    vertexAttributes: IVertexAttributeOption[] | VertexAttribute[];
    indices?: IndexBufferOption | IndexBuffer;
    primitiveType?: PrimitiveTypeEnum;
    //修改indexBuffer的使用範圍
    bytesOffset?: number;
    //修改indexBuffer的使用範圍
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


