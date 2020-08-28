import { GraphicsDevice } from "./GraphicsDevice";
import { GlConstants } from "./GLconstant";
import { PixelFormatEnum } from "./PixelFormatEnum";
import { PixelDatatypeEnum } from "./PixelDatatype";
import { FrameBuffer } from "./Framebuffer";
import { TypedArray } from "../core/TypedArray";
import { TextureFilterEnum } from "./TextureFilterEnum";
import { TextureWrapEnum } from "./TextureWrapEnum";
import { isPowerOf2 } from "../mathD/common";
// tip:TEXTURE_MAG_FILTER 固定为LINEAR https://community.khronos.org/t/bilinear-and-trilinear-cant-see-a-difference/39405

export class Texture {
    texture: WebGLTexture;
    pixelFormat: PixelFormatEnum;
    pixelDatatype: PixelDatatypeEnum;
    width: number;
    height: number;
    hasMipmap: boolean;
    sizeInBytes: number;
    preMultiplyAlpha: boolean;
    flipY: boolean;
    private initialized: boolean;
    private _textureFilterAnisotropic: any;

    filterMax: TextureFilterEnum;
    filterMin: TextureFilterEnum;
    wrapS: TextureWrapEnum;
    wrapT: TextureWrapEnum;
    maximumAnisotropy: number;
    enableMimap: boolean;
    mipmapFilter: TextureFilterEnum;
    unpackAlignment: number;
    sourceType: TextureDataFromEnum;
    private _context: GraphicsDevice;
    private _gl: WebGLRenderingContext;
    private constructor(options: ItextureOptions) {
        let { context, width, height, source, pixelFormat = PixelFormatEnum.RGBA, pixelDatatype = PixelDatatypeEnum.UNSIGNED_BYTE } = options;
        if (source != null) {
            if (width == null) {
                width = source.videoWidth ?? source.width;
            }
            if (height == null) {
                height = source.videoHeight ?? source.height;
            }
        }

        let internalFormat = pixelFormat as number;
        const isCompressed = PixelFormatEnum.isCompressedFormat(internalFormat);

        if (context.webGLVersion == 2) {
            if (pixelFormat == PixelFormatEnum.DEPTH_STENCIL) {
                internalFormat = GlConstants.DEPTH24_STENCIL8;
            } else if (pixelFormat == PixelFormatEnum.DEPTH_COMPONENT) {
                if (pixelDatatype == PixelDatatypeEnum.UNSIGNED_SHORT) {
                    internalFormat = GlConstants.DEPTH_COMPONENT16;
                } else if (pixelDatatype == PixelDatatypeEnum.UNSIGNED_INT) {
                    internalFormat = GlConstants.DEPTH_COMPONENT24;
                }
            }
            if (pixelDatatype === PixelDatatypeEnum.FLOAT) {
                switch (pixelFormat) {
                case PixelFormatEnum.RGBA:
                    internalFormat = GlConstants.RGBA32F;
                    break;
                case PixelFormatEnum.RGB:
                    internalFormat = GlConstants.RGB32F;
                    break;
                    // case PixelFormatEnum.RG:
                    //     internalFormat = GlConstants.RG32F;
                    //     break;
                    // case PixelFormatEnum.R:
                    //     internalFormat = GlConstants.R32F;
                    //     break;
                }
            } else if (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) {
                switch (pixelFormat) {
                case PixelFormatEnum.RGBA:
                    internalFormat = GlConstants.RGBA16F;
                    break;
                case PixelFormatEnum.RGB:
                    internalFormat = GlConstants.RGB16F;
                    break;
                // case PixelFormatEnum.RG:
                //     internalFormat = GlConstants.RG16F;
                //     break;
                // case PixelFormatEnum.R:
                //     internalFormat = GlConstants.R16F;
                //     break;
                }
            }
        }

        if ((pixelFormat === PixelFormatEnum.DEPTH_COMPONENT) &&
            ((pixelDatatype !== PixelDatatypeEnum.UNSIGNED_SHORT) && (pixelDatatype !== PixelDatatypeEnum.UNSIGNED_INT))) {
            throw new Error("When options.pixelFormat is DEPTH_COMPONENT, options.pixelDatatype must be UNSIGNED_SHORT or UNSIGNED_INT.");
        }

        if ((pixelFormat === PixelFormatEnum.DEPTH_STENCIL) && (pixelDatatype !== PixelDatatypeEnum.UNSIGNED_INT_24_8)) {
            throw new Error("When options.pixelFormat is DEPTH_STENCIL, options.pixelDatatype must be UNSIGNED_INT_24_8.");
        }

        if ((pixelDatatype === PixelDatatypeEnum.FLOAT) && !context.caps.textureFloat) {
            throw new Error("When options.pixelDatatype is FLOAT, this WebGL implementation must support the OES_texture_float extension.  Check context.floatingPointTexture.");
        }

        if ((pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) && !context.caps.textureHalfFloat) {
            throw new Error("When options.pixelDatatype is HALF_FLOAT, this WebGL implementation must support the OES_texture_half_float extension. Check context.halfFloatingPointTexture.");
        }

        if (PixelFormatEnum.isDepthFormat(pixelFormat)) {
            if (source != null) {
                throw new Error("When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, source cannot be provided.");
            }

            if (!context.caps.depthTexture) {
                throw new Error("When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, this WebGL implementation must support WEBGL_depth_texture.  Check context.depthTexture.");
            }
        }

        if (isCompressed) {
            if (source == null || source.arrayBufferView == null) {
                throw new Error("When options.pixelFormat is compressed, options.source.arrayBufferView must be defined.");
            }

            if (PixelFormatEnum.isDXTFormat(internalFormat) && !context.caps.s3tc) {
                throw new Error("When options.pixelFormat is S3TC compressed, this WebGL implementation must support the WEBGL_texture_compression_s3tc extension. Check context.s3tc.");
            } else if (PixelFormatEnum.isPVRTCFormat(internalFormat) && !context.caps.pvrtc) {
                throw new Error("When options.pixelFormat is PVRTC compressed, this WebGL implementation must support the WEBGL_texture_compression_pvrtc extension. Check context.pvrtc.");
            } else if (PixelFormatEnum.isETC1Format(internalFormat) && !context.caps.etc1) {
                throw new Error("When options.pixelFormat is ETC1 compressed, this WebGL implementation must support the WEBGL_texture_compression_etc1 extension. Check context.etc1.");
            }

            if (PixelFormatEnum.compressedTextureSizeInBytes(internalFormat, width, height) !== source.arrayBufferView.byteLength) {
                throw new Error("The byte length of the array buffer is invalid for the compressed texture with the given width and height.");
            }
        }

        const flipY = options.flipY ?? false;
        const preMultiplyAlpha = options.preMultiplyAlpha || pixelFormat === PixelFormatEnum.RGB || pixelFormat === PixelFormatEnum.LUMINANCE;

        const gl = context.gl;
        const target = gl.TEXTURE_2D;
        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(target, texture);

        let unpackAlignment = 4;
        if (source && source.arrayBufferView && !isCompressed) {
            unpackAlignment = PixelFormatEnum.alignmentInBytes(pixelFormat, pixelDatatype, width);
        }
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
        this.unpackAlignment = unpackAlignment;
        let initialized = true;

        if (source) {
            if (source.arrayBufferView) { // Source: typed array
                this.sourceType = TextureDataFromEnum.TYPEDARRAY;
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                var arrayBufferView = source.arrayBufferView;
                if (isCompressed) {
                    gl.compressedTexImage2D(target, 0, internalFormat, width, height, 0, arrayBufferView);
                } else {
                    if (flipY) {
                        arrayBufferView = PixelFormatEnum.flipY(arrayBufferView, pixelFormat, pixelDatatype, width, height);
                    }
                    gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, arrayBufferView);
                }

                this.update = () => {
                    gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                    var arrayBufferView = source.arrayBufferView;
                    if (isCompressed) {
                        gl.compressedTexImage2D(target, 0, internalFormat, width, height, 0, arrayBufferView);
                    } else {
                        if (flipY) {
                            arrayBufferView = PixelFormatEnum.flipY(arrayBufferView, pixelFormat, pixelDatatype, width, height);
                        }
                        gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, arrayBufferView);
                    }
                };
            } else if (source.framebuffer != null) { // Source: framebuffer
                this.sourceType = TextureDataFromEnum.FRAMEBUFFER;
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                source.framebuffer.bind();
                gl.copyTexImage2D(target, 0, internalFormat, source.xOffset, source.yOffset, width, height, 0);
                source.framebuffer.unbind();
            } else { // Source: ImageData, HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
                this.sourceType = TextureDataFromEnum.IMAGESOURCE;
                // Only valid for DOM-Element uploads
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, preMultiplyAlpha);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
                gl.texImage2D(target, 0, internalFormat, pixelFormat, pixelDatatype, source);
            }
            initialized = true;
        } else {
            gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, null);
            initialized = false;
        }

        // let sampler = new Sampler(options.sampler);
        this.filterMax = options.sampler?.filterMax || TextureFilterEnum.LINEAR;
        this.filterMin = options.sampler?.filterMin || TextureFilterEnum.LINEAR;
        this.wrapS = options.sampler?.wrapS || TextureWrapEnum.REPEAT;
        this.wrapT = options.sampler?.wrapT || TextureWrapEnum.REPEAT;
        this.maximumAnisotropy = options.sampler?.maximumAnisotropy || 1.0;
        this.enableMimap = options.sampler?.enableMimap ?? true;
        this.mipmapFilter = options.sampler?.mipmapFilter ?? TextureFilterEnum.LINEAR;

        if (context.webGLVersion != 1) {
            if (PixelFormatEnum.isDepthFormat(this.pixelFormat) ||
                PixelFormatEnum.isCompressedFormat(this.pixelFormat) ||
                !isPowerOf2(this.width) ||
                !isPowerOf2(this.height)
            ) {
                // throw new Error('Cannot call generateMipmap when the texture pixel format is DEPTH_COMPONENT or DEPTH_STENCIL.');
                // throw new Error('Cannot call generateMipmap with a compressed pixel format.');
                // throw new Error('width must be a power of two to call generateMipmap().');
                // throw new Error('height must be a power of two to call generateMipmap().');
                this.enableMimap = false;
            }

            if (!isPowerOf2(this.width) ||
                !isPowerOf2(this.height)
            ) {
                // throw new Error("texture repeat need Img size be power of 2!");
                this.wrapS = TextureWrapEnum.CLAMP_TO_EDGE;
                this.wrapT = TextureWrapEnum.CLAMP_TO_EDGE;
            }
            // float textures only support nearest filtering unless the linear extensions are supported, so override the sampler's settings
            if ((pixelDatatype === PixelDatatypeEnum.FLOAT && !context.caps.textureFloat) ||
                (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT && !context.caps.textureHalfFloat)) {
                this.filterMax = TextureFilterEnum.NEAREST;
                this.filterMin = TextureFilterEnum.NEAREST;
                this.mipmapFilter = TextureFilterEnum.NEAREST;
            }
        }

        gl.texParameteri(target, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, TextureFilterEnum.realfilter(this.filterMin, this.enableMimap, this.mipmapFilter));
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this.filterMax);
        if (this._textureFilterAnisotropic) {
            gl.texParameteri(target, this._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.maximumAnisotropy);
        }
        gl.bindTexture(target, null);

        const sizeInBytes = isCompressed
            ? PixelFormatEnum.compressedTextureSizeInBytes(pixelFormat, width, height)
            : PixelFormatEnum.textureSizeInBytes(pixelFormat, pixelDatatype, width, height);

        this.texture = texture;
        this.pixelFormat = pixelFormat;
        this.pixelDatatype = pixelDatatype;
        this.width = width;
        this.height = height;
        this.hasMipmap = false;
        this.sizeInBytes = sizeInBytes;
        this.preMultiplyAlpha = preMultiplyAlpha;
        this.flipY = flipY;
        this.initialized = initialized;
        this._context = context;
        this._textureFilterAnisotropic = context.caps.textureAnisotropicFilterExtension;
        this._gl = gl;
    }

    bind(unit: number = 0) {
        const gl = this._gl;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    unbind() {
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
    }

    update() { }

    destroy() {
        this._context.gl.deleteTexture(this.texture);
    }

    /**
     * // Source: typed array
     * @param options 
     */
    static fromTypedArray(options: {
        context: GraphicsDevice;
        width: number;
        height: number;
        arrayBufferView: TypedArray;
        pixelFormat?: PixelFormatEnum;
        pixelDatatype?: PixelDatatypeEnum;
        sampler?: IsamplerOptions;
    }) {
        return new Texture({ ...options, source: { arrayBufferView: options.arrayBufferView } });
    }

    /**
     * // Source: ImageData, HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
     * @param options 
     */
    static fromImageSource(options: {
        context: GraphicsDevice;
        image: TexImageSource;
        pixelFormat?: PixelFormatEnum;
        pixelDatatype?: PixelDatatypeEnum;
        sampler?: IsamplerOptions;
    }) {
        return new Texture({ ...options, source: options.image });
    }

    static fromFrameBuffer(options: {
        context: GraphicsDevice;
        width: number;
        height: number;
        framebuffer: FrameBuffer;
        xOffset?: number;
        yOffset?: number;
        pixelFormat?: PixelFormatEnum;
        pixelDatatype?: PixelDatatypeEnum;
        sampler?: IsamplerOptions;
    }) {
        return new Texture({ ...options, source: { framebuffer: options.framebuffer, xOffset: options.xOffset, yOffset: options.yOffset } });
    }
}

export enum TextureDataFromEnum {
    TYPEDARRAY,
    FRAMEBUFFER,
    IMAGESOURCE
}

export interface ItextureOptions {
    context: GraphicsDevice;
    width?: number;
    height?: number;
    source: {
        framebuffer?: FrameBuffer;
        xOffset?: number;
        yOffset?: number;
        arrayBufferView?: TypedArray;
    } | any;
    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;
    // sampler?: IsamplerOptions

    // ----------------texParameteri-------------
    // filterMax?: TextureFilterEnum;
    // filterMin?: TextureFilterEnum;
    // wrapS?: TextureWrapEnum;
    // wrapT?: TextureWrapEnum;
    // maximumAnisotropy?: number;
    // enableMimap?: boolean;
    // mipmapFilter?: TextureFilterEnum;
    sampler?: IsamplerOptions;
}

export interface IsamplerOptions {
    // ----------------texParameteri-------------
    filterMax?: TextureFilterEnum;
    filterMin?: TextureFilterEnum;
    wrapS?: TextureWrapEnum;
    wrapT?: TextureWrapEnum;
    maximumAnisotropy?: number;
    enableMimap?: boolean;
    mipmapFilter?: TextureFilterEnum;
}

export class Sampler {
    filterMax: TextureFilterEnum;
    filterMin: TextureFilterEnum;
    wrapS: TextureWrapEnum;
    wrapT: TextureWrapEnum;
    maximumAnisotropy: number;
    enableMimap: boolean;
    mipmapFilter: TextureFilterEnum;
    constructor(options?: IsamplerOptions) {
        this.filterMax = options?.filterMax || TextureFilterEnum.LINEAR;
        this.filterMin = options?.filterMin || TextureFilterEnum.LINEAR;
        this.wrapS = options?.wrapS || TextureWrapEnum.REPEAT;
        this.wrapT = options?.wrapT || TextureWrapEnum.REPEAT;
        this.maximumAnisotropy = options?.maximumAnisotropy || 1.0;
        this.enableMimap = options?.enableMimap ?? false;
        this.mipmapFilter = options?.mipmapFilter ?? TextureFilterEnum.LINEAR;
    }
}

export enum MipmapHintEnum {
    DONT_CARE = GlConstants.DONT_CARE,
    FASTEST = GlConstants.FASTEST,
    NICEST = GlConstants.NICEST,
}
