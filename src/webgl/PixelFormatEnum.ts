/* eslint-disable no-redeclare */
/* eslint-disable import/export */
import { TypedArray } from "../core/TypedArray";
import { GlConstants } from "./GLconstant";
import { PixelDatatypeEnum } from "./PixelDatatype";

export enum PixelFormatEnum {
    /**
     * A pixel format containing a depth value.
     */
    DEPTH_COMPONENT = GlConstants.DEPTH_COMPONENT,

    /**
     * A pixel format containing a depth and stencil value, most often used with {@link PixelDatatype.UNSIGNED_INT_24_8}.
     */
    DEPTH_STENCIL = GlConstants.DEPTH_STENCIL,

    /**
     * A pixel format containing an alpha channel.
     */
    ALPHA = GlConstants.ALPHA,

    /**
     * A pixel format containing red, green, and blue channels.
     */
    RGB = GlConstants.RGB,

    /**
     * A pixel format containing red, green, blue, and alpha channels.
     */
    RGBA = GlConstants.RGBA,

    /**
     * A pixel format containing a luminance (intensity) channel.
     */
    LUMINANCE = GlConstants.LUMINANCE,

    /**
     * A pixel format containing luminance (intensity) and alpha channels.
     */
    LUMINANCE_ALPHA = GlConstants.LUMINANCE_ALPHA,

    /**
     * A pixel format containing red, green, and blue channels that is DXT1 compressed.
     */
    RGB_DXT1 = GlConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,

    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT1 compressed.
     */
    RGBA_DXT1 = GlConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,

    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT3 compressed.
     */
    RGBA_DXT3 = GlConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,

    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT5 compressed.
     */
    RGBA_DXT5 = GlConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,

    /**
     * A pixel format containing red, green, and blue channels that is PVR 4bpp compressed.
     */
    RGB_PVRTC_4BPPV1 = GlConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,

    /**
     * A pixel format containing red, green, and blue channels that is PVR 2bpp compressed.
     */
    RGB_PVRTC_2BPPV1 = GlConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,

    /**
     * A pixel format containing red, green, blue, and alpha channels that is PVR 4bpp compressed.
     */
    RGBA_PVRTC_4BPPV1 = GlConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,

    /**
     * A pixel format containing red, green, blue, and alpha channels that is PVR 2bpp compressed.
     */
    RGBA_PVRTC_2BPPV1 = GlConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,

    /**
     * A pixel format containing red, green, and blue channels that is ETC1 compressed.
     */
    RGB_ETC1 = GlConstants.COMPRESSED_RGB_ETC1_WEBGL,
}

export namespace PixelFormatEnum {
    /**
     * @private
     */
    export function componentsLength(pixelFormat: PixelFormatEnum) {
        switch (pixelFormat) {
        case PixelFormatEnum.RGB:
            return 3;
        case PixelFormatEnum.RGBA:
            return 4;
        case PixelFormatEnum.LUMINANCE_ALPHA:
            return 2;
        case PixelFormatEnum.ALPHA:
        case PixelFormatEnum.LUMINANCE:
            return 1;
        default:
            return 1;
        }
    }
    export function validate(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.DEPTH_COMPONENT ||
            pixelFormat === PixelFormatEnum.DEPTH_STENCIL ||
            pixelFormat === PixelFormatEnum.ALPHA ||
            pixelFormat === PixelFormatEnum.RGB ||
            pixelFormat === PixelFormatEnum.RGBA ||
            pixelFormat === PixelFormatEnum.LUMINANCE ||
            pixelFormat === PixelFormatEnum.LUMINANCE_ALPHA ||
            pixelFormat === PixelFormatEnum.RGB_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT5 ||
            pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1 ||
            pixelFormat === PixelFormatEnum.RGB_ETC1;
    }
    export function isColorFormat(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.ALPHA ||
            pixelFormat === PixelFormatEnum.RGB ||
            pixelFormat === PixelFormatEnum.RGBA ||
            pixelFormat === PixelFormatEnum.LUMINANCE ||
            pixelFormat === PixelFormatEnum.LUMINANCE_ALPHA;
    }
    export function isDepthFormat(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.DEPTH_COMPONENT ||
            pixelFormat === PixelFormatEnum.DEPTH_STENCIL;
    }
    export function isCompressedFormat(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.RGB_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT5 ||
            pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1 ||
            pixelFormat === PixelFormatEnum.RGB_ETC1;
    }
    export function isDXTFormat(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.RGB_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
            pixelFormat === PixelFormatEnum.RGBA_DXT5;
    }
    export function isPVRTCFormat(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
            pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1;
    }
    export function isETC1Format(pixelFormat: PixelFormatEnum) {
        return pixelFormat === PixelFormatEnum.RGB_ETC1;
    }
    ;
    export function compressedTextureSizeInBytes(pixelFormat: PixelFormatEnum, width: number, height: number) {
        switch (pixelFormat) {
        case PixelFormatEnum.RGB_DXT1:
        case PixelFormatEnum.RGBA_DXT1:
        case PixelFormatEnum.RGB_ETC1:
            return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
        case PixelFormatEnum.RGBA_DXT3:
        case PixelFormatEnum.RGBA_DXT5:
            return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
        case PixelFormatEnum.RGB_PVRTC_4BPPV1:
        case PixelFormatEnum.RGBA_PVRTC_4BPPV1:
            return Math.floor((Math.max(width, 8) * Math.max(height, 8) * 4 + 7) / 8);
        case PixelFormatEnum.RGB_PVRTC_2BPPV1:
        case PixelFormatEnum.RGBA_PVRTC_2BPPV1:
            return Math.floor((Math.max(width, 16) * Math.max(height, 8) * 2 + 7) / 8);
        default:
            return 0;
        }
    }
    export function textureSizeInBytes(pixelFormat: PixelFormatEnum, pixelDatatype: PixelDatatypeEnum, width: number, height: number) {
        var componentsLength = PixelFormatEnum.componentsLength(pixelFormat);
        if (PixelDatatypeEnum.isPacked(pixelDatatype)) {
            componentsLength = 1;
        }
        return componentsLength * PixelDatatypeEnum.sizeInBytes(pixelDatatype) * width * height;
    }
    export function alignmentInBytes(pixelFormat: PixelFormatEnum, pixelDatatype: PixelDatatypeEnum, width: number) {
        var mod = PixelFormatEnum.textureSizeInBytes(pixelFormat, pixelDatatype, width, 1) % 4;
        return mod === 0 ? 4 : (mod === 2 ? 2 : 1);
    }
    export function createTypedArray(pixelFormat: PixelFormatEnum, pixelDatatype: PixelDatatypeEnum, width: number, height: number) {
        var constructor;
        var sizeInBytes = PixelDatatypeEnum.sizeInBytes(pixelDatatype);
        if (sizeInBytes === Uint8Array.BYTES_PER_ELEMENT) {
            constructor = Uint8Array;
        } else if (sizeInBytes === Uint16Array.BYTES_PER_ELEMENT) {
            constructor = Uint16Array;
        } else if (sizeInBytes === Float32Array.BYTES_PER_ELEMENT && pixelDatatype === PixelDatatypeEnum.FLOAT) {
            constructor = Float32Array;
        } else {
            constructor = Uint32Array;
        }
        var size = PixelFormatEnum.componentsLength(pixelFormat) * width * height;
        return new constructor(size);
    }
    export function flipY(bufferView: TypedArray, pixelFormat: PixelFormatEnum, pixelDatatype: PixelDatatypeEnum, width: number, height: number) {
        if (height === 1) {
            return bufferView;
        }
        var flipped = PixelFormatEnum.createTypedArray(pixelFormat, pixelDatatype, width, height);
        var numberOfComponents = PixelFormatEnum.componentsLength(pixelFormat);
        var textureWidth = width * numberOfComponents;
        for (var i = 0; i < height; ++i) {
            var row = i * height * numberOfComponents;
            var flippedRow = (height - i - 1) * height * numberOfComponents;
            for (var j = 0; j < textureWidth; ++j) {
                flipped[flippedRow + j] = bufferView[row + j];
            }
        }
        return flipped;
    }
}
