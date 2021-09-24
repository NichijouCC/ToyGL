import { GlConstants, DepthFuncEnum, BlendParamEnum, BlendEquationEnum, StencilFuncEnum } from "../../webgl";
import { Rect } from "../../mathD/rect";

export class RenderState {
    cull: {
        enabled: boolean,
        cullBack: boolean,
    } = { enabled: true, cullBack: true };

    colorWrite: {
        red: boolean,
        green: boolean,
        blue: boolean,
        alpha: boolean,
    } = { red: true, green: true, blue: true, alpha: true };

    depthWrite: boolean = true;
    depthTest: {
        enabled: boolean;
        depthFunc: DepthFuncEnum
    } = { enabled: true, depthFunc: DepthFuncEnum.LEQUAL };

    blend: {
        enabled: boolean
        blendSrc: BlendParamEnum,
        blendDst: BlendParamEnum,
        blendEquation: BlendEquationEnum,

        enableSeparateBlend: boolean,
        blendSrcAlpha: BlendParamEnum,
        blendDstAlpha: BlendParamEnum,
        blendAlphaEquation: BlendEquationEnum,
    } = {
            enabled: false,
            blendSrc: BlendParamEnum.SRC_ALPHA,
            blendDst: BlendParamEnum.ONE,
            blendEquation: BlendEquationEnum.FUNC_ADD,
            enableSeparateBlend: false,
            blendSrcAlpha: BlendParamEnum.SRC_ALPHA,
            blendDstAlpha: BlendParamEnum.ONE,
            blendAlphaEquation: BlendEquationEnum.FUNC_ADD
        };

    stencilTest: {
        enabled: boolean,
        stencilFunction: number,
        stencilRefValue: number,
        stencilMask: number,
        stencilFail: number,
        stencilPassZfail: number,
        stencilFailZpass: number,

        enableSeparateStencil: boolean,
        stencilFunctionBack: number,
        stencilRefValueBack: number,
        stencilMaskBack: number,
        stencilFailBack: number,
        stencilPassZfailBack: number,
        stencilFailZpassBack: number,
    } = {
            enabled: false,
            stencilFunction: StencilFuncEnum.ALWAYS,
            stencilRefValue: 1,
            stencilMask: 0xff,
            stencilFail: GlConstants.KEEP,
            stencilPassZfail: GlConstants.REPLACE,
            stencilFailZpass: GlConstants.KEEP,

            enableSeparateStencil: false,
            stencilFunctionBack: StencilFuncEnum.ALWAYS,
            stencilRefValueBack: 1,
            stencilMaskBack: 0xff,
            stencilFailBack: GlConstants.KEEP,
            stencilPassZfailBack: GlConstants.REPLACE,
            stencilFailZpassBack: GlConstants.KEEP
        };

    scissorTest: {
        enabled: boolean,
        rectangle: Rect,
    } = {
            enabled: false,
            rectangle: Rect.create()
        }
}
