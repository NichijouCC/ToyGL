/**
 * 渲染的层级(从小到大绘制)
 */
export enum RenderLayerEnum
{
    Background = 1000,
    Geometry = 2000,
    AlphaTest = 2450,
    Transparent = 3000,
    Overlay = 4000
}
