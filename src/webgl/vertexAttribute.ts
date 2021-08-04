import { VertexBuffer } from "./vertexBuffer";
import { GraphicsDevice } from "./graphicsDevice";
import { ComponentDatatypeEnum } from "./componentDatatypeEnum";
import { VertexAttEnum } from "./vertexAttEnum";
import { VertexAttSetter } from "./vertexAttSetter";
import { GlType } from "../core/typedArray";

export interface IVertexAttribute {
    type: string | VertexAttEnum
    enabled: boolean;
    vertexBuffer: VertexBuffer;
    value: any;
    componentsPerAttribute: number;
    componentDatatype: number;
    normalize: boolean;
    offsetInBytes: number; 
    strideInBytes: number; 
    instanceDivisor: number;
}
export interface IVertexAttributeOption {
    type: string | VertexAttEnum
    enabled?: boolean;
    vertexBuffer?: VertexBuffer; 
    value?: any;
    componentsPerAttribute?: number; 
    componentDatatype?: number; 
    normalize?: boolean;
    offsetInBytes?: number;
    strideInBytes?: number; 
    instanceDivisor?: number;
}

export class VertexAttribute implements IVertexAttribute {
    readonly type: string | VertexAttEnum;
    readonly index: number;
    readonly enabled: boolean;
    readonly vertexBuffer: VertexBuffer;
    readonly value: any;
    readonly componentsPerAttribute: number;
    readonly componentDatatype: number;
    readonly normalize: boolean;
    readonly offsetInBytes: number;
    readonly strideInBytes: number;
    readonly instanceDivisor: number;

    readonly count: number;

    private _gl: WebGLRenderingContext;
    constructor(context: GraphicsDevice, options: IVertexAttributeOption) {
        // todo  check
        if (options.vertexBuffer == null && options.value == null) {
            throw new Error("attribute must have a vertexBuffer or a value.");
        }

        this._gl = context.gl;
        const att = options;
        this.type = att.type;
        this.index = VertexAttEnum.toShaderLocation(this.type);
        this.enabled = att.enabled ?? true;
        this.vertexBuffer = att.vertexBuffer;
        this.value = att.value;
        this.componentsPerAttribute = att.componentsPerAttribute ?? VertexAttEnum.toComponentSize(att.type);
        this.componentDatatype = att.componentDatatype ?? ComponentDatatypeEnum.FLOAT;
        this.normalize = att.normalize ?? false;
        this.offsetInBytes = att.offsetInBytes ?? 0;
        this.strideInBytes = att.strideInBytes ?? 0;
        this.instanceDivisor = att.instanceDivisor;

        if (this.vertexBuffer) {
            const bytes = this.vertexBuffer.sizeInBytes - this.offsetInBytes;
            if (this.strideInBytes == 0) {
                this.count = bytes / (this.componentsPerAttribute * GlType.bytesPerElement(this.componentDatatype));
            } else {
                this.count = bytes / this.strideInBytes;
            }
        }

        if (att.vertexBuffer) {
            this.bind = () => {
                att.vertexBuffer.bind();
                this._gl.enableVertexAttribArray(this.index);
                this._gl.vertexAttribPointer(
                    this.index,
                    this.componentsPerAttribute,
                    this.componentDatatype,
                    this.normalize,
                    this.strideInBytes,
                    this.offsetInBytes
                );
                if (this.instanceDivisor != null) {
                    this._gl.vertexAttribDivisor(this.index, att.instanceDivisor);
                }
            };
            this.unbind = () => {
                this._gl.disableVertexAttribArray(this.index);
                if (att.instanceDivisor != null) {
                    this._gl.vertexAttribDivisor(this.index, 0);
                }
            };
        } else {
            const bindFunc = VertexAttSetter.get(att.componentsPerAttribute);
            this.bind = () => {
                bindFunc(this.index, this.value);
            };
        }
    }

    bind() { }

    unbind() { }
}
