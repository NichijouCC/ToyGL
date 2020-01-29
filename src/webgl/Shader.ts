import { IvertexAttribute } from "./VertextArray";
import { GraphicsDevice } from "./GraphicsDevice";
import { VertexAttEnum } from "../render/vertexAttType";

/**
 * shaderProgram 的uniform info
 */
export interface IuniformInfo {
    name: string;
    type:UniformTypeEnum;
    location: WebGLUniformLocation;
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

export interface IshaderOption{
    context:GraphicsDevice;
    attributes:{[attName:string]:VertexAttEnum};
    vsStr:string;
    fsStr:string;
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
    attributes: { [name: string]: IattributeInfo; };
    constructor(options:IshaderOption){
        let res= options.context.complileAndLinkShader(options);
        if(res){
            this.program=res.shader;
            this.uniforms=res.uniforms;
            this.attributes=res.attributes;
        }
    }
}

export enum UniformTypeEnum{
    FLOAT="FLOAT",
    FLOAT_VEC2="FLOAT_VEC2",
    FLOAT_VEC3="FLOAT_VEC3",
    FLOAT_VEC4="FLOAT_VEC4",
    INT="INT",
    BOOL="BOOL",
    INT_VEC2="INT_VEC2",
    BOOL_VEC2="BOOL_VEC2",
    INT_VEC3="INT_VEC3",
    BOOL_VEC3="BOOL_VEC3",
    INT_VEC4="INT_VEC4",
    BOOL_VEC4="BOOL_VEC4",
    FLOAT_MAT2="FLOAT_MAT2",
    FLOAT_MAT3="FLOAT_MAT3",
    FLOAT_MAT4="FLOAT_MAT4",
    FLOAT_ARRAY="FLOAT_ARRAY",
    BOOL_ARRAY="BOOL_ARRAY",
    INT_ARRAY="INT_ARRAY"
}