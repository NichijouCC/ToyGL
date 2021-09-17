import { VertexBuffer } from "./vertexBuffer";
import { GraphicsDevice } from "./graphicsDevice";
import { ComponentDatatypeEnum } from "./componentDatatypeEnum";
import { VertexAttEnum } from "./vertexAttEnum";
import { VertexAttSetter } from "./vertexAttSetter";
import { GlType } from "../core/typedArray";
import { Buffer } from "./buffer";

export interface IVertexAttribute {
    type: string | VertexAttEnum
    enabled: boolean;
    buffer: Buffer;
    value: any;
    componentSize: number;
    componentDatatype: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    instanceDivisor: number;
}
export interface IVertexAttributeOption {
    type: string | VertexAttEnum
    enabled?: boolean;
    buffer?: Buffer;
    value?: any;
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
    value: any;
    componentSize: number;
    componentDatatype: number;
    normalize: boolean;
    bytesOffset: number;
    bytesStride: number;
    instanceDivisor: number;

    count: number;

    private _gl: WebGLRenderingContext;
    constructor(context: GraphicsDevice, options: IVertexAttributeOption) {
        // todo  check
        if (options.buffer == null && options.value == null) {
            throw new Error("attribute must have a vertexBuffer or a value.");
        }

        this._gl = context.gl;
        const att = options;
        this.type = att.type;
        this.index = VertexAttEnum.toShaderLocation(this.type);
        this.enabled = att.enabled ?? true;
        this.buffer = att.buffer;
        this.value = att.value;
        this.componentSize = att.componentSize ?? VertexAttEnum.toComponentSize(att.type);
        this.componentDatatype = att.componentDatatype ?? ComponentDatatypeEnum.FLOAT;
        this.normalize = att.normalize ?? false;
        this.bytesOffset = att.bytesOffset ?? 0;
        this.bytesStride = att.bytesStride ?? 0;
        this.instanceDivisor = att.instanceDivisor;

        if (this.buffer) {
            const bytes = this.buffer.sizeInBytes - this.bytesOffset;
            if (this.bytesStride == 0) {
                this.count = bytes / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
            } else {
                this.count = bytes / this.bytesStride;
            }
        }

        if (this.buffer) {
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
                    this._gl.vertexAttribDivisor(this.index, att.instanceDivisor);
                }
            };
            this.unbind = () => {
                this._gl.disableVertexAttribArray(this.index);
                if (this.instanceDivisor != null) {
                    this._gl.vertexAttribDivisor(this.index, 0);
                }
            };
        } else {
            const bindFunc = VertexAttSetter.get(att.componentSize);
            this.bind = () => {
                bindFunc(this.index, this.value);
            };
        }
    }

    update(options: Partial<Omit<IVertexAttributeOption, "type">>) {
        if (options.componentDatatype) this.componentDatatype = options.componentDatatype;
        if (options.componentSize) this.componentSize = options.componentSize;
        if (options.enabled) this.enabled = options.enabled;
        if (options.instanceDivisor) this.instanceDivisor = options.instanceDivisor;
        if (options.normalize) this.normalize = options.normalize;
        if (options.bytesOffset) this.bytesOffset = options.bytesOffset;
        if (options.bytesStride) this.bytesStride = options.bytesStride;
        if (options.value) this.value = options.value;
        if (options.buffer) {
            this.buffer = options.buffer;
            const bytes = this.buffer.sizeInBytes - this.bytesOffset;
            if (this.bytesStride == 0) {
                this.count = bytes / (this.componentSize * GlType.bytesPerElement(this.componentDatatype));
            } else {
                this.count = bytes / this.bytesStride;
            }
        }
    }

    bind() { }

    unbind() { }
}
