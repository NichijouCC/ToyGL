
import { DeviceCapability } from "./deviceCapability";
import { IShaderProgramOption, ShaderProgram } from "./shaderProgram";
import { VertexAttSetter } from "./vertexAttSetter";
import { DeviceLimit } from "./deviceLimit";
import { BlendEquationEnum, BlendParamEnum } from "./shaderState";
import { IVaoOptions, VertexArray } from "./vertexArray";
import { UniformSetter } from "./UniformSetter";
import { IndexBuffer, IndexBufferOption } from "./indexBuffer";
import { IFrameBufferTexOpts, IImageSourceTexOpts, ITypedArrayTexOpts, Texture } from "./texture";
import { FrameBuffer, IFrameBufferOptions } from "./framebuffer";
import { TextureUnit } from "./textureUnit";
import { IVertexAttributeOption, VertexAttribute } from "./vertexAttribute";
import { Buffer, bufferOption } from "./buffer";
import { VertexBuffer } from "./vertexBuffer";

export interface IEngineOption {
    disableWebgl2?: boolean;
}
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export class GraphicsDevice {
    gl: WebGLRenderingContext;
    readonly webGLVersion: number;
    readonly caps: DeviceCapability;
    readonly limit: DeviceLimit;
    readonly units: TextureUnit;
    bindingVao: WebGLVertexArrayObject = null;
    bindingBuffer: WebGLBuffer = null;
    get width() { return this.gl.drawingBufferWidth; };
    get height() { return this.gl.drawingBufferHeight; };
    constructor(canvasOrContext: HTMLCanvasElement | WebGLRenderingContext, option?: IEngineOption) {
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
        return Texture.fromTypedArray(this, options);
    }

    createTextureFromFrameBuffer(options: IFrameBufferTexOpts) {
        return Texture.fromFrameBuffer(this, options);
    }

    createTextureFromImageSource(options: IImageSourceTexOpts) {
        return Texture.fromImageSource(this, options);
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
    setClear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
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
            x != this._cachedViewPortX ||
            y != this._cachedViewPortY ||
            width != this._cachedViewPortWidth ||
            height != this._cachedViewPortHeight
        ) {
            this.gl.viewport(x * this.width, y * this.height, width * this.width, height * this.height);
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
    private _cachedStencilFailZpass: number;

    private enableSeparateStencil: boolean = false;
    private _cachedStencilFuncBack: number;
    private _cachedStencilRefValueBack: number;
    private _cachedStencilMaskBack: number;
    private _cachedStencilFailBack: number;
    private _cachedStencilPassZfailBack: number;
    private _cachedStencilFailZpassBack: number;

    setStencilState(
        enableStencilTest: boolean = false,
        stencilFunction: number = this.gl.ALWAYS,
        stencilRefValue: number = 1,
        stencilMask: number = 0xff,
        stencilFail: number = this.gl.KEEP,
        stencilFailZpass: number = this.gl.KEEP,
        stencilPassZfail: number = this.gl.REPLACE,

        enableSeparateStencil: boolean = false,
        stencilFunctionBack: number = this.gl.ALWAYS,
        stencilRefValueBack: number = 1,
        stencilMaskBack: number = 0xff,
        stencilFailBack: number = this.gl.KEEP,
        stencilFailZpassBack: number = this.gl.KEEP,
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
                        this._cachedStencilFailZpass != stencilFailZpass) {
                        this._cachedStencilFail = stencilFail;
                        this._cachedStencilPassZfail = stencilPassZfail;
                        this._cachedStencilFailZpass = stencilFailZpass;
                        this.gl.stencilOp(stencilFail, stencilPassZfail, stencilFailZpass);
                    }
                    this.enableSeparateStencil = false;
                }
            } else {
                this.gl.disable(this.gl.STENCIL_TEST);
            }
        }
    }

    unbindVao() {
        if (this.caps.vertexArrayObject) {
            this.gl.bindVertexArray(null);
            this.bindingVao = null;
        }
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
