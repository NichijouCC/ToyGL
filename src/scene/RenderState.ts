import { GlConstants } from "../webgl/GLconstant";
import { Rect } from "../mathD/rect";

export class RenderState
{
    cull: {
        enabled: boolean,
        cullBack: boolean,
    };
    colorWrite: {
        red: boolean,
        green: boolean,
        blue: boolean,
        alpha: boolean,
    };
    depthWrite: boolean;
    depthTest: {
        enabled: boolean;
        depthFunc: DepthFuncEnum
    };
    blend: {
        enabled: boolean
        blendSrc: BlendParamEnum,
        blendDst: BlendParamEnum,
        blendEquation: BlendEquationEnum,

        enableSeparateBlend: boolean,
        blendSrcAlpha: BlendParamEnum,
        blendDstAlpha: BlendParamEnum,
        blendAlphaEquation: BlendEquationEnum,
    };
    stencilTest: {
        enabled: boolean,
        stencilFunction: number,
        stencilRefValue: number,
        stencilMask: number,
        stencilFail: number,
        stencilPassZfail: number,
        stencilFaileZpass: number,

        enableSeparateStencil: boolean,
        stencilFunctionBack: number,
        stencilRefValueBack: number,
        stencilMaskBack: number,
        stencilFailBack: number,
        stencilPassZfailBack: number,
        stencilFaileZpassBack: number,
    };
    scissorTest: {
        enabled: boolean,
        rectangle: Rect,
    };
}

export enum DepthFuncEnum
{
    NEVER = GlConstants.NEVER,
    LESS = GlConstants.LESS,
    EQUAL = GlConstants.EQUAL,
    LEQUAL = GlConstants.LEQUAL,
    GREATER = GlConstants.GREATER,
    NOTEQUAL = GlConstants.NOTEQUAL,
    GEQUAL = GlConstants.GEQUAL,
    ALWAYS = GlConstants.ALWAYS,
}
export enum BlendEquationEnum
{
    /**
     * 源+目的地
     */
    FUNC_ADD = GlConstants.FUNC_ADD,
    /**
     * 源 - 目的地
     */
    FUNC_SUBTRACT = GlConstants.FUNC_SUBTRACT,
    /**
     * 目的地 - 源
     */
    FUNC_REVERSE_SUBTRACT = GlConstants.FUNC_REVERSE_SUBTRACT,
}

export enum BlendParamEnum
{
    ONE = GlConstants.ONE,
    SRC_ALPHA = GlConstants.SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA = GlConstants.ONE_MINUS_SRC_ALPHA,
}

export enum StencilFuncEnum
{
    /**
     * Never pass
     */
    NEVER = GlConstants.NEVER,
    /**
     * Pass if (ref & mask) <  (stencil & mask).
     */
    LESS = GlConstants.LESS,
    /**
     * Pass if (ref & mask) =  (stencil & mask).
     */
    EQUAL = GlConstants.EQUAL,
    /**
     * Pass if (ref & mask) <= (stencil & mask).
     */
    LEQUAL = GlConstants.LEQUAL,
    /**
     * Pass if (ref & mask) >  (stencil & mask).
     */
    GREATER = GlConstants.GREATER,
    /**
     * Pass if (ref & mask) != (stencil & mask).
     */
    NOTEQUAL = GlConstants.NOTEQUAL,
    /**
     * Pass if (ref & mask) >= (stencil & mask).
     */
    GEQUAL = GlConstants.GEQUAL,
    /**
     * Always pass.
     */
    ALWAYS = GlConstants.ALWAYS,
}

export enum StencilOperationEnum
{
    KEEP = GlConstants.KEEP,
    REPLACE = GlConstants.REPLACE,
}