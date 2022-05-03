
import { DeviceCapability } from "./deviceCapability";
import { IShaderProgramOption, ShaderProgram } from "./shaderProgram";
import { VertexAttSetter } from "./vertexAttSetter";
import { DeviceLimit } from "./deviceLimit";
import { BlendEquationEnum, BlendParamEnum, CullFaceModeEnum, DepthFuncEnum } from "./shaderState";
import { IVaoOptions, VertexArray } from "./vertexArray";
import { UniformSetter } from "./UniformSetter";
import { IndexBuffer, IndexBufferOption } from "./indexBuffer";
import { IFrameBufferTexOpts, IImageSourceTexOpts, ITypedArrayTexOpts, Texture } from "./texture";
import { FrameBuffer, IFrameBufferOptions } from "./framebuffer";
import { TextureUnit } from "./textureUnit";
import { IVertexAttributeOption, VertexAttribute } from "./vertexAttribute";
import { Buffer, bufferOption, BufferTargetEnum } from "./buffer";
import { VertexBuffer } from "./vertexBuffer";

export interface IEngineOption {
    disableWebgl2?: boolean;
    gl?: WebGLRenderingContext;
    //webgl1 默认TRY启用OES_vertex_array_object、ANGLE_instanced_arrays、OES_element_index_uint
    extensions?: string[];
}
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export class GraphicsDevice {
    readonly gl: WebGLRenderingContext;
    readonly canvas: HTMLCanvasElement;
    readonly webGLVersion: number;
    readonly caps: DeviceCapability;
    readonly limit: DeviceLimit;
    readonly units: TextureUnit;
    bindingVao: WebGLVertexArrayObject = null;
    bindingArrayBuffer: WebGLBuffer = null;
    bindingProgram: WebGLProgram = null;
    readonly options: IEngineOption;
    constructor(canvas: HTMLCanvasElement, option?: IEngineOption) {
        if (canvas == null) return;
        this.canvas = canvas;
        option = option || {};
        this.options = option;
        let gl: WebGLRenderingContext = option.gl;
        if (gl == null) {
            if (!option.disableWebgl2) {
                try {
                    gl = canvas.getContext("webgl2", option) as any;
                } catch (e) { }
            }
            if (!gl) {
                try {
                    gl = canvas.getContext("webgl", option) as any;
                } catch (e) { }
            }
            if (!gl) {
                throw new Error("webgl not supported");
            }
        }
        canvas.addEventListener("webglcontextlost", this.handleContextLost, false);
        if (gl.renderbufferStorageMultisample) {
            this.webGLVersion = 2.0;
        } else {
            this.webGLVersion = 1.0;
        }
        this.gl = gl;
        this.caps = new DeviceCapability(this);
        this.limit = new DeviceLimit(this);

        // -------------config init
        VertexAttSetter.init(this);
        UniformSetter.init(this);
        this.units = new TextureUnit(this.limit.maximumCombinedTextureImageUnits);
    }

    handleContextLost = () => {
        throw new Error("Method not implemented.");
    }

    createShaderProgram(options: IShaderProgramOption) {
        return new ShaderProgram(this, options);
    }

    createVertexArray(options: IVaoOptions) {
        return new VertexArray(this, options);
    }

    createVertexAtt(options: IVertexAttributeOption) {
        return new VertexAttribute(this, options);
    }

    createVertexBuffer(options: bufferOption) {
        return new VertexBuffer(this, options);
    }

    createIndexBuffer(options: IndexBufferOption) {
        return new IndexBuffer(this, options);
    }

    createBuffer(options: bufferOption) {
        return new Buffer(this, options);
    }

    createTextureFromTypedArray(options: ITypedArrayTexOpts) {
        return new Texture(this, { ...options, source: { arrayBufferView: options.arrayBufferView } });
    }

    createTextureFromFrameBuffer(options: IFrameBufferTexOpts) {
        return new Texture(this, { ...options, source: { framebuffer: options.framebuffer, xOffset: options.xOffset, yOffset: options.yOffset } });
    }

    createTextureFromImageSource(options: IImageSourceTexOpts) {
        return new Texture(this, { ...options, source: options.image });
    }

    createFrameBuffer(options: IFrameBufferOptions) {
        return new FrameBuffer(this, options);
    }

    // -----------------------------gl state
    private _cachedClearDepth: number;
    private _cachedClearColor: Float32Array = new Float32Array(4);
    /**
     * 
     * @param clearDepth 默认值：1.0
     * @param clearColor 默认值：1,1,1,1
     * @param clearStencil 默认值：0
     */
    setClearStateAndClear(params: IClearState) {
        let { clearDepth, clearColor, clearStencil } = params;
        let clearTag = 0;
        if (clearDepth != null) {
            if (clearDepth != this._cachedClearDepth) {
                this._cachedClearDepth = clearDepth;
                this.gl.clearDepth(clearDepth);
            }
            clearTag |= this.gl.DEPTH_BUFFER_BIT;
        }
        if (clearColor != null) {
            if (this._cachedClearColor[0] != clearColor[0] || this._cachedClearColor[1] != clearColor[1] || this._cachedClearColor[2] != clearColor[2] || this._cachedClearColor[3] != clearColor[3]) {
                this._cachedClearColor[0] = clearColor[0];
                this._cachedClearColor[1] = clearColor[1];
                this._cachedClearColor[2] = clearColor[2];
                this._cachedClearColor[3] = clearColor[3];
                this.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
            }

            clearTag |= this.gl.COLOR_BUFFER_BIT;
        }
        if (clearStencil != null) {
            this.gl.clearStencil(clearStencil);
            clearTag |= this.gl.STENCIL_BUFFER_BIT;
        }
        if (clearTag != 0) {
            this.gl.clear(clearTag);
        }
    }

    private _cachedViewPortX: number;
    private _cachedViewPortY: number;
    private _cachedViewPortWidth: number;
    private _cachedViewPortHeight: number;
    /**
     * 0-1范围
     */
    setViewPort(x: number, y: number, width: number, height: number, force = false) {
        if (
            force ||
            x * this.canvas.width != this._cachedViewPortX ||
            y * this.canvas.height != this._cachedViewPortY ||
            width * this.canvas.width != this._cachedViewPortWidth ||
            height * this.canvas.height != this._cachedViewPortHeight
        ) {
            this.gl.viewport(x * this.canvas.width, y * this.canvas.height, width * this.canvas.width, height * this.canvas.height);
            this._cachedViewPortX = x * this.canvas.width;
            this._cachedViewPortY = y * this.canvas.height;
            this._cachedViewPortWidth = width * this.canvas.width;
            this._cachedViewPortHeight = height * this.canvas.height;
        }
    }

    private _cacheColorMaskR: boolean;
    private _cacheColorMaskG: boolean;
    private _cacheColorMaskB: boolean;
    private _cacheColorMaskA: boolean;
    setColorMaskState(params: IColorMaskState) {
        let { force, writeR, writeG, writeB, writeA } = params;
        if (
            force ||
            this._cacheColorMaskR != writeR ||
            this._cacheColorMaskG != writeG ||
            this._cacheColorMaskB != writeB ||
            this._cacheColorMaskA != writeA
        ) {
            this.gl.colorMask(writeR, writeG, writeB, writeA);
            this._cacheColorMaskR = writeR;
            this._cacheColorMaskG = writeG;
            this._cacheColorMaskB = writeB;
            this._cacheColorMaskA = writeA;
        }
    }

    _cachedEnableCullFace: boolean;
    _cachedCullMode: CullFaceModeEnum;
    setCullState(params: ICullState) {
        let { force, enable, cullMode } = params;
        if (force || this._cachedEnableCullFace != enable) {
            this._cachedEnableCullFace = enable;
            if (enable) {
                this.gl.enable(this.gl.CULL_FACE);
            } else {
                this.gl.disable(this.gl.CULL_FACE);
            }
        }
        if (force || (enable && this._cachedCullMode != cullMode)) {
            this._cachedCullMode = cullMode;
            this.gl.cullFace(cullMode);
        }
    }

    private _cachedDepthWrite: boolean;
    private _cachedDepthTest: boolean;
    private _cachedDepthFunction: number;
    setDepthState(params: IDepthState) {
        let { force, depthWrite, depthTest, depthTestFunc } = params;
        if (force || this._cachedDepthWrite != depthWrite) {
            this._cachedDepthWrite = depthWrite;
            this.gl.depthMask(depthWrite);
        }

        if (force || this._cachedDepthTest != depthTest) {
            this._cachedDepthTest = depthTest;
            if (depthTest) {
                this.gl.enable(this.gl.DEPTH_TEST);
            } else {
                this.gl.disable(this.gl.DEPTH_TEST);
            }
        }
        if (force || (depthTest && (depthTestFunc != null && this._cachedDepthFunction != depthTestFunc))) {
            this._cachedDepthFunction = depthTestFunc;
            this.gl.depthFunc(depthTestFunc);
        }
    }

    private _cachedEnableBlend: boolean;
    private _cachedBlendEquation: number;
    private _cachedBlendFuncSrc: number;
    private _cachedBlendFuncDst: number;
    private _cachedBlendEquationAlpha: number;
    private _cachedBlendFuncSrc_a: number;
    private _cachedBlendFuncDst_a: number;

    setBlendState(params: IBlendState) {
        let { force, enable } = params;
        if (force || this._cachedEnableBlend != enable) {
            this._cachedEnableBlend = enable;
            if (enable) {
                this.gl.enable(this.gl.BLEND);
            } else {
                this.gl.disable(this.gl.BLEND);
            }
        }
        if (force || enable) {
            let { blendEquation, blendSrc, blendDst, blendAlphaEquation, blendSrcAlpha, blendDstAlpha } = params;
            blendAlphaEquation = blendAlphaEquation ?? blendEquation;
            blendSrcAlpha = blendSrcAlpha ?? blendSrc;
            blendDstAlpha = blendDstAlpha ?? blendDst;

            if (this._cachedBlendEquation != blendEquation || this._cachedBlendEquationAlpha != blendAlphaEquation) {
                this._cachedBlendEquation = blendEquation;
                this._cachedBlendEquationAlpha = blendAlphaEquation;
                this.gl.blendEquationSeparate(blendEquation, blendAlphaEquation);
            }
            if (this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst || this._cachedBlendFuncSrc_a != blendSrcAlpha || this._cachedBlendFuncDst_a != blendDstAlpha) {
                this._cachedBlendFuncSrc = blendSrc;
                this._cachedBlendFuncDst = blendDst;
                this._cachedBlendFuncSrc_a = blendSrcAlpha;
                this._cachedBlendFuncDst_a = blendDstAlpha;
                this.gl.blendFuncSeparate(blendSrc, blendDst, blendSrcAlpha, blendDstAlpha);
            }
        }
    }

    private _cachedEnableStencilTest: boolean;
    private _cachedStencilFunc: number;
    private _cachedStencilRefValue: number;
    private _cachedStencilMask: number;
    private _cachedStencilFail: number;
    private _cachedStencilPassZfail: number;
    private _cachedStencilFailZpass: number;

    private _cachedStencilFuncBack: number;
    private _cachedStencilRefValueBack: number;
    private _cachedStencilMaskBack: number;
    private _cachedStencilFailBack: number;
    private _cachedStencilPassZfailBack: number;
    private _cachedStencilFailZpassBack: number;

    setStencilState(params: IStencilState) {
        let { force, enable, } = params;
        if (force || this._cachedEnableStencilTest != enable) {
            this._cachedEnableStencilTest = enable;
            if (enable) {
                this.gl.enable(this.gl.STENCIL_TEST);
            } else {
                this.gl.disable(this.gl.STENCIL_TEST);
            }
        }

        if (force || enable) {
            let { stencilFunction, stencilRefValue, stencilMask, stencilFail, stencilPassZfail, stencilFailZpass, stencilFunctionBack, stencilRefValueBack, stencilMaskBack, stencilFailBack, stencilPassZfailBack, stencilFailZpassBack } = params;
            stencilFunctionBack = stencilFunctionBack ?? stencilFunction;
            stencilRefValueBack = stencilRefValueBack ?? stencilRefValue;
            stencilMaskBack = stencilMaskBack ?? stencilMask;
            stencilFailBack = stencilFailBack ?? stencilFail;
            stencilPassZfailBack = stencilPassZfailBack ?? stencilPassZfail;
            stencilFailZpassBack = stencilFailZpassBack ?? stencilFailZpass;

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
                this._cachedStencilRefValueBack != stencilRefValueBack ||
                this._cachedStencilMaskBack != stencilMaskBack) {
                this._cachedStencilFuncBack = stencilFunctionBack;
                this._cachedStencilRefValueBack = stencilRefValueBack;
                this._cachedStencilMaskBack = stencilMaskBack;
                this.gl.stencilFuncSeparate(this.gl.BACK, stencilFunctionBack, stencilRefValueBack, stencilMaskBack);
            }
            if (this._cachedStencilFail != stencilFail ||
                this._cachedStencilPassZfail != stencilPassZfail ||
                this._cachedStencilFailZpass != stencilFailZpass) {
                this._cachedStencilFail = stencilFail;
                this._cachedStencilPassZfail = stencilPassZfail;
                this._cachedStencilFailZpass = stencilFailZpass;
                this.gl.stencilOpSeparate(this.gl.FRONT, stencilFail, stencilPassZfail, stencilFailZpass);
            }

            if (this._cachedStencilFailBack != stencilFailBack ||
                this._cachedStencilPassZfailBack != stencilPassZfailBack ||
                this._cachedStencilFailZpassBack != stencilFailZpassBack) {
                this._cachedStencilFailBack = stencilFailBack;
                this._cachedStencilPassZfailBack = stencilPassZfailBack;
                this._cachedStencilFailZpassBack = stencilFailZpassBack;
                this.gl.stencilOpSeparate(this.gl.BACK, stencilFailBack, stencilPassZfailBack, stencilFailZpassBack);
            }
        }
    }
    _cacheScissorTest: boolean
    setScissorState(params: IScissorState) {
        let { force, enable: scissorTest, scissorRect } = params;
        if (force || scissorTest != this._cacheScissorTest) {
            this._cacheScissorTest = scissorTest;
            if (scissorTest) {
                this.gl.enable(this.gl.SCISSOR_TEST);
            } else {
                this.gl.disable(this.gl.SCISSOR_TEST);
            }
        }
        if (force || (scissorTest && scissorRect != null)) {
            this.gl.scissor(scissorRect[0], scissorRect[1], scissorRect[2], scissorRect[3]);
        }
    }

    unbindVao() {
        if (this.caps.vertexArrayObject) {
            this.gl.bindVertexArray(null);
            this.bindingVao = null;
        }
    }

    unbindVbo() {
        this.gl.bindBuffer(BufferTargetEnum.ARRAY_BUFFER, null);
        this.bindingArrayBuffer = null;
    }

    unBindShaderProgram() {
        this.gl.useProgram(null);
        this.bindingProgram = null;
    }

    unbindTextureUnit() {
        this.units.clear();
    }

    draw(vertexArray: VertexArray, instanceCount: number = 0) {
        const indexBuffer = vertexArray.indexBuffer;
        if (indexBuffer) {
            if (instanceCount != 0) {
                this.gl.drawElementsInstanced(vertexArray.primitiveType, vertexArray.count, indexBuffer.datatype, vertexArray.bytesOffset, instanceCount);
            } else {
                this.gl.drawElements(vertexArray.primitiveType, vertexArray.count, indexBuffer.datatype, vertexArray.bytesOffset);
            }
        } else {
            if (instanceCount != 0) {
                this.gl.drawArraysInstanced(vertexArray.primitiveType, vertexArray.bytesOffset, vertexArray.count, instanceCount);
            } else {
                this.gl.drawArrays(vertexArray.primitiveType, vertexArray.bytesOffset, vertexArray.count);
            }
        }
    }
}

declare global {
    interface WebGLVertexArrayObject { }

    interface WebGLQuery { }

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
    interface WebGLVertexArrayObject { }

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

export interface IBlendState {
    enable: boolean,
    blendEquation: BlendEquationEnum,
    blendSrc: BlendParamEnum,
    blendDst: BlendParamEnum,
    blendAlphaEquation?: BlendEquationEnum,
    blendSrcAlpha?: BlendParamEnum,
    blendDstAlpha?: BlendParamEnum,
    force?: boolean,
}

export interface IStencilState {
    enable: boolean,
    stencilFunction: number,
    stencilRefValue: number,
    stencilMask: number,
    stencilFail: number,
    stencilPassZfail: number,
    stencilFailZpass: number,
    stencilFunctionBack?: number,
    stencilRefValueBack?: number,
    stencilMaskBack?: number,
    stencilFailBack?: number,
    stencilPassZfailBack?: number,
    stencilFailZpassBack?: number,
    force?: boolean,
}

export interface IDepthState {
    depthTest: boolean;
    depthTestFunc?: DepthFuncEnum;
    depthWrite: boolean;
    force?: boolean,
}

export interface IColorMaskState {
    writeR: boolean,
    writeG: boolean,
    writeB: boolean,
    writeA: boolean,
    force?: boolean,
}

export interface ICullState {
    enable: boolean,
    cullMode?: CullFaceModeEnum,
    force?: boolean,
}

export interface IClearState {
    clearColor?: ArrayLike<number>,
    clearDepth?: number,
    clearStencil?: number,
    force?: boolean,
}

export interface IScissorState {
    enable: boolean,
    scissorRect: ArrayLike<number>,
    force?: boolean,
}