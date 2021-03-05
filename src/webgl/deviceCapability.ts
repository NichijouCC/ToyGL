import { GraphicsDevice } from "./graphicsDevice";
import { GlConstants } from "./glConstant";

export class DeviceCapability {
    /** Maximum textures units per fragment shader */
    public maxTexturesImageUnits: number;
    /** Maximum texture units per vertex shader */
    public maxVertexTextureImageUnits: number;
    /** Maximum textures units in the entire pipeline */
    public maxCombinedTexturesImageUnits: number;
    /** Maximum texture size */
    public maxTextureSize: number;
    /** Maximum cube texture size */
    public maxCubemapTextureSize: number;
    /** Maximum render texture size */
    public maxRenderTextureSize: number;
    /** Maximum number of vertex attributes */
    public maxVertexAttribs: number;
    /** Maximum number of varyings */
    public maxVaryingVectors: number;
    /** Maximum number of uniforms per vertex shader */
    public maxVertexUniformVectors: number;
    /** Maximum number of uniforms per fragment shader */
    public maxFragmentUniformVectors: number;
    /** Defines if standard derivates (dx/dy) are supported */
    public standardDerivatives: boolean;
    /** Defines if s3tc texture compression is supported */
    public s3tc: WEBGL_compressed_texture_s3tc;
    /** Defines if pvrtc texture compression is supported */
    public pvrtc: any; // WEBGL_compressed_texture_pvrtc;
    /** Defines if etc1 texture compression is supported */
    public etc1: any; // WEBGL_compressed_texture_etc1;
    /** Defines if etc2 texture compression is supported */
    public etc2: any; // WEBGL_compressed_texture_etc;
    /** Defines if astc texture compression is supported */
    public astc: any; // WEBGL_compressed_texture_astc;
    /** Defines if float textures are supported */
    public textureFloat: boolean;
    /** Defines if vertex array objects are supported */
    public vertexArrayObject: boolean;
    /** Gets the webgl extension for anisotropic filtering (null if not supported) */
    public textureAnisotropicFilterExtension: EXT_texture_filter_anisotropic;
    /** Gets the maximum level of anisotropy supported */
    public maxAnisotropy: number;
    /** Defines if instancing is supported */
    public instancedArrays: boolean;
    /** Defines if 32 bits indices are supported */
    public uintIndices: boolean;
    /** Defines if high precision shaders are supported */
    public highPrecisionShaderSupported: boolean;
    /** Defines if depth reading in the fragment shader is supported */
    public fragmentDepthSupported: boolean;
    /** Defines if float texture linear filtering is supported */
    public textureFloatLinearFiltering: boolean;
    /** Defines if rendering to float textures is supported */
    public textureFloatRender: boolean;
    /** Defines if half float textures are supported */
    public textureHalfFloat: boolean;
    /** Defines if half float texture linear filtering is supported */
    public textureHalfFloatLinearFiltering: boolean;
    /** Defines if rendering to half float textures is supported */
    public textureHalfFloatRender: boolean;
    /** Defines if textureLOD shader command is supported */
    public textureLOD: boolean;
    /** Defines if draw buffers extension is supported */
    public drawBuffersExtension: boolean;
    /** Defines if depth textures are supported */
    public depthTexture: boolean;
    /** Defines if float color buffer are supported */
    public colorBufferFloat: boolean;
    /** Gets disjoint timer query extension (null if not supported) */
    public timerQuery: EXT_disjoint_timer_query;
    /** Defines if timestamp can be used with timer query */
    public canUseTimestampForTimerQuery: boolean;
    /** Defines if multiview is supported (https://www.khronos.org/registry/webgl/extensions/WEBGL_multiview/) */
    public multiview: any;
    /** Function used to let the system compiles shaders in background */
    public parallelShaderCompile: {
        COMPLETION_STATUS_KHR: number;
    };

    /** Max number of texture samples for MSAA */
    public maxMSAASamples = 1;

    constructor(context: GraphicsDevice) {
        const _gl = context.gl;
        const _webGLVersion = context.webGLVersion;
        // Extensions
        this.standardDerivatives = _webGLVersion > 1 || _gl.getExtension("OES_standard_derivatives") !== null;
        this.astc =
            _gl.getExtension("WEBGL_compressed_texture_astc") ||
            _gl.getExtension("WEBKIT_WEBGL_compressed_texture_astc");
        this.s3tc =
            _gl.getExtension("WEBGL_compressed_texture_s3tc") ||
            _gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        this.pvrtc =
            _gl.getExtension("WEBGL_compressed_texture_pvrtc") ||
            _gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        this.etc1 =
            _gl.getExtension("WEBGL_compressed_texture_etc1") ||
            _gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc1");
        this.etc2 =
            _gl.getExtension("WEBGL_compressed_texture_etc") ||
            _gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc") ||
            _gl.getExtension("WEBGL_compressed_texture_es3_0"); // also a requirement of OpenGL ES 3

        this.textureAnisotropicFilterExtension =
            _gl.getExtension("EXT_texture_filter_anisotropic") ||
            _gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
            _gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        this.maxAnisotropy = this.textureAnisotropicFilterExtension
            ? _gl.getParameter(this.textureAnisotropicFilterExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
            : 0;
        this.uintIndices = _webGLVersion > 1 || _gl.getExtension("OES_element_index_uint") !== null;
        this.fragmentDepthSupported = _webGLVersion > 1 || _gl.getExtension("EXT_frag_depth") !== null;
        this.highPrecisionShaderSupported = false;
        this.timerQuery =
            _gl.getExtension("EXT_disjoint_timer_query_webgl2") || _gl.getExtension("EXT_disjoint_timer_query");
        if (this.timerQuery) {
            if (_webGLVersion === 1) {
                _gl.getQuery = (this.timerQuery as any).getQueryEXT.bind(this.timerQuery);
            }
            this.canUseTimestampForTimerQuery =
                _gl.getQuery(this.timerQuery.TIMESTAMP_EXT, this.timerQuery.QUERY_COUNTER_BITS_EXT) > 0;
        }

        // Checks if some of the format renders first to allow the use of webgl inspector.
        this.colorBufferFloat = _webGLVersion > 1 && _gl.getExtension("EXT_color_buffer_float");

        this.textureFloat = !!(_webGLVersion > 1 || _gl.getExtension("OES_texture_float"));
        this.textureFloatLinearFiltering =
            !!(this.textureFloat && _gl.getExtension("OES_texture_float_linear"));
        this.textureFloatRender =
            !!(this.textureFloat && this._canRenderToFloatFramebuffer(_gl, _webGLVersion));

        this.textureHalfFloat = !!(_webGLVersion > 1 || _gl.getExtension("OES_texture_half_float"));
        this.textureHalfFloatLinearFiltering =
            !!(_webGLVersion > 1 || (this.textureHalfFloat && _gl.getExtension("OES_texture_half_float_linear")));
        this.textureHalfFloatRender =
            this.textureHalfFloat && this._canRenderToHalfFloatFramebuffer(_gl, _webGLVersion);

        this.textureLOD = !!(_webGLVersion > 1 || _gl.getExtension("EXT_shader_texture_lod"));

        this.multiview = _gl.getExtension("OVR_multiview2");

        // Shader compiler threads
        this.parallelShaderCompile = _gl.getExtension("KHR_parallel_shader_compile");

        // Depth Texture
        if (_webGLVersion > 1) {
            this.depthTexture = true;
        } else {
            var depthTextureExtension = _gl.getExtension("WEBGL_depth_texture");

            if (depthTextureExtension != null) {
                this.depthTexture = true;
                // _gl.UNSIGNED_INT_24_8 = depthTextureExtension.UNSIGNED_INT_24_8_WEBGL;
            }
        }

        // Vertex array object
        if (_webGLVersion > 1) {
            this.vertexArrayObject = true;
        } else {
            var vertexArrayObjectExtension = _gl.getExtension("OES_vertex_array_object");

            if (vertexArrayObjectExtension != null) {
                this.vertexArrayObject = true;
                _gl.createVertexArray = vertexArrayObjectExtension.createVertexArrayOES.bind(
                    vertexArrayObjectExtension
                );
                _gl.bindVertexArray = vertexArrayObjectExtension.bindVertexArrayOES.bind(vertexArrayObjectExtension);
                _gl.deleteVertexArray = vertexArrayObjectExtension.deleteVertexArrayOES.bind(
                    vertexArrayObjectExtension
                );
            } else {
                this.vertexArrayObject = false;
            }
        }

        // Instances count
        if (_webGLVersion > 1) {
            this.instancedArrays = true;
        } else {
            var instanceExtension = _gl.getExtension("ANGLE_instanced_arrays");

            if (instanceExtension != null) {
                this.instancedArrays = true;
                _gl.drawArraysInstanced = instanceExtension.drawArraysInstancedANGLE.bind(instanceExtension);
                _gl.drawElementsInstanced = instanceExtension.drawElementsInstancedANGLE.bind(instanceExtension);
                _gl.vertexAttribDivisor = instanceExtension.vertexAttribDivisorANGLE.bind(instanceExtension);
            } else {
                this.instancedArrays = false;
            }
        }
    }

    private _canRenderToFloatFramebuffer(_gl: WebGLRenderingContext, _webGLVersion: number): boolean {
        if (_webGLVersion > 1) {
            return this.colorBufferFloat;
        }
        return CheckCanRenderToFrameBuffer(_gl, GlConstants.FLOAT);
    }

    private _canRenderToHalfFloatFramebuffer(_gl: WebGLRenderingContext, _webGLVersion: number): boolean {
        if (_webGLVersion > 1) {
            return this.colorBufferFloat;
        }
        return CheckCanRenderToFrameBuffer(_gl, GlConstants.HALF_FLOAT);
    }
}

export function CheckCanRenderToFrameBuffer(
    gl: WebGLRenderingContext,
    texType: GlConstants.FLOAT | GlConstants.HALF_FLOAT
) {
    while (gl.getError() !== gl.NO_ERROR) { }

    let successful = true;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const interFromat = texType === GlConstants.FLOAT ? GlConstants.RGBA32F : GlConstants.RGBA16F;
    gl.texImage2D(gl.TEXTURE_2D, 0, interFromat, 1, 1, 0, gl.RGBA, texType, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

    successful = successful && status === gl.FRAMEBUFFER_COMPLETE;
    successful = successful && gl.getError() === gl.NO_ERROR;

    // try render by clearing frame buffer's color buffer
    if (successful) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        successful = successful && gl.getError() === gl.NO_ERROR;
    }

    // try reading from frame to ensure render occurs (just creating the FBO is not sufficient to determine if rendering is supported)
    if (successful) {
        // in practice it's sufficient to just read from the backbuffer rather than handle potentially issues reading from the texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        const readFormat = gl.RGBA;
        const readType = gl.UNSIGNED_BYTE;
        const buffer = new Uint8Array(4);
        gl.readPixels(0, 0, 1, 1, readFormat, readType, buffer);
        successful = successful && gl.getError() === gl.NO_ERROR;
    }

    // clean up
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fb);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // clear accumulated errors
    // while (!successful && gl.getError() !== gl.NO_ERROR) { }

    return successful;
}
