import { GraphicsDevice } from "./GraphicsDevice";
import { GlConstants } from "../render/GlConstant";
import { IglElement } from "../core/IglElement";

export type bufferOption =
    | {
          context: GraphicsDevice;
          target: BufferTargetEnum;
          typedArray: ArrayBufferView;
          usage: BufferUsageEnum;
      }
    | {
          context: GraphicsDevice;
          target: BufferTargetEnum;
          sizeInBytes: number;
          usage: BufferUsageEnum;
      };
export class Buffer implements IglElement {
    protected target: BufferTargetEnum;
    protected usage: BufferUsageEnum;
    protected typedArray: ArrayBufferView;
    protected sizeInBytes: number;
    protected _buffer: WebGLBuffer;
    private device: GraphicsDevice;
    private _gl:WebGLRenderingContext;
    protected constructor(options: bufferOption) {
        this.device = options.context;
        this.target = options.target;
        this.usage = options.usage;
        this.typedArray = (options as any).typedArray;
        this.sizeInBytes = (options as any).sizeInBytes;

        if (this.typedArray != null) {
            this.sizeInBytes = this.typedArray.byteLength;
        }

        let gl=options.context.gl;
        let bufferTarget=GlNumber.fromBufferTarget(this.target);
        let bufferUseage=GlNumber.fromBufferUseage(this.usage);
        let buffer = gl.createBuffer();
        gl.bindBuffer(bufferTarget, buffer);
        gl.bufferData(bufferTarget, this.typedArray??this.sizeInBytes as any, bufferUseage);
        gl.bindBuffer(bufferTarget, null);


        this.bind=()=>{
            gl.bindBuffer(bufferTarget,buffer);
        }
        this.unbind=()=>{
            gl.bindBuffer(bufferTarget,null);
        }

        this.destroy=()=>{
            gl.deleteBuffer(buffer);
        }
    }

    bind() {}
    unbind() {}

    destroy() {}
}


export enum BufferTargetEnum{
    ARRAY_BUFFER="ARRAY_BUFFER",
    ELEMENT_ARRAY_BUFFER="ARRAY_BUFFER"
}

export class GlNumber{
    static fromBufferTarget(target:BufferTargetEnum){
        return BufferConfig.bufferTargetToGLNumber[target];
    }

    static fromBufferUseage(useage:BufferUsageEnum){
        return BufferConfig.bufferUsageToGLNumber[useage];
    }
}
export enum BufferUsageEnum{
    STATIC_DRAW="STATIC_DRAW",
    DYNAMIC_DRAW="DYNAMIC_DRAW"
}


export class BufferConfig{
    static bufferUsageToGLNumber:{[useage:string]:number}={};
    static bufferTargetToGLNumber:{[useage:string]:number}={};
    static vertexAttributeSetter:{[size:number]:(index:number,value:any)=>any}={};
    static init(context:GraphicsDevice){
        this.bufferTargetToGLNumber[BufferTargetEnum.ARRAY_BUFFER]=GlConstants.ARRAY_BUFFER;
        this.bufferTargetToGLNumber[BufferTargetEnum.ELEMENT_ARRAY_BUFFER]=GlConstants.ELEMENT_ARRAY_BUFFER;

        this.bufferUsageToGLNumber[BufferUsageEnum.STATIC_DRAW]=GlConstants.STATIC_DRAW;
        this.bufferUsageToGLNumber[BufferUsageEnum.DYNAMIC_DRAW]=GlConstants.DYNAMIC_DRAW;

        this.vertexAttributeSetter[1]=(index,value)=>{
            context.gl.vertexAttrib1f(index,value)
        }
        this.vertexAttributeSetter[2]=(index,value)=>{
            context.gl.vertexAttrib2fv(index,value)
        }
        this.vertexAttributeSetter[3]=(index,value)=>{
            context.gl.vertexAttrib3fv(index,value)
        }
        this.vertexAttributeSetter[4]=(index,value)=>{
            context.gl.vertexAttrib4fv(index,value)
        }
    }
}
