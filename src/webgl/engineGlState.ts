export class EngineGlState {
    private gl: WebGLRenderingContext;
    constructor(_gl: WebGLRenderingContext) {
        this.gl = _gl;
    }
    setClear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
        let cleartag = 0;
        if (clearDepth != null) {
            this.gl.clearDepth(clearDepth);
            cleartag |= this.gl.DEPTH_BUFFER_BIT;
        }
        if (clearColor != null) {
            this.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
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
    setColorMaskWithCached(maskR: boolean, maskG: boolean, maskB: boolean, maskA: boolean, force = false) {
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
    setDepthState(depthWrite: boolean = true, depthTest: boolean = true, force = false) {
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
    }

    private _cachedEnableBlend: boolean;
    private _cachedBlendEquation: number;
    private _cachedBlendFuncSrc: number;
    private _cachedBlendFuncDst: number;
    setBlendState(
        enableBlend: boolean = false,
        blendEquation: number = this.gl.FUNC_ADD,
        blendSrc: number = this.gl.ONE,
        blendDst: number = this.gl.ONE_MINUS_SRC_ALPHA,
        force = false,
    ) {
        if (force || this._cachedEnableBlend != enableBlend) {
            this._cachedEnableBlend = enableBlend;
            if (enableBlend) {
                this.gl.enable(this.gl.BLEND);

                if (force || this._cachedBlendEquation != blendEquation) {
                    this._cachedBlendEquation = blendEquation;
                    this.gl.blendEquation(blendEquation);
                }
                if (force || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst) {
                    this._cachedBlendFuncSrc = blendSrc;
                    this._cachedBlendFuncDst = blendDst;
                    this.gl.blendFunc(blendSrc, blendDst);
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
    setStencilStateWithCached(
        enableStencilTest: boolean = false,
        stencilFunc: number = this.gl.ALWAYS,
        stencilRefValue: number = 1,
        stencilMask: number = 0xff,
        stencilFail: number = this.gl.KEEP,
        stencilPassZfail: number = this.gl.REPLACE,
        stencilFaileZpass: number = this.gl.KEEP,
    ) {
        if (this._cachedEnableStencilTest != enableStencilTest) {
            this._cachedEnableStencilTest = enableStencilTest;
            this.gl.enable(this.gl.STENCIL_TEST);
            if (
                this._cachedStencilFunc != stencilFunc ||
                this._cachedStencilRefValue != stencilRefValue ||
                this._cachedStencilMask != stencilMask
            ) {
                this._cachedStencilFunc = stencilFunc;
                this._cachedStencilRefValue = stencilRefValue;
                this._cachedStencilMask = stencilMask;
                this.gl.stencilFunc(stencilFunc, stencilRefValue, stencilMask);
            }

            if (
                this._cachedStencilFail != stencilFail ||
                this._cachedStencilPassZfail != stencilPassZfail ||
                this._cachedStencilFaileZpass != stencilFaileZpass
            ) {
                this._cachedStencilFail = stencilFail;
                this._cachedStencilPassZfail = stencilPassZfail;
                this._cachedStencilFaileZpass = stencilFaileZpass;
                this.gl.stencilOp(stencilFail, stencilPassZfail, stencilFaileZpass);
            }
        }
    }
}
