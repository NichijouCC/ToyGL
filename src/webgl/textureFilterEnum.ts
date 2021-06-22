import { GlConstants } from "./glConstant";
/**
 * 由mipmap filter type 和 texture filter type 来决定最终的 filter type
 */
export enum TextureFilterEnum {
    NEAREST = GlConstants.NEAREST,
    LINEAR = GlConstants.LINEAR,
}

export namespace TextureFilterEnum {
    export function realFilter(filter: TextureFilterEnum, enableMipmap: boolean, mipmapFilter: TextureFilterEnum): number {
        if (enableMipmap) {
            if (mipmapFilter == TextureFilterEnum.LINEAR) {
                if (filter == TextureFilterEnum.LINEAR) {
                    return GlConstants.LINEAR_MIPMAP_LINEAR;
                } else {
                    return GlConstants.NEAREST_MIPMAP_LINEAR;
                }
            } else {
                if (filter == TextureFilterEnum.LINEAR) {
                    return GlConstants.LINEAR_MIPMAP_NEAREST;
                } else {
                    return GlConstants.LINEAR_MIPMAP_NEAREST;
                }
            }
        } else {
            return filter;
        }
    }
}
