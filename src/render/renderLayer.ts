/**
 * 渲染的层级(从小到大绘制)
 */
export enum RenderTypeEnum {
    /**
     * Skybox shaders. 天空盒着色器。
     */
    BACKGROUND = 1000,
    /**
     *  用于大多数着色器（法线着色器、自发光着色器、反射着色器以及地形的着色器）。
     */
    OPAQUE = 2000,
    /**
     *  做alpha通道discard的着色器
     */
    ALPHA_CUT = 2450,
    /**
     * 用于半透明着色器
     */
    TRANSPARENT = 3000,
    /**
     * GUITexture, Halo, Flare shaders. 光晕着色器、闪光着色器。
     */
    OVERLAY = 4000
}
