import { GraphicsDevice } from "./graphicsDevice";
import { UniformTypeEnum } from "./uniformType";
import { VertexAttEnum } from "./vertexAttEnum";
import { Texture } from "./texture";

/***
 * @example usage
 * let shader=new ShaderProgram({
 *    context:context,
 *    attributes:{
 *      "aPos":VertexAttEnum.POSITION 
 *      },
 *    vsStr:`
 *          attribute vec4 aPos;
 *          void main()
 *          {
 *              gl_Position =vec4(aPos.xyz,1.0);
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
export class ShaderProgram implements IShaderProgram {
    program: WebGLProgram;
    uniforms: { [name: string]: IUniformInfo; };
    attributes: { [type: string]: IAttributeInfo; };
    private static _cachedProgram: WebGLProgram;

    constructor(options: IShaderProgramOption) {
        const res = options.context.compileAndLinkShader(options);
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
            let beChanged = this.program != ShaderProgram._cachedProgram;
            if (beChanged) {
                gl.useProgram(this.program);
                ShaderProgram._cachedProgram = this.program;
            }
            return beChanged;
        };
        this.unbind = () => {
            gl.useProgram(null);
            ShaderProgram._cachedProgram = null;
        };

        this.bindUniform = (name: string, value: any) => {
            options.context.setUniform(this.uniforms[name], value);
        };
    }

    bindUniform(key: string, value: any) { }

    bindUniforms(device: GraphicsDevice, values: { [name: string]: any }) {
        let uniformInfo: IUniformInfo;
        for (const key in values) {
            uniformInfo = this.uniforms[key];
            if (uniformInfo == null) continue;
            uniformInfo?.setter(uniformInfo, values[key]);
        }
    }

    bind(): boolean { return true; }
    unbind() { }

    destroy() { }
}

/**
 * shaderProgram 的uniform info
 */
export interface IUniformInfo {
    name: string;
    type: UniformTypeEnum;
    location: WebGLUniformLocation;
    beTexture: boolean;
    /**
     * uniform value 缓存，用于减少shader uniform state changes
     */
    value?: any;
    setter: (uniform: IUniformInfo, value: any) => void
}
/**
 * shaderProgram的 attribute info
 */
export interface IAttributeInfo {
    name: string;
    location: number;
    type: VertexAttEnum;
}
/**
 * shaderProgram
 */
export interface IShaderProgram {
    program: WebGLProgram;
    uniforms: { [name: string]: IUniformInfo };
    attributes: { [name: string]: IAttributeInfo };
}

export interface IShaderProgramOption {
    context: GraphicsDevice;
    attributes: { [attName: string]: VertexAttEnum };
    vsStr: string;
    fsStr: string;
}
