import { GraphicsDevice } from "./GraphicsDevice";
import { UniformTypeEnum } from "./UniformType";
import { VertexAttEnum } from "./VertexAttEnum";
import { Texture } from "./Texture";

/***
 * @example usage
 * let shader=new ShaderProgam({
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
export class ShaderProgram implements IshaderProgram {
    program: WebGLProgram;
    uniforms: { [name: string]: IuniformInfo; };
    // samples: { [name: string]: IuniformInfo };
    attributes: { [type: string]: IattributeInfo; };
    private static _cachedProgram: WebGLProgram;

    constructor(options: IshaderProgramOption) {
        const res = options.context.complileAndLinkShader(options);
        if (res) {
            this.program = res.shader;
            this.uniforms = res.uniforms;
            // this.samples = res.samples;
            this.attributes = res.attributes;

            // ---------------------初始化 uniforms缓存值 为null
            let type: UniformTypeEnum;
            for (const key in this.uniforms) {
                type = this.uniforms[key].type;
                if (type == UniformTypeEnum.FLOAT || type === UniformTypeEnum.INT || type === UniformTypeEnum.BOOL) {
                    this.uniforms[key].value = null;
                } else {
                    this.uniforms[key].value = [null, null, null, null];
                }
            }
        }

        const gl = options.context.gl;
        this.bind = () => {
            if (this.program != ShaderProgram._cachedProgram) {
                gl.useProgram(this.program);
                ShaderProgram._cachedProgram = this.program;
            }
        };
        this.unbind = () => {
            gl.useProgram(null);
            ShaderProgram._cachedProgram = null;
        };

        this.bindUniform = (name: string, value: any) => {
            // let _cahched = this._cachedUniform[name];
            // if (_cahched == null || _cahched != value.guid)
            // {
            //     this._cachedUniform[name] = value.guid;
            //     options.context.setUniform(this.uniforms[name], value);
            // }
            options.context.setUniform(this.uniforms[name], value);
        };
    }

    bindUniform(key: string, value: any) { }

    bindUniforms(device: GraphicsDevice, values: { [name: string]: any }) {
        let uniformInfo: IuniformInfo;
        for (const key in values) {
            uniformInfo = this.uniforms[key];
            if (uniformInfo == null) continue;
            uniformInfo?.setter(uniformInfo, values[key]);
        }
    }

    bind() { }
    unbind() { }

    destroy() { }
}

/**
 * shaderProgram 的uniform info
 */
export interface IuniformInfo {
    name: string;
    type: UniformTypeEnum;
    location: WebGLUniformLocation;
    beTexture: boolean;
    /**
     * uniform value 缓存，用于减少shader uniform state changes
     */
    value?: any;
    setter: (uniform: IuniformInfo, value: any) => void
}
/**
 * shderprogram的 attribute info
 */
export interface IattributeInfo {
    name: string;
    location: number;
    type: VertexAttEnum;
}
/**
 * shaderprogram
 */
export interface IshaderProgram {
    program: WebGLProgram;
    uniforms: { [name: string]: IuniformInfo };
    attributes: { [name: string]: IattributeInfo };
}

export interface IshaderProgramOption {
    context: GraphicsDevice;
    attributes: { [attName: string]: VertexAttEnum };
    vsStr: string;
    fsStr: string;
}
