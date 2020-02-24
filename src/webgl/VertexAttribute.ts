import { VertexBuffer } from "./VertexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { ComponentDatatypeEnum } from "./ComponentDatatypeEnum";
import { VertexAttEnum } from "./VertexAttEnum";
import { BufferConfig } from "./Buffer";

export interface IvertexAttribute
{
    // index: number; // 0;
    type: string | VertexAttEnum
    enabled: boolean; // true;
    vertexBuffer: VertexBuffer; // positionBuffer;
    value: any;
    componentsPerAttribute: number; // 3;
    componentDatatype: number; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}
export interface IvertexAttributeOption
{
    // index?: number; // 0;
    type: string | VertexAttEnum
    enabled?: boolean; // true;
    vertexBuffer?: VertexBuffer; // positionBuffer;
    value?: any;
    componentsPerAttribute: number; // 3;
    componentDatatype?: number; // ComponentDatatype.FLOAT;
    normalize?: boolean; // false;
    offsetInBytes?: number; // 0;
    strideInBytes?: number; // 0; // tightly packed
    instanceDivisor?: number; // 0; // not instanced
}

export class VertexAttribute implements IvertexAttribute
{
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
    constructor(context: GraphicsDevice, options: IvertexAttributeOption)
    {

        //todo  check 
        if (options.vertexBuffer == null && options.value == null)
        {
            throw new Error('attribute must have a vertexBuffer or a value.');
        }

        this._gl = context.gl;
        let att = options;
        this.type = att.type;
        this.index = VertexAttEnum.toShaderLocation(this.type);
        this.enabled = att.enabled ?? true;// true;
        this.vertexBuffer = att.vertexBuffer;// positionBuffer;
        this.value = att.value;
        this.componentsPerAttribute = att.componentsPerAttribute;// 3;
        this.componentDatatype = att.componentsPerAttribute ?? ComponentDatatypeEnum.FLOAT; // ComponentDatatype.FLOAT;
        this.normalize = att.normalize ?? false; // false;
        this.offsetInBytes = att.offsetInBytes ?? 0; // 0;
        this.strideInBytes = att.strideInBytes ?? 0; // 0; // tightly packed
        this.instanceDivisor = att.instanceDivisor ?? 0; // 0; // not instanced

        if (this.vertexBuffer)
        {
            let bytes = this.vertexBuffer.sizeInbytes - this.offsetInBytes;
            if (this.strideInBytes == 0)
            {
                this.count = bytes / (this.componentsPerAttribute * ComponentDatatypeEnum.byteSize(this.componentDatatype))
            } else
            {
                this.count = bytes / this.strideInBytes;
            }
        }

        if (att.vertexBuffer)
        {
            this.bind = () =>
            {
                att.vertexBuffer.bind();
                this._gl.enableVertexAttribArray(this.index);
                this._gl.vertexAttribPointer(
                    this.index,
                    this.componentsPerAttribute,
                    this.componentDatatype,
                    this.normalize,
                    this.strideInBytes,
                    this.offsetInBytes,
                );
                if (this.instanceDivisor !== undefined)
                {
                    this._gl.vertexAttribDivisor(this.index, att.instanceDivisor);
                }
            }
            this.unbind = () =>
            {
                this._gl.disableVertexAttribArray(this.index);
                if (att.instanceDivisor !== undefined)
                {
                    this._gl.vertexAttribDivisor(this.index, 0);
                }
            }

        } else
        {
            let bindFunc = BufferConfig.vertexAttributeSetter[att.componentsPerAttribute];
            this.bind = () =>
            {
                bindFunc(this.index, this.value);
            }
        }
    }

    bind() { }

    unbind() { }
}


