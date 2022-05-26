import { GraphicsDevice } from "./graphicsDevice";
import { GlConstants } from "./glConstant";
import { PixelFormatEnum } from "./pixelFormatEnum";
import { PixelDatatypeEnum } from "./pixelDatatype";
import { FrameBuffer } from "./framebuffer";
import { TypedArray } from "../core/typedArray";
import { TextureFilterEnum } from "./textureFilterEnum";
import { TextureWrapEnum } from "./textureWrapEnum";
import { isPowerOf2 } from "../mathD/common";
// tip:TEXTURE_MAG_FILTER 固定为LINEAR https://community.khronos.org/t/bilinear-and-trilinear-cant-see-a-difference/39405
// pixelStorei is a global state 

export class Texture {
    texture: WebGLTexture;
    unitId: number;
    private beBind = false;
    pixelFormat: PixelFormatEnum;
    pixelDatatype: PixelDatatypeEnum;
    width: number;
    height: number;
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
    enableMipmap: boolean;
    mipmapFilter: TextureFilterEnum;
    unpackAlignment: number;
    readonly sourceType: TextureSourceEnum;
    private _context: GraphicsDevice;
    private _gl: WebGLRenderingContext;
    source: TexImageSource | FrameBuffer | TypedArray;
    xOffset: number;
    yOffset: number;
    constructor(context: GraphicsDevice, options: IImageSourceTexOpts | ITypedArrayTexOpts | IFrameBufferTexOpts) {
        this._context = context;
        this._textureFilterAnisotropic = context.caps.textureAnisotropicFilterExtension;
        const gl = context.gl;
        this._gl = gl;

        if ((options as IImageSourceTexOpts).image != null) {
            let option = options as IImageSourceTexOpts;
            this.source = option.image;
            this.width = option.image.width;
            this.height = option.image.height;
            this.sourceType = TextureSourceEnum.IMAGE_SOURCE;
        } else if ((options as IFrameBufferTexOpts).framebuffer != null) {
            let option = options as IFrameBufferTexOpts;
            this.source = option.framebuffer;
            this.width = option.width;
            this.height = option.height;
            this.xOffset = option.xOffset ?? 0;
            this.yOffset = option.yOffset ?? 0;
            this.sourceType = TextureSourceEnum.FRAME_BUFFER;
        } else {
            let option = options as ITypedArrayTexOpts;
            this.source = option.arrayBufferView;
            this.width = option.width;
            this.height = option.height;
            this.sourceType = TextureSourceEnum.TYPED_ARRAY;
        }

        this.pixelFormat = options.pixelFormat ?? PixelFormatEnum.RGBA;
        this.pixelDatatype = options.pixelDatatype ?? PixelDatatypeEnum.UNSIGNED_BYTE;
        this.flipY = options.flipY ?? false;
        this.preMultiplyAlpha = options.preMultiplyAlpha || options.pixelFormat === PixelFormatEnum.RGB || options.pixelFormat === PixelFormatEnum.LUMINANCE;
        const isCompressed = PixelFormatEnum.isCompressedFormat(this.pixelFormat);
        const sizeInBytes = isCompressed
            ? PixelFormatEnum.compressedTextureSizeInBytes(this.pixelFormat, this.width, this.height)
            : PixelFormatEnum.textureSizeInBytes(this.pixelFormat, this.pixelDatatype, this.width, this.height);
        this.sizeInBytes = sizeInBytes;

        this.filterMax = options?.filterMax ?? TextureFilterEnum.LINEAR;
        this.filterMin = options?.filterMin ?? TextureFilterEnum.LINEAR;
        this.wrapS = options?.wrapS ?? TextureWrapEnum.REPEAT;
        this.wrapT = options?.wrapT ?? TextureWrapEnum.REPEAT;
        this.maximumAnisotropy = options?.maximumAnisotropy ?? 1.0;
        this.enableMipmap = options?.enableMipmap ?? false;
        this.mipmapFilter = options?.mipmapFilter ?? TextureFilterEnum.LINEAR;
        this.create();
    }

    private create() {
        let { _context: context, _gl: gl, pixelFormat, pixelDatatype, source, flipY, preMultiplyAlpha, width, height } = this;
        if (this.texture != null) gl.deleteTexture(this.texture);

        let internalFormat = pixelFormat as number;
        const isCompressed = PixelFormatEnum.isCompressedFormat(pixelFormat);

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

        if (isCompressed && this.sourceType == TextureSourceEnum.TYPED_ARRAY) {
            let source = this.source as TypedArray;
            if (source == null) {
                throw new Error("When options.pixelFormat is compressed, options.source.arrayBufferView must be defined.");
            }

            if (PixelFormatEnum.isDXTFormat(internalFormat) && !context.caps.s3tc) {
                throw new Error("When options.pixelFormat is S3TC compressed, this WebGL implementation must support the WEBGL_texture_compression_s3tc extension. Check context.s3tc.");
            } else if (PixelFormatEnum.isPVRTCFormat(internalFormat) && !context.caps.pvrtc) {
                throw new Error("When options.pixelFormat is PVRTC compressed, this WebGL implementation must support the WEBGL_texture_compression_pvrtc extension. Check context.pvrtc.");
            } else if (PixelFormatEnum.isETC1Format(internalFormat) && !context.caps.etc1) {
                throw new Error("When options.pixelFormat is ETC1 compressed, this WebGL implementation must support the WEBGL_texture_compression_etc1 extension. Check context.etc1.");
            }

            if (PixelFormatEnum.compressedTextureSizeInBytes(internalFormat, width, height) !== source.byteLength) {
                throw new Error("The byte length of the array buffer is invalid for the compressed texture with the given width and height.");
            }
        }

        const target = gl.TEXTURE_2D;
        const texture = gl.createTexture();
        this._context.units.assignID(this);
        gl.activeTexture(gl.TEXTURE0 + this.unitId);
        gl.bindTexture(target, texture);

        let unpackAlignment = 4;
        if (this.sourceType == TextureSourceEnum.TYPED_ARRAY && !isCompressed) {
            unpackAlignment = PixelFormatEnum.alignmentInBytes(pixelFormat, pixelDatatype, width);
        }
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
        this.unpackAlignment = unpackAlignment;
        switch (this.sourceType) {
            case TextureSourceEnum.TYPED_ARRAY:
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                var arrayBufferView = source as TypedArray;
                if (isCompressed) {
                    gl.compressedTexImage2D(target, 0, internalFormat, width, height, 0, arrayBufferView);
                } else {
                    if (flipY) {
                        arrayBufferView = PixelFormatEnum.flipY(arrayBufferView, pixelFormat, pixelDatatype, width, height);
                    }
                    gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, arrayBufferView);
                }
                break;
            case TextureSourceEnum.IMAGE_SOURCE:
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, preMultiplyAlpha);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
                gl.texImage2D(target, 0, internalFormat, pixelFormat, pixelDatatype, this.source as TexImageSource);
                break;
            case TextureSourceEnum.FRAME_BUFFER:
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                var fb = source as FrameBuffer;
                fb.bind();
                gl.copyTexImage2D(target, 0, internalFormat, this.xOffset, this.yOffset, width, height, 0);
                fb.unbind();
                break;
        }

        // let sampler = new Sampler(options.sampler);


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
                this.enableMipmap = false;
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
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, TextureFilterEnum.realFilter(this.filterMin, this.enableMipmap, this.mipmapFilter));
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this.filterMax);
        if (this._textureFilterAnisotropic) {
            gl.texParameteri(target, this._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.maximumAnisotropy);
        }
        if (this.enableMipmap) {
            gl.generateMipmap(target);
        }
        this.texture = texture;
    }

    bind() {
        const gl = this._gl;
        let beAssigned = this._context.units.assignID(this);
        if (beAssigned != false || this.beBind == false) {
            gl.activeTexture(gl.TEXTURE0 + this.unitId);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        }
        this.beBind = true;
    }

    unbind() {
        this._gl.bindTexture(this._gl.TEXTURE_2D, null);
        this.beBind = false;
    }

    set(options: Partial<IBaseTextureOptions & ISamplerOptions>) {
        for (let key in options) {
            if (options[key] != null) {
                this[key] = options[key]
            }
        }
        this.create();
    }

    destroy() {
        this._context.gl.deleteTexture(this.texture);
    }
}

export enum TextureSourceEnum {
    TYPED_ARRAY,
    FRAME_BUFFER,
    IMAGE_SOURCE
}

// export interface ITextureOptions extends IBaseTextureOptions {
//     width?: number;
//     height?: number;
//     source: {
//         framebuffer?: FrameBuffer;
//         xOffset?: number;
//         yOffset?: number;
//         arrayBufferView?: TypedArray;
//     } | any;
//     // sampler?: ISamplerOptions;
// }


export interface IBaseTextureOptions extends ISamplerOptions {
    pixelFormat?: PixelFormatEnum;
    pixelDatatype?: PixelDatatypeEnum;
    preMultiplyAlpha?: boolean;
    flipY?: boolean;
}


export interface ITypedArrayTexOpts extends IBaseTextureOptions {
    width: number;
    height: number;
    arrayBufferView: TypedArray | null;
}

export interface IImageSourceTexOpts extends IBaseTextureOptions {
    image: TexImageSource;
}

export interface IFrameBufferTexOpts extends IBaseTextureOptions {
    width: number;
    height: number;
    framebuffer: FrameBuffer;
    xOffset?: number;
    yOffset?: number;
}

export interface ISamplerOptions {
    // ----------------texParameteri-------------
    filterMax?: TextureFilterEnum;
    filterMin?: TextureFilterEnum;
    wrapS?: TextureWrapEnum;
    wrapT?: TextureWrapEnum;
    maximumAnisotropy?: number;
    enableMipmap?: boolean;
    mipmapFilter?: TextureFilterEnum;
}
export enum MipmapHintEnum {
    DONT_CARE = GlConstants.DONT_CARE,
    FASTEST = GlConstants.FASTEST,
    NICEST = GlConstants.NICEST,
}
