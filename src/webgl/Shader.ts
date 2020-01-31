import { GraphicsDevice } from "./GraphicsDevice";
import { RenderLayerEnum } from "../core/RenderLayer";
import { UniformTypeEnum } from "./UniformType";
import { VertexAttEnum } from "./VertexAttribute";

/**
 * shaderProgram 的uniform info
 */
export interface IuniformInfo {
    name: string;
    type:UniformTypeEnum;
    location: WebGLUniformLocation;
    /**
     * uniform value 缓存，用于减少shader uniform state changes
     */
    value?:any;
}
/**
 * shderprogram的 attribute info
 */
export interface IattributeInfo {
    name: string;
    location: number;
}
/**
 * shaderprogram
 */
export interface Ishader {
    program: WebGLProgram;
    uniforms: { [name: string]: IuniformInfo };
    attributes: { [name: string]: IattributeInfo };
}

/***
 * @example usage
 * let shader=new Shader({
 *    context:context,
 *    attributes:{
 *      "apos":VertexAttEnum.POSITION 
 *      },
 *    vsStr:`
 *          attribute vec4 apos;
 *          void main()
 *          {
 *              gl_Position =vec4(apos.xyz,1.0);
 *          }
 *      `,
 *     fsStr:`
 *          void main()
 *          {
 *                  gl_FragData[0] =vec4(1.0);
 *          }
 *      `,
 * });
 */
export class Shader implements Ishader{
    program: WebGLProgram;    
    uniforms: { [name: string]: IuniformInfo; };
    samples:{[name:string]:any};
    attributes: { [name: string]: IattributeInfo; };
    /**
     * uniform value guid 缓存，用于更新修改的uniform
     */
    private _cachedUniform:{[name: string]:number}={};
    constructor(options:IshaderOption){
        let res= options.context.complileAndLinkShader(options);
        if(res){
            this.program=res.shader;
            this.uniforms=res.uniforms;
            this.samples=res.samples;
            this.attributes=res.attributes;

            //---------------------初始化 uniforms缓存值 为null
            let type:UniformTypeEnum;
            for(let key in this.uniforms){
                type=this.uniforms[key].type;
                if(type==UniformTypeEnum.FLOAT||type===UniformTypeEnum.INT||type===UniformTypeEnum.BOOL){
                    this.uniforms[key].value=null;
                }else{
                    this.uniforms[key].value=[null,null,null,null]
                }
            }
        }

        this.bind=()=>{
            options.context.bindShader(this.program);
        }
        this.unbind=()=>{
            options.context.bindShader(null);
        }

        this.setUniform = (name:string,value:VersionData)=>{
            let _cahched= this._cachedUniform[name];
            if(_cahched==null||_cahched!=value.guid){
                this._cachedUniform[name]=value.guid;
                options.context.setUniform(this.uniforms[name],value);
            }
        }
    }

    setUniform(key:string,value:VersionData){}

    bind(){}
    unbind(){}
}


export interface IshaderOption{
    context:GraphicsDevice;
    attributes:{[attName:string]:VertexAttEnum};
    vsStr:string;
    fsStr:string;
}

let guid=0;
export class VersionData{
    private _guid:number;
    private _value:any;
    constructor(value:any){
        this._guid=guid++;
        this.value=value;
    }

    set value(value:any){
        this._value=value;
        this._guid=guid++;
    }
    get value(){
        return this._value;
    }

    get guid(){
        return this._guid;
    }
}