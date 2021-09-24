import { GraphicsDevice } from "./graphicsDevice";
import { ComponentDatatypeEnum } from "./componentDatatypeEnum";
import { VertexAttEnum } from "./vertexAttEnum";
import { GlType, TypedArray } from "../core/typedArray";
import { Buffer, BufferTargetEnum, BufferUsageEnum } from "./buffer";

export interface IVertexAttribute {
    type: string | VertexAttEnum
    enabled: boolean;
    buffer: Buffer;
    componentSize: number;
    componentDatatype: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    instanceDivisor: number;
}
export interface IVertexAttributeOption {
    type: string | VertexAttEnum
    data?: Buffer | number | TypedArray;
    usage?: BufferUsageEnum;
    componentSize?: number;
    componentDatatype?: number;
    normalize?: boolean;
    bytesOffset?: number;
    bytesStride?: number;
    instanceDivisor?: number;
}

export class VertexAttribute implements IVertexAttribute {
    type: string | VertexAttEnum;
    index: number;
    enabled: boolean;
    buffer: Buffer;
    componentSize: number;
    componentDatatype: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    instanceDivisor: number;
    count: number;

    private _gl: WebGLRenderingContext;
    private _context: GraphicsDevice;
    constructor(context: GraphicsDevice, options: IVertexAttributeOption) {
        if (options.data == null) {
            throw new Error("vertex Attribute option's data must not be null")
        }

        this._context = context;
        this._gl = context.gl;
        this.type = options.type;
        this.index = VertexAttEnum.toShaderLocation(this.type);
        this.enabled = true;
        this.componentSize = options.componentSize ?? VertexAttEnum.toComponentSize(options.type);
        this.componentDatatype = options.componentDatatype ?? ComponentDatatypeEnum.FLOAT;
        this.normalize = options.normalize ?? false;
        this.bytesOffset = options.bytesOffset ?? 0;
        this.bytesStride = options.bytesStride ?? 0;
        this.instanceDivisor = options.instanceDivisor;
        if (options.data instanceof Buffer) {
            this.buffer = options.data;
        } else {
            this.buffer = new Buffer(context, { data: options.data, usage: options.usage, target: BufferTargetEnum.ARRAY_BUFFER })
        }

        const bytes = this.buffer.sizeInBytes - this.bytesOffset;
        if (this.bytesStride == 0) {
            this.count = bytes / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
        } else {
            this.count = bytes / this.bytesStride;
        }
        this.bind = () => {
            this.buffer.bind();
            this._gl.enableVertexAttribArray(this.index);
            this._gl.vertexAttribPointer(
                this.index,
                this.componentSize,
                this.componentDatatype,
                this.normalize,
                this.bytesStride,
                this.bytesOffset
            );
            if (this.instanceDivisor != null) {
                this._gl.vertexAttribDivisor(this.index, this.instanceDivisor);
            }
        };
        this.unbind = () => {
            this._gl.disableVertexAttribArray(this.index);
            if (this.instanceDivisor != null) {
                this._gl.vertexAttribDivisor(this.index, 0);
            }
        };
    }
    update(options: Partial<Omit<IVertexAttributeOption, "type" | "usage">>) {
        if (options.componentDatatype) this.componentDatatype = options.componentDatatype;
        if (options.componentSize) this.componentSize = options.componentSize;
        if (options.instanceDivisor) this.instanceDivisor = options.instanceDivisor;
        if (options.normalize) this.normalize = options.normalize;
        if (options.bytesOffset) this.bytesOffset = options.bytesOffset;
        if (options.bytesStride) this.bytesStride = options.bytesStride;
        if (options.data) {
            if (options.data instanceof Buffer) {
                this.buffer = options.data;
            } else {
                this.buffer = new Buffer(this._context, { data: options.data, usage: this.buffer.usage, target: BufferTargetEnum.ARRAY_BUFFER })
            }

            const bytes = this.buffer.sizeInBytes - this.bytesOffset;
            if (this.bytesStride == 0) {
                this.count = bytes / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
            } else {
                this.count = bytes / this.bytesStride;
            }
        }
        this.buffer.bind();
        this._gl.enableVertexAttribArray(this.index);
        this._gl.vertexAttribPointer(
            this.index,
            this.componentSize,
            this.componentDatatype,
            this.normalize,
            this.bytesStride,
            this.bytesOffset
        );
        if (this.instanceDivisor != null) {
            this._gl.vertexAttribDivisor(this.index, this.instanceDivisor);
        }
    }

    bind() { }

    unbind() { }
}
