
import { DeviceCapability } from "./deviceCapability";
import { IattributeInfo, IuniformInfo, IshaderProgramOption } from "./shaderProgam";
import { UniformTypeEnum } from "./uniformType";
import { BufferTargetEnum, BufferUsageEnum, BufferConfig } from "./buffer";
import { DeviceLimit } from "./deviceLimit";
import { DepthFuncEnum, BlendEquationEnum, BlendParamEnum } from "../scene/renderState";
import { VertexArray } from "./vertextArray";
import { VertexAttEnum } from "./vertexAttEnum";

export interface IengineOption {
    disableWebgl2?: boolean;
}

export class GraphicsDevice {
    gl: WebGLRenderingContext;
    readonly webGLVersion: number;
    readonly caps: DeviceCapability;
    readonly limit: DeviceLimit;

    readonly uniformSetter: { [uniformType: string]: (uniform: any, value: any) => void } = {};
    readonly uniformSamplerSetter: { [uniformType: string]: (uniform: any, value: any, unit: number) => void } = {};
    readonly bufferUsageToGLNumber: { [useage: string]: number } = {};
    readonly bufferTargetToGLNumber: { [useage: string]: number } = {};
    readonly vertexAttributeSetter: { [size: number]: (index: number, value: any) => any } = {};

    bindingVao: WebGLVertexArrayObject = null;
    // beCreatingVao = false;
    get width() { return this.gl.drawingBufferWidth; };
    get height() { return this.gl.drawingBufferHeight; };
    constructor(canvasOrContext: HTMLCanvasElement | WebGLRenderingContext, option?: IengineOption) {
        if (canvasOrContext == null) return;
        option = option || {};
        let gl: WebGLRenderingContext;
        if (canvasOrContext instanceof HTMLCanvasElement) {
            if (!option.disableWebgl2) {
                try {
                    gl = canvasOrContext.getContext("webgl2", option) as any;
                } catch (e) { }
            }
            if (!gl) {
                try {
                    gl = canvasOrContext.getContext("webgl", option) as any;
                } catch (e) { }
            }
            if (!gl) {
                throw new Error("webgl not supported");
            }
            canvasOrContext.addEventListener("webglcontextlost", this.handleContextLost, false);
        } else {
            gl = canvasOrContext;
        }
        if (gl.renderbufferStorageMultisample) {
            this.webGLVersion = 2.0;
        }
        this.gl = gl;
        this.caps = new DeviceCapability(this);
        this.limit = new DeviceLimit(this);

        // -------------config init
        BufferConfig.init(this);

        // ------------------------uniform 
        var scopeX, scopeY, scopeZ, scopeW;
        var uniformValue;
        this.uniformSetter[UniformTypeEnum.BOOL] = (uniform: IuniformInfo, value) => {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.location, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.INT] = this.uniformSetter[UniformTypeEnum.BOOL];
        this.uniformSetter[UniformTypeEnum.FLOAT] = (uniform: IuniformInfo, value) => {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.location, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC2] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC3] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC4] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformSetter[UniformTypeEnum.INT_VEC2] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC2] = this.uniformSetter[UniformTypeEnum.INT_VEC2];
        this.uniformSetter[UniformTypeEnum.INT_VEC3] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC3] = this.uniformSetter[UniformTypeEnum.INT_VEC3];
        this.uniformSetter[UniformTypeEnum.INT_VEC4] = (uniform: IuniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC4] = this.uniformSetter[UniformTypeEnum.INT_VEC4];
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT2] = (uniform: IuniformInfo, value) => {
            gl.uniformMatrix2fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT2_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT2];

        this.uniformSetter[UniformTypeEnum.FLOAT_MAT3] = (uniform: IuniformInfo, value) => {
            gl.uniformMatrix3fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT3_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT3];

        this.uniformSetter[UniformTypeEnum.FLOAT_MAT4] = (uniform: IuniformInfo, value) => {
            gl.uniformMatrix4fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT4_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT4];

        this.uniformSetter[UniformTypeEnum.FLOAT_ARRAY] = (uniform: IuniformInfo, value) => {
            gl.uniform1fv(uniform.location, value);
        };
        this.uniformSamplerSetter[UniformTypeEnum.SAMPLER_2D] = (uniform: IuniformInfo, value, unit: number) => {
            value.bind(this, unit);
            gl.uniform1i(uniform.location, unit);
        };

        // ------------------buffer
        this.bufferTargetToGLNumber[BufferTargetEnum.ARRAY_BUFFER] = gl.ARRAY_BUFFER;
        this.bufferTargetToGLNumber[BufferTargetEnum.ELEMENT_ARRAY_BUFFER] = gl.ELEMENT_ARRAY_BUFFER;

        this.bufferUsageToGLNumber[BufferUsageEnum.STATIC_DRAW] = gl.STATIC_DRAW;
        this.bufferUsageToGLNumber[BufferUsageEnum.DYNAMIC_DRAW] = gl.DYNAMIC_DRAW;

        // ------------------attribute
        this.vertexAttributeSetter[1] = (index, value) => {
            this.gl.vertexAttrib1f(index, value);
        };
        this.vertexAttributeSetter[2] = (index, value) => {
            this.gl.vertexAttrib2fv(index, value);
        };
        this.vertexAttributeSetter[3] = (index, value) => {
            this.gl.vertexAttrib3fv(index, value);
        };
        this.vertexAttributeSetter[4] = (index, value) => {
            this.gl.vertexAttrib4fv(index, value);
        };
    }

    handleContextLost = () => {
        throw new Error("Method not implemented.");
    }

    // --------------------------------------uniform
    private getUniformTypeFromGLtype(gltype: number, beArray?: boolean) {
        const gl = this.gl;
        const type = UniformTypeEnum.fromGlType(gltype, beArray);
        if (type == null) {
            console.error("unhandle uniform GLtype:", gltype);
        }
        return type;
    }

    /**
     * 创建shader
     * @param definition 
     */
    complileAndLinkShader(definition: IshaderProgramOption) {
        const gl = this.gl;
        const vsshader = this.compileShaderSource(gl, definition.vsStr, true);
        const fsshader = this.compileShaderSource(gl, definition.fsStr, false);

        if (vsshader && fsshader) {
            const shader = gl.createProgram();
            gl.attachShader(shader, vsshader);
            gl.attachShader(shader, fsshader);
            gl.linkProgram(shader);
            const check = gl.getProgramParameter(shader, gl.LINK_STATUS);
            if (check == false) {
                const debguInfo = "ERROR: compile program Error! \n" + gl.getProgramInfoLog(shader);
                console.error(debguInfo);
                gl.deleteProgram(shader);
                return null;
            } else {
                const attributes = this.preSetAttributeLocation(gl, shader, definition.attributes);
                gl.linkProgram(shader);
                const uniformDic = this.getUniformsInfo(gl, shader);
                // TODO :SMAPLES
                const samples = {};
                return { shader, attributes, uniforms: uniformDic };
            }
        }
    }

    setUniform(uniform: IuniformInfo, value: any) {
        this.uniformSetter[uniform.type](uniform, value);
    }

    private compileShaderSource(gl: WebGLRenderingContext, source: string, beVertex: boolean) {
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

    private preSetAttributeLocation(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        attInfo: { [attName: string]: VertexAttEnum }
    ): { [attName: string]: IattributeInfo } {
        const attdic: { [attName: string]: IattributeInfo } = {};
        const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttribs; i++) {
            const attribInfo = gl.getActiveAttrib(program, i);
            if (!attribInfo) break;
            const attName = attribInfo.name;
            const type = attInfo[attName] ?? VertexAttEnum.fromShaderAttName(attName);
            if (type == null) {
                console.error(`cannot get Vertex Attribute type from shader defination or deduced from shader attname! Info: attname In shader [${attName}]`);
            } else {
                const location = VertexAttEnum.toShaderLocation(type);
                gl.bindAttribLocation(program, location, attName);
                // let attlocation = gl.getAttribLocation(program, attName);
                attdic[type] = { name: attName, type, location: location };
            }
        }
        return attdic;
    }

    private getUniformsInfo(gl: WebGLRenderingContext, program: WebGLProgram) {
        const uniformDic: { [name: string]: IuniformInfo } = {};
        // let sampleDic: { [name: string]: IuniformInfo } = {};

        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        const sampleArr: IuniformInfo[] = [];
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

            const uniformtype = this.getUniformTypeFromGLtype(type, beArray);
            const newUniformElemt: IuniformInfo = {
                name: name,
                location: location,
                type: uniformtype
            } as any;
            uniformDic[name] = newUniformElemt;

            if (uniformtype == UniformTypeEnum.SAMPLER_2D || uniformtype == UniformTypeEnum.SAMPLER_CUBE) {
                newUniformElemt.beTexture = true;
                sampleArr.push(newUniformElemt);
            } else {
                uniformDic[name] = newUniformElemt;
                newUniformElemt.beTexture = false;
                newUniformElemt.setter = this.uniformSetter[uniformtype];
                if (newUniformElemt.setter == null) {
                    console.error("cannot find uniform setter!");
                }
            }
        }

        sampleArr.forEach((item, index) => {
            item.setter = (info: IuniformInfo, value: any) => { this.uniformSamplerSetter[item.type](info, value, index); };
        });
        return uniformDic;
    }

    // -----------------------------gl state
    private _cachedClearDepth: number;
    private _cachedclearColor: Float32Array = new Float32Array(4);
    setClear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
        let cleartag = 0;
        if (clearDepth != null) {
            if (clearDepth != this._cachedClearDepth) {
                this._cachedClearDepth = clearDepth;
                this.gl.clearDepth(clearDepth);
            }
            cleartag |= this.gl.DEPTH_BUFFER_BIT;
        }
        if (clearColor != null) {
            if (this._cachedclearColor[0] != clearColor[0] || this._cachedclearColor[1] != clearColor[1] || this._cachedclearColor[2] != clearColor[2] || this._cachedclearColor[3] != clearColor[3]) {
                this._cachedclearColor[0] = clearColor[0];
                this._cachedclearColor[1] = clearColor[1];
                this._cachedclearColor[2] = clearColor[2];
                this._cachedclearColor[3] = clearColor[3];
                this.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
            }

            cleartag |= this.gl.COLOR_BUFFER_BIT;
        }
        if (clearStencil != null) {
            this.gl.clearStencil(0);
            cleartag |= this.gl.STENCIL_BUFFER_BIT;
        }
        if (cleartag != 0) {
            this.gl.clear(cleartag);
        }
    }

    private _cachedViewPortX: number;
    private _cachedViewPortY: number;
    private _cachedViewPortWidth: number;
    private _cachedViewPortHeight: number;
    setViewPort(x: number, y: number, width: number, height: number, force = false) {
        if (
            force ||
            x != this._cachedViewPortX ||
            y != this._cachedViewPortY ||
            width != this._cachedViewPortWidth ||
            height != this._cachedViewPortHeight
        ) {
            this.gl.viewport(x, y, width, height);
            this._cachedViewPortX = x;
            this._cachedViewPortY = y;
            this._cachedViewPortWidth = width;
            this._cachedViewPortHeight = height;
        }
    }

    private _cacheColorMaskR: boolean;
    private _cacheColorMaskG: boolean;
    private _cacheColorMaskB: boolean;
    private _cacheColorMaskA: boolean;
    setColorMask(maskR: boolean, maskG: boolean, maskB: boolean, maskA: boolean, force = false) {
        if (
            force ||
            this._cacheColorMaskR != maskR ||
            this._cacheColorMaskG != maskG ||
            this._cacheColorMaskB != maskB ||
            this._cacheColorMaskA != maskA
        ) {
            this.gl.colorMask(maskR, maskG, maskB, maskA);
            this._cacheColorMaskR = maskR;
            this._cacheColorMaskG = maskG;
            this._cacheColorMaskB = maskB;
            this._cacheColorMaskA = maskA;
        }
    }

    _cachedEnableCullFace: boolean;
    _cachedCullFace: boolean;
    setCullFaceState(enableCullFace: boolean = true, cullBack: boolean = true, force = false) {
        if (force || this._cachedEnableCullFace != enableCullFace) {
            this._cachedEnableCullFace = enableCullFace;
            if (enableCullFace) {
                this.gl.enable(this.gl.CULL_FACE);
                if (force || this._cachedCullFace != cullBack) {
                    this._cachedCullFace = cullBack;
                    this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
                }
            } else {
                this.gl.disable(this.gl.CULL_FACE);
            }
        } else {
            if (force || this._cachedCullFace != cullBack) {
                this._cachedCullFace = cullBack;

                this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
            }
        }
    }

    private _cachedDepthWrite: boolean;
    private _cachedDepthTest: boolean;
    private _cachedDepthFunction: number;
    setDepthState(depthWrite: boolean = true, depthTest: boolean = true, depthFunc: number, force = false) {
        if (force || this._cachedDepthWrite != depthWrite) {
            this._cachedDepthWrite = depthWrite;
            this.gl.depthMask(depthWrite);
        }
        if (force || this._cachedDepthTest != depthTest) {
            this._cachedDepthTest = depthTest;
            if (depthTest) {
                this.gl.enable(this.gl.DEPTH_TEST);
                if (depthFunc != null && this._cachedDepthFunction != depthFunc) {
                    this._cachedDepthFunction = depthFunc;
                    this.gl.depthFunc(depthFunc);
                }
            } else {
                this.gl.disable(this.gl.DEPTH_TEST);
            }
        }
    }

    private _cachedEnableBlend: boolean;
    private _cachedBlendEquation: number;
    private _cachedBlendFuncSrc: number;
    private _cachedBlendFuncDst: number;

    private enableSeparateBlend: boolean = false;
    private _cachedBlendEquationAlpha: number;
    private _cachedBlendFuncSrc_a: number;
    private _cachedBlendFuncDst_a: number;

    setBlendState(
        enabled: boolean,
        blendEquation: BlendEquationEnum,
        blendSrc: BlendParamEnum,
        blendDst: BlendParamEnum,

        enableSeparateBlend: boolean,
        blendAlphaEquation: BlendEquationEnum,
        blendSrcAlpha: BlendParamEnum,
        blendDstAlpha: BlendParamEnum,
        force = false
    ) {
        if (force || this._cachedEnableBlend != enabled) {
            this._cachedEnableBlend = enabled;
            if (enabled) {
                this.gl.enable(this.gl.BLEND);

                if (enableSeparateBlend) {
                    this.enableSeparateBlend = true;
                    if (force || this._cachedBlendEquation != blendEquation || this._cachedBlendEquationAlpha != blendAlphaEquation) {
                        this._cachedBlendEquation = blendEquation;
                        this._cachedBlendEquationAlpha = blendAlphaEquation;
                        this.gl.blendEquationSeparate(blendEquation, blendAlphaEquation);
                    }
                    if (force || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst || this._cachedBlendFuncSrc_a != blendSrcAlpha || this._cachedBlendFuncDst_a != blendDstAlpha) {
                        this._cachedBlendFuncSrc = blendSrc;
                        this._cachedBlendFuncDst = blendDst;
                        this._cachedBlendFuncSrc_a = blendSrcAlpha;
                        this._cachedBlendFuncDst_a = blendDstAlpha;
                        this.gl.blendFuncSeparate(blendSrc, blendDst, blendSrcAlpha, blendDstAlpha);
                    }
                } else {
                    if (force || this.enableSeparateBlend || this._cachedBlendEquation != blendEquation) {
                        this._cachedBlendEquation = blendEquation;
                        this.gl.blendEquation(blendEquation);
                    }
                    if (force || this.enableSeparateBlend || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst) {
                        this._cachedBlendFuncSrc = blendSrc;
                        this._cachedBlendFuncDst = blendDst;
                        this.gl.blendFunc(blendSrc, blendDst);
                    }
                    this.enableSeparateBlend = false;
                }
            } else {
                this.gl.disable(this.gl.BLEND);
            }
        }
    }

    private _cachedEnableStencilTest: boolean;
    private _cachedStencilFunc: number;
    private _cachedStencilRefValue: number;
    private _cachedStencilMask: number;
    private _cachedStencilFail: number;
    private _cachedStencilPassZfail: number;
    private _cachedStencilFaileZpass: number;

    private enableSeparateStencil: boolean = false;
    private _cachedStencilFuncBack: number;
    private _cachedstencilRefValueBack: number;
    private _cachedStencilMaskBack: number;
    private _cachedStencilFailBack: number;
    private _cachedStencilPassZfailBack: number;
    private _cachedStencilFaileZpassBack: number;

    setStencilState(
        enableStencilTest: boolean = false,
        stencilFunction: number = this.gl.ALWAYS,
        stencilRefValue: number = 1,
        stencilMask: number = 0xff,
        stencilFail: number = this.gl.KEEP,
        stencilFaileZpass: number = this.gl.KEEP,
        stencilPassZfail: number = this.gl.REPLACE,

        enableSeparateStencil: boolean = false,
        stencilFunctionBack: number = this.gl.ALWAYS,
        stencilRefValueBack: number = 1,
        stencilMaskBack: number = 0xff,
        stencilFailBack: number = this.gl.KEEP,
        stencilFaileZpassBack: number = this.gl.KEEP,
        stencilPassZfailBack: number = this.gl.REPLACE
    ) {
        if (this._cachedEnableStencilTest != enableStencilTest) {
            this._cachedEnableStencilTest = enableStencilTest;
            if (enableStencilTest) {
                this.gl.enable(this.gl.STENCIL_TEST);
                if (enableSeparateStencil) {
                    this.enableSeparateStencil = true;

                    if (this._cachedStencilFunc != stencilFunction ||
                        this._cachedStencilRefValue != stencilRefValue ||
                        this._cachedStencilMask != stencilMask
                    ) {
                        this._cachedStencilFunc = stencilFunction;
                        this._cachedStencilRefValue = stencilRefValue;
                        this._cachedStencilMask = stencilMask;
                        this.gl.stencilFuncSeparate(this.gl.FRONT, stencilFunction, stencilRefValue, stencilMask);
                    }

                    if (this._cachedStencilFuncBack != stencilFunctionBack ||
                        this._cachedstencilRefValueBack != stencilRefValueBack ||
                        this._cachedStencilMaskBack != stencilMaskBack) {
                        this._cachedStencilFuncBack = stencilFunctionBack;
                        this._cachedstencilRefValueBack = stencilRefValueBack;
                        this._cachedStencilMaskBack = stencilMaskBack;
                        this.gl.stencilFuncSeparate(this.gl.BACK, stencilFunctionBack, stencilRefValueBack, stencilMaskBack);
                    }

                    if (this._cachedStencilFail != stencilFail ||
                        this._cachedStencilPassZfail != stencilPassZfail ||
                        this._cachedStencilFaileZpass != stencilFaileZpass) {
                        this._cachedStencilFail = stencilFail;
                        this._cachedStencilPassZfail = stencilPassZfail;
                        this._cachedStencilFaileZpass = stencilFaileZpass;
                        this.gl.stencilOpSeparate(this.gl.FRONT, stencilFail, stencilPassZfail, stencilFaileZpass);
                    }

                    if (this._cachedStencilFailBack != stencilFailBack ||
                        this._cachedStencilPassZfailBack != stencilPassZfailBack ||
                        this._cachedStencilFaileZpassBack != stencilFaileZpassBack) {
                        this._cachedStencilFailBack = stencilFailBack;
                        this._cachedStencilPassZfailBack = stencilPassZfailBack;
                        this._cachedStencilFaileZpassBack = stencilFaileZpassBack;
                        this.gl.stencilOpSeparate(this.gl.BACK, stencilFailBack, stencilPassZfailBack, stencilFaileZpassBack);
                    }
                } else {
                    if (this.enableSeparateStencil || this._cachedStencilFunc != stencilFunction ||
                        this._cachedStencilRefValue != stencilRefValue ||
                        this._cachedStencilMask != stencilMask
                    ) {
                        this._cachedStencilFunc = stencilFunction;
                        this._cachedStencilRefValue = stencilRefValue;
                        this._cachedStencilMask = stencilMask;
                        this.gl.stencilFunc(stencilFunction, stencilRefValue, stencilMask);
                    }

                    if (this.enableSeparateStencil || this._cachedStencilFail != stencilFail ||
                        this._cachedStencilPassZfail != stencilPassZfail ||
                        this._cachedStencilFaileZpass != stencilFaileZpass) {
                        this._cachedStencilFail = stencilFail;
                        this._cachedStencilPassZfail = stencilPassZfail;
                        this._cachedStencilFaileZpass = stencilFaileZpass;
                        this.gl.stencilOp(stencilFail, stencilPassZfail, stencilFaileZpass);
                    }
                    this.enableSeparateStencil = false;
                }
            } else {
                this.gl.disable(this.gl.STENCIL_TEST);
            }
        }
    }

    draw(vertexArray: VertexArray, instanceCount: number = 0) {
        const indexBuffer = vertexArray.indexBuffer;
        if (indexBuffer) {
            if (instanceCount != 0) {
                this.gl.drawElementsInstanced(vertexArray.primitiveType, vertexArray.primitveCount, indexBuffer.indexDatatype, vertexArray.primitiveByteOffset, instanceCount);
            } else {
                this.gl.drawElements(vertexArray.primitiveType, vertexArray.primitveCount, indexBuffer.indexDatatype, vertexArray.primitiveByteOffset);
            }
        } else {
            if (instanceCount != 0) {
                this.gl.drawArraysInstanced(vertexArray.primitiveType, vertexArray.primitiveByteOffset, vertexArray.primitveCount, instanceCount);
            } else {
                this.gl.drawArrays(vertexArray.primitiveType, vertexArray.primitiveByteOffset, vertexArray.primitveCount);
            }
        }
        if (this.bindingVao != null) {
            vertexArray.unbind();
        }
    }
}

declare global {
    interface WebGLVertexArrayObject extends WebGLObject { }

    interface WebGLQuery extends WebGLObject { }

    interface EXT_disjoint_timer_query {
        QUERY_COUNTER_BITS_EXT: number;
        TIME_ELAPSED_EXT: number;
        TIMESTAMP_EXT: number;
        GPU_DISJOINT_EXT: number;
        QUERY_RESULT_EXT: number;
        QUERY_RESULT_AVAILABLE_EXT: number;
        queryCounterEXT(query: WebGLQuery, target: number): void;
        createQueryEXT(): WebGLQuery;
        beginQueryEXT(target: number, query: WebGLQuery): void;
        endQueryEXT(target: number): void;
        getQueryObjectEXT(query: WebGLQuery, target: number): any;
        deleteQueryEXT(query: WebGLQuery): void;
    }
    interface WebGLVertexArrayObject extends WebGLObject { }

    interface WebGLRenderingContext {
        addExtension(extName: string): void;
        createVertexArray(): any;
        bindVertexArray(vao?: WebGLVertexArrayObject | null): void;
        deleteVertexArray(vao: WebGLVertexArrayObject): void;

        vertexAttribDivisor(index: number, divisor: number): void;
        drawElementsInstanced(mode: number, count: number, type: number, offset: number, instanceCount: number): void;
        drawArraysInstanced(mode: number, first: number, count: number, instanceCount: number): void;
        renderbufferStorageMultisample(
            target: number,
            samples: number,
            internalformat: number,
            width: number,
            height: number,
        ): void;

        getQuery(target: number, pname: number): any;
    }
}