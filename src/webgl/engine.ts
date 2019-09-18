import { EngineCapability } from "./engineCapability";

export interface IengineOption {
    disableWebgl2?: boolean;
}
export class Engine {
    private _gl: WebGLRenderingContext;
    private _caps: EngineCapability;
    private _webGLVersion: number;
    constructor(canvasOrContext: HTMLCanvasElement | WebGLRenderingContext, option?: IengineOption) {
        if (canvasOrContext == null) {
            return;
        }
        option = option || {};
        if (canvasOrContext instanceof HTMLCanvasElement) {
            if (!option.disableWebgl2) {
                try {
                    this._gl = canvasOrContext.getContext("webgl2", option) as any;
                } catch (e) {}
            }
            if (!this._gl) {
                try {
                    this._gl = canvasOrContext.getContext("webgl", option) as any;
                } catch (e) {}
            }
            if (!this._gl) {
                throw new Error("webgl not supported");
            }
            canvasOrContext.addEventListener("webglcontextlost", this.handleContextLost, false);
        } else {
            this._gl = canvasOrContext;
        }
        if (this._gl.renderbufferStorageMultisample) {
            this._webGLVersion = 2.0;
        }

        console.log(` ฅ(๑˙o˙๑)ฅ  v${Engine.Version} - ${this.description}`);
    }
    handleContextLost() {
        console.warn("WebGL context lost.");
    }
    static get Version(): string {
        return "0.0.1";
    }
    get description(): string {
        let description = "WebGL" + this._webGLVersion;
        return description;
    }
    private initContext() {
        this._caps = new EngineCapability();
        // Extensions
        this._caps.standardDerivatives =
            this._webGLVersion > 1 || this._gl.getExtension("OES_standard_derivatives") !== null;

        this._caps.astc =
            this._gl.getExtension("WEBGL_compressed_texture_astc") ||
            this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_astc");
        this._caps.s3tc =
            this._gl.getExtension("WEBGL_compressed_texture_s3tc") ||
            this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        this._caps.pvrtc =
            this._gl.getExtension("WEBGL_compressed_texture_pvrtc") ||
            this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        this._caps.etc1 =
            this._gl.getExtension("WEBGL_compressed_texture_etc1") ||
            this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc1");
        this._caps.etc2 =
            this._gl.getExtension("WEBGL_compressed_texture_etc") ||
            this._gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc") ||
            this._gl.getExtension("WEBGL_compressed_texture_es3_0"); // also a requirement of OpenGL ES 3

        this._caps.textureAnisotropicFilterExtension =
            this._gl.getExtension("EXT_texture_filter_anisotropic") ||
            this._gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
            this._gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        this._caps.maxAnisotropy = this._caps.textureAnisotropicFilterExtension
            ? this._gl.getParameter(this._caps.textureAnisotropicFilterExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
            : 0;
        this._caps.uintIndices = this._webGLVersion > 1 || this._gl.getExtension("OES_element_index_uint") !== null;
        this._caps.fragmentDepthSupported = this._webGLVersion > 1 || this._gl.getExtension("EXT_frag_depth") !== null;
        this._caps.highPrecisionShaderSupported = false;
        this._caps.timerQuery =
            this._gl.getExtension("EXT_disjoint_timer_query_webgl2") ||
            this._gl.getExtension("EXT_disjoint_timer_query");
        if (this._caps.timerQuery) {
            if (this._webGLVersion === 1) {
                this._gl.getQuery = (this._caps.timerQuery as any).getQueryEXT.bind(this._caps.timerQuery);
            }
            this._caps.canUseTimestampForTimerQuery =
                this._gl.getQuery(this._caps.timerQuery.TIMESTAMP_EXT, this._caps.timerQuery.QUERY_COUNTER_BITS_EXT) >
                0;
        }

        // Checks if some of the format renders first to allow the use of webgl inspector.
        this._caps.colorBufferFloat = this._webGLVersion > 1 && this._gl.getExtension("EXT_color_buffer_float");

        this._caps.textureFloat = this._webGLVersion > 1 || this._gl.getExtension("OES_texture_float") ? true : false;
        this._caps.textureFloatLinearFiltering =
            this._caps.textureFloat && this._gl.getExtension("OES_texture_float_linear") ? true : false;
        this._caps.textureFloatRender = this._caps.textureFloat && this._canRenderToFloatFramebuffer() ? true : false;

        this._caps.textureHalfFloat =
            this._webGLVersion > 1 || this._gl.getExtension("OES_texture_half_float") ? true : false;
        this._caps.textureHalfFloatLinearFiltering =
            this._webGLVersion > 1 ||
            (this._caps.textureHalfFloat && this._gl.getExtension("OES_texture_half_float_linear"))
                ? true
                : false;
        this._caps.textureHalfFloatRender = this._caps.textureHalfFloat && this._canRenderToHalfFloatFramebuffer();

        this._caps.textureLOD =
            this._webGLVersion > 1 || this._gl.getExtension("EXT_shader_texture_lod") ? true : false;

        this._caps.multiview = this._gl.getExtension("OVR_multiview2");
    }
}

export class Event {
    private listener: ((...args: any) => void)[] = [];
    addEventListener(func: (...args: any) => void) {
        this.listener.push(func);
    }
    removeEventListener(func: (...args: any) => void) {
        let index = this.listener.indexOf(func);
        if (index >= 0) {
            this.listener.splice(index);
        }
    }
    raiseEvent(...args: any) {
        this.listener.forEach(fuc => {
            fuc(args);
        });
    }
}
