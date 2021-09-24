import { GraphicsDevice } from "./graphicsDevice";
import { UniformTypeEnum } from "./uniformType";
import { VertexAttEnum } from "./vertexAttEnum";
import { Texture } from "./texture";
import { UniformSetter } from "./UniformSetter";

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

    constructor(context: GraphicsDevice, options: IShaderProgramOption) {
        const res = compileAndLinkShader(context.gl, options);
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

        const gl = context.gl;
        this.bind = () => {
            const beChanged = this.program != ShaderProgram._cachedProgram;
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
    }

    bindUniform(key: string, value: any) {
        this.uniforms[key].setter(this.uniforms[key], value);
    }

    bindUniforms(values: { [name: string]: any }) {
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
    attributes: { [attName: string]: VertexAttEnum };
    vsStr: string;
    fsStr: string;
}

/**
 * 创建shader
 * @param definition 
 */
function compileAndLinkShader(gl: WebGLRenderingContext, definition: Pick<IShaderProgramOption, "vsStr" | "fsStr" | "attributes">) {
    const vsShader = compileShaderSource(gl, definition.vsStr, true);
    const fsShader = compileShaderSource(gl, definition.fsStr, false);

    if (vsShader && fsShader) {
        const shader = gl.createProgram();
        gl.attachShader(shader, vsShader);
        gl.attachShader(shader, fsShader);
        gl.linkProgram(shader);
        const check = gl.getProgramParameter(shader, gl.LINK_STATUS);
        if (check == false) {
            const debugInfo = "ERROR: compile program Error! \n" + gl.getProgramInfoLog(shader);
            console.error(debugInfo);
            gl.deleteProgram(shader);
            return null;
        } else {
            const attributes = preSetAttributeLocation(gl, shader, definition.attributes);
            gl.linkProgram(shader);
            const uniformDic = getUniformsInfo(gl, shader);
            return { shader, attributes, uniforms: uniformDic };
        }
    }
}

function compileShaderSource(gl: WebGLRenderingContext, source: string, beVertex: boolean) {
    const target = beVertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    const item = gl.createShader(target);
    gl.shaderSource(item, source);
    gl.compileShader(item);
    const check = gl.getShaderParameter(item, gl.COMPILE_STATUS);
    if (check == false) {
        let debug = beVertex ? "ERROR: compile  VS Shader Error! VS:" : "ERROR: compile FS Shader Error! FS:";
        debug = debug + name + ".\n";
        console.error(debug + gl.getShaderInfoLog(item));
        gl.deleteShader(item);
    } else {
        return item;
    }
}

function preSetAttributeLocation(gl: WebGLRenderingContext, program: WebGLProgram, attInfo: { [attName: string]: VertexAttEnum }): { [attName: string]: IAttributeInfo } {
    const attDic: { [attName: string]: IAttributeInfo } = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
        const attribInfo = gl.getActiveAttrib(program, i);
        if (!attribInfo) break;
        const attName = attribInfo.name;
        const type = attInfo[attName] ?? VertexAttEnum.fromShaderAttName(attName);
        if (type == null) {
            console.error(`cannot get Vertex Attribute type from shader definition or deduced from shader attName! Info: attName In shader [${attName}]`);
        } else {
            const location = VertexAttEnum.toShaderLocation(type);
            gl.bindAttribLocation(program, location, attName);
            attDic[type] = { name: attName, type, location: location };
        }
    }
    return attDic;
}

function getUniformsInfo(gl: WebGLRenderingContext, program: WebGLProgram) {
    const uniformDic: { [name: string]: IUniformInfo } = {};

    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
        const uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) break;

        let name = uniformInfo.name;
        const type = uniformInfo.type;
        const location = gl.getUniformLocation(program, name);

        let beArray = false;
        // remove the array suffix.
        if (name.substr(-3) === "[0]") {
            beArray = true;
            name = name.substr(0, name.length - 3);
        }
        if (location == null) continue;

        const uniformType = UniformTypeEnum.fromGlType(type, beArray);

        const newUniformElement: IUniformInfo = {
            name: name,
            location: location,
            type: uniformType
        } as any;
        uniformDic[name] = newUniformElement;

        if (uniformType == UniformTypeEnum.SAMPLER_2D || uniformType == UniformTypeEnum.SAMPLER_CUBE) {
            newUniformElement.beTexture = true;
        }
        uniformDic[name] = newUniformElement;
        newUniformElement.beTexture = false;
        newUniformElement.setter = UniformSetter.get(uniformType);
        if (newUniformElement.setter == null) {
            console.error("cannot find uniform setter!");
        }
    }
    return uniformDic;
}
