import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum, bufferOption } from "./Buffer";
import { VertexAttribute, IvertexAttribute, VertexAttEnum, IvertexAttributeOption } from "./VertexAttribute";
import { TypedArray } from "../core/TypedArray";

export interface IvertexData{
    bind:()=>void;
    unbind:()=>void;
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
        super({ ...options, bufferTarget: BufferTargetEnum.ARRAY_BUFFER });
        if(options.bufferFormat){
            this.attributes=options.bufferFormat.map(item=>new VertexAttribute(item))
        }

        this.bind=()=>{
            super.bind();
            if(this.attributes){
                this.attributes.forEach(item=>{
                    options.context.bindVertexAttribute_Buffer(item);
                })
            }
        }

        this.unbind=()=>{
            super.unbind();
            if(this.attributes){
                this.attributes.forEach(item=>{
                    options.context.unbindVertexAttribute_Buffer(item);
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
        attribute:IvertexAttribute;
    }){
        this.value=options.value;
        this.attribute=new VertexAttribute(options.attribute);

        this.bind=()=>{
            options.context.bindVertexAttribute_Value(this.attribute,this.value);
        }
    }

    bind(){}
    unbind(){}
}



