import { GlConstants } from "./GLconstant";
export enum TextureFilterEnum
{
    /**
     * Samples the texture by returning the closest pixel.
     *
     * @type {Number}
     * @constant
     */
    NEAREST = GlConstants.NEAREST,
    /**
     * Samples the texture through bi-linear interpolation of the four nearest pixels. This produces smoother results than <code>NEAREST</code> filtering.
     *
     * @type {Number}
     * @constant
     */
    LINEAR = GlConstants.LINEAR,
    /**
     * Selects the nearest mip level and applies nearest sampling within that level.
     * <p>
     * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
     * </p>
     *
     * @type {Number}
     * @constant
     */
    NEAREST_MIPMAP_NEAREST = GlConstants.NEAREST_MIPMAP_NEAREST,
    /**
     * Selects the nearest mip level and applies linear sampling within that level.
     * <p>
     * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
     * </p>
     *
     * @type {Number}
     * @constant
     */
    LINEAR_MIPMAP_NEAREST = GlConstants.LINEAR_MIPMAP_NEAREST,
    /**
     * Read texture values with nearest sampling from two adjacent mip levels and linearly interpolate the results.
     * <p>
     * This option provides a good balance of visual quality and speed when sampling from a mipmapped texture.
     * </p>
     * <p>
     * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
     * </p>
     *
     * @type {Number}
     * @constant
     */
    NEAREST_MIPMAP_LINEAR = GlConstants.NEAREST_MIPMAP_LINEAR,
    /**
     * Read texture values with linear sampling from two adjacent mip levels and linearly interpolate the results.
     * <p>
     * This option provides a good balance of visual quality and speed when sampling from a mipmapped texture.
     * </p>
     * <p>
     * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
     * </p>
     * @type {Number}
     * @constant
     */
    LINEAR_MIPMAP_LINEAR = GlConstants.LINEAR_MIPMAP_LINEAR
}

export namespace TextureFilterEnum
{
    export function beMipmap(type: TextureFilterEnum)
    {
        return (type === TextureFilterEnum.NEAREST_MIPMAP_NEAREST) ||
            (type === TextureFilterEnum.NEAREST_MIPMAP_LINEAR) ||
            (type === TextureFilterEnum.LINEAR_MIPMAP_NEAREST) ||
            (type === TextureFilterEnum.LINEAR_MIPMAP_LINEAR);
    }
}
