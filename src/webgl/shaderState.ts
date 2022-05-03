import { GlConstants } from "./glConstant";

export enum DepthFuncEnum {
    NEVER = GlConstants.NEVER,
    LESS = GlConstants.LESS,
    EQUAL = GlConstants.EQUAL,
    LEQUAL = GlConstants.LEQUAL,
    GREATER = GlConstants.GREATER,
    NOTEQUAL = GlConstants.NOTEQUAL,
    GEQUAL = GlConstants.GEQUAL,
    ALWAYS = GlConstants.ALWAYS,
}
export enum BlendEquationEnum {
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

export enum BlendParamEnum {
    ZERO = GlConstants.ZERO,
    ONE = GlConstants.ONE,
    SRC_COLOR = GlConstants.SRC_COLOR,
    ONE_MINUS_SRC_COLOR = GlConstants.ONE_MINUS_SRC_COLOR,
    SRC_ALPHA = GlConstants.SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA = GlConstants.ONE_MINUS_SRC_ALPHA,
    DST_ALPHA = GlConstants.DST_ALPHA,
    ONE_MINUS_DST_ALPHA = GlConstants.ONE_MINUS_DST_ALPHA,
    DST_COLOR = GlConstants.DST_COLOR,
    ONE_MINUS_DST_COLOR = GlConstants.ONE_MINUS_DST_COLOR,
}

export enum StencilFuncEnum {
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

export enum StencilOperationEnum {
    KEEP = GlConstants.KEEP,
    REPLACE = GlConstants.REPLACE,
}

export enum CullFaceModeEnum {
    FRONT = GlConstants.FRONT,
    BACK = GlConstants.BACK,
    ALL = GlConstants.FRONT_AND_BACK,
}
