import { GlConstants } from "./GlConstant";
import { Color } from "../mathD/color";

export enum CullFaceEnum {
    FRONT,
    BACK,
}
export enum DepthFucEnum {
    LEQUAL = GlConstants.LEQUAL,
    ALWAYS = GlConstants.ALWAYS,
    NEVER = GlConstants.NEVER,
    LESS = GlConstants.LESS,
}

export enum BlendEquationEnum {
    /**
     * 源+目的地（默认值）
     */
    FUNC_ADD = GlConstants.FUNC_ADD,
    /**
     * 源 - 目的地，
     */
    FUNC_SUBTRACT = GlConstants.FUNC_SUBTRACT,
    /**
     * 目的地 - 源
     */
    FUNC_REVERSE_SUBTRACT = GlConstants.FUNC_REVERSE_SUBTRACT,
}

export enum BlendParameterEnum {
    ONE = GlConstants.ONE,
    SRC_ALPHA = GlConstants.SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA = GlConstants.ONE_MINUS_SRC_ALPHA,
}
export interface IpassState {
    cullFace?: {
        enable?: boolean;
        type?: CullFaceEnum;
    };
    depth?: {
        writeMask?: boolean;
        test?: {
            enable?: boolean;
            fuc?: DepthFucEnum;
        };
    };
    blend?: {
        enable?: boolean;
        blendEquation?: BlendEquationEnum;
        enableBlendSeparate?: boolean;
        blendSrc?: BlendParameterEnum;
        blendDst?: BlendParameterEnum;
        blendSrc_alpha?: BlendParameterEnum;
        blendDst_alpha?: BlendParameterEnum;
    };
}

export interface IglobalState {
    clear: {
        color: Color;
        depth: number;
        stencil: number;
    };
}

type IrenderState = IpassState | IglobalState;
