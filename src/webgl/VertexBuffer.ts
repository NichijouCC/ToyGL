import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum, bufferOption, BufferConfig } from "./Buffer";
import { VertexAttribute, IvertexAttribute, IvertexAttributeOption } from "./VertexAttribute";
import { VertexAttEnum } from "./VertexAttEnum";
import { TypedArray } from "../core/TypedArray";

export interface IvertexData{
    bind:()=>void;
    unbind:()=>void;
    destroy:()=>void;
}

export type VertexBufferOption =    | {
    context: GraphicsDevice;
    typedArray: ArrayBufferView;
    usage: BufferUsageEnum;
    bufferFormat?: IvertexAttributeOption[];
}
| {
    context: GraphicsDevice;
    sizeInBytes: number;
    usage: BufferUsageEnum;
    bufferFormat?: IvertexAttributeOption[];
};


export class VertexBuffer extends Buffer implements IvertexData
{
    attributes:VertexAttribute[];
    constructor(options: VertexBufferOption)
    {
        super({ ...options, target: BufferTargetEnum.ARRAY_BUFFER });
        if(options.bufferFormat){
            this.attributes=options.bufferFormat.map(item=>new VertexAttribute(item))
        }
        let gl=options.context.gl;
        this.bind=()=>{
            super.bind();
            if(this.attributes){
                this.attributes.forEach(att=>{

                    gl.enableVertexAttribArray(att.index);
                    gl.vertexAttribPointer(
                        att.index,
                        att.componentsPerAttribute,
                        att.componentDatatype,
                        att.normalize,
                        att.strideInBytes,
                        att.offsetInBytes,
                    );
                    if (att.instanceDivisor !== undefined) {
                        gl.vertexAttribDivisor(att.index, att.instanceDivisor);
                    }
                })
            }
        }

        this.unbind=()=>{
            super.unbind();
            if(this.attributes){
                this.attributes.forEach(att=>{

                    gl.disableVertexAttribArray(att.index);
                    if (att.instanceDivisor !== undefined) {
                        gl.vertexAttribDivisor(att.index, 0);
                    }
                })
            }
        }
    }

    bind(){}
    unbind(){}
}

export class VertexValue implements IvertexData{
    value:[]|TypedArray;
    attribute:VertexAttribute;
    constructor(options:{
        context:GraphicsDevice;
        value:[]|TypedArray;
        attribute:IvertexAttributeOption;
    }){
        this.value=options.value;
        this.attribute=new VertexAttribute(options.attribute);

        this.bind=()=>{
            BufferConfig.vertexAttributeSetter[this.attribute.componentsPerAttribute](this.attribute.index,this.value)
        }
    }

    bind(){}
    unbind(){}
    destroy(){}
}



