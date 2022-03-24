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
    private _bytesOffset: number = 0;
    set count(count: number) { this._count = count; }
    get count() { return this._count ?? this._indexBuffer?.count ?? this.vertexCount; }
    get bytesOffset() { return this._bytesOffset; }
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
        this._bytesOffset = options.bytesOffset ?? 0;
        this._count = options.count;

        const gl = context.gl;

        if (context.caps.vertexArrayObject) {
            this._dirtyAtts = new Set<string>();
            this.bind = () => {
                if (this._vao != this._context.bindingVao || this._dirtyAtts.size != 0 || this._indexDirty) {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);
                    this._dirtyAtts.forEach(item => {
                        this._vertexAttributes[item].bind()
                    })
                    this._dirtyAtts.clear();
                }
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
            bindVertexAttributes(this._vertexAttributes, this._indexBuffer);
            this.unbind();

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

    get vertexAttributes() { return this._vertexAttributes; }
    hasAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] != null; }
    getAttribute(att: VertexAttEnum | string) { return this._vertexAttributes[att] }
    addAttribute(att: VertexAttribute | IVertexAttributeOption) {
        let vAtt: VertexAttribute = att as any;
        if (!(att instanceof VertexAttribute)) {
            vAtt = new VertexAttribute(this._context, att);
        }
        if (this._vertexAttributes[vAtt.type] != null) {
            this._vertexAttributes[vAtt.type].off("AttUpdate", this.listenToVertexAttributeUpdate)
        }
        this._vertexAttributes[vAtt.type] = vAtt;
        vAtt.on("AttUpdate", this.listenToVertexAttributeUpdate)
        this._dirtyAtts?.add(att.type);
    }
    private listenToVertexAttributeUpdate = (type: string) => {
        this._dirtyAtts?.add(type);
    }
    get indexBuffer() { return this._indexBuffer; }
    set indexBuffer(buffer: IndexBuffer) {
        if (this._indexBuffer != buffer) {
            this._indexBuffer = buffer;
            this._indexDirty = true;
        }
    }
    private _indexDirty: boolean;
    private _dirtyAtts: Set<string>;
    bind() { }
    unbind() { }

    destroy() { }
}

export interface IVaoOptions {
    vertexAttributes: IVertexAttributeOption[] | VertexAttribute[];
    indices?: IndexBufferOption | IndexBuffer;
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


