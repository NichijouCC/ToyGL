import { GraphicsDevice } from "./graphicsDevice";
import { ComponentDatatypeEnum } from "./componentDatatypeEnum";
import { VertexAttEnum } from "./vertexAttEnum";
import { GlType, TypedArray } from "../core/typedArray";
import { Buffer, BufferTargetEnum, BufferUsageEnum, IBufferSetOptions } from "./buffer";
import { EventEmitter } from "@mtgoo/ctool";
import { VertexArray } from "./vertexArray";

export interface IVertexAttribute {
    readonly type: string | VertexAttEnum
    readonly buffer: Buffer;
    componentSize: number;
    componentDatatype: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    instanceDivisor: number;
}
export interface IVertexAttributeOption {
    type: number | VertexAttEnum
    data?: Buffer | TypedArray;
    usage?: BufferUsageEnum;
    componentSize?: number;
    componentDatatype?: number;
    normalize?: boolean;
    bytesOffset?: number;
    bytesStride?: number;
    instanceDivisor?: number;
}


export class VertexAttribute implements IVertexAttribute {
    readonly type: number | VertexAttEnum;
    readonly index: number;
    private _buffer: Buffer;
    get buffer() { return this._buffer }
    private _componentSize: number;
    get componentSize() { return this._componentSize }
    set componentSize(value: number) {
        this._componentSize = value;
        this.bindToVao.clear();
    }
    private _componentDatatype: number;
    get componentDatatype() { return this._componentDatatype }
    set componentDatatype(value: number) {
        this._componentDatatype = value;
        this.bindToVao.clear();
    }
    private _normalize: boolean;
    get normalize() { return this._normalize }
    set normalize(value: boolean) {
        this._normalize = value;
        this.bindToVao.clear();
    }
    private _bytesOffset: number;
    get bytesOffset() { return this._bytesOffset }
    set bytesOffset(value: number) {
        this._bytesOffset = value;
        this.bindToVao.clear();
    }
    private _bytesStride: number;
    get bytesStride() { return this._bytesStride }
    set bytesStride(value: number) {
        this._bytesStride = value;
        this.bindToVao.clear();
    }
    private _instanceDivisor: number;
    get instanceDivisor() { return this._instanceDivisor }
    set instanceDivisor(value: number) {
        this._instanceDivisor = value;
        this.bindToVao.clear();
    }
    private _count: number;
    get count() { return this._count }

    private _gl: WebGLRenderingContext;
    private _context: GraphicsDevice;
    private bindToVao = new Set<VertexArray>();
    constructor(context: GraphicsDevice, options: IVertexAttributeOption) {
        if (options.data == null) {
            throw new Error("vertex Attribute option's data must not be null")
        }

        this._context = context;
        this._gl = context.gl;
        this.type = options.type;
        this.index = VertexAttEnum.toShaderLocation(this.type);
        // this._enabled = true;
        this._componentSize = options.componentSize ?? VertexAttEnum.toComponentSize(options.type);
        this._componentDatatype = options.componentDatatype ?? ComponentDatatypeEnum.FLOAT;
        this._normalize = options.normalize ?? false;
        this._bytesOffset = options.bytesOffset ?? 0;
        this._bytesStride = options.bytesStride ?? 0;
        this._instanceDivisor = options.instanceDivisor;
        if (options.data instanceof Buffer) {
            this._buffer = options.data;
        } else {
            this._buffer = new Buffer(context, { data: options.data, usage: options.usage, target: BufferTargetEnum.ARRAY_BUFFER })
        }

        const bytes = this._buffer.byteLength - this._bytesOffset;
        if (this._bytesStride == 0) {
            this._count = bytes / (this._componentSize * GlType.bytesPerElement(this._componentDatatype));
        } else {
            this._count = bytes / this._bytesStride;
        }
    }

    set(options: Partial<IBufferSetOptions & Omit<IVertexAttributeOption, "data" | "type" | "usage">>) {
        this._buffer.set(options);
        if (options.componentDatatype != null) this.componentDatatype = options.componentDatatype;
        if (options.componentSize != null) this.componentSize = options.componentSize;
        if (options.normalize != null) this.normalize = options.normalize;
        if (options.bytesOffset != null) this.bytesOffset = options.bytesOffset;
        if (options.bytesStride != null) this.bytesStride = options.bytesStride;
        if (options.instanceDivisor != null) this.instanceDivisor = options.instanceDivisor;
        const bytes = this._buffer.byteLength - this._bytesOffset;
        if (this._bytesStride == 0) {
            this._count = bytes / (this._componentSize * GlType.bytesPerElement(this._componentDatatype));
        } else {
            this._count = bytes / this._bytesStride;
        }
        this.bindToVao.clear();
    }

    bind(vao?: VertexArray) {
        if (vao != null) {
            if (this.bindToVao.has(vao)) return;
            this.bindToVao.add(vao);
        }
        this._buffer.bind();
        if (this.type == VertexAttEnum.INS_MAT4) {
            let stride = this._componentSize * GlType.bytesPerElement(this._componentDatatype);
            for (let i = 0; i < 4; i++) {
                this._gl.enableVertexAttribArray(this.index + i);
                this._gl.vertexAttribPointer(
                    this.index + i,
                    4,
                    this._componentDatatype,
                    this._normalize,
                    stride,
                    i * 4 * GlType.bytesPerElement(this._componentDatatype)
                );
                if (this._instanceDivisor != null) {
                    this._gl.vertexAttribDivisor(this.index + i, this._instanceDivisor);
                }
            }
        } else {
            this._gl.enableVertexAttribArray(this.index);
            this._gl.vertexAttribPointer(
                this.index,
                this._componentSize,
                this._componentDatatype,
                this._normalize,
                this._bytesStride,
                this._bytesOffset,
            );
            if (this._instanceDivisor != null) {
                this._gl.vertexAttribDivisor(this.index, this._instanceDivisor);
            }
        }
    }

    unbind(vao?: VertexArray) {
        if (vao != null) this.bindToVao.delete(vao);
        this._gl.disableVertexAttribArray(this.index);
        if (this._instanceDivisor != null) {
            this._gl.vertexAttribDivisor(this.index, 0);
        }
    }
}
