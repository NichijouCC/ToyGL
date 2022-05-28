import { GlConstants, DepthFuncEnum, BlendParamEnum, BlendEquationEnum, StencilFuncEnum, IBlendState, IDepthState, IColorMaskState, ICullState, CullFaceModeEnum, IStencilState, IScissorState } from "../webgl";
import { Rect } from "../mathD/rect";


export interface IRenderState {
    cull: Omit<ICullState, "force">
    colorMask: Omit<IColorMaskState, "force">
    depth: Omit<IDepthState, "force">
    blend: Omit<IBlendState, "force">
    stencilTest: Omit<IStencilState, "force">
    scissorTest: Omit<IScissorState, "force">
}

export class RenderState {
    cull: Omit<ICullState, "force"> = { enable: true, cullMode: CullFaceModeEnum.BACK }

    colorMask: Omit<IColorMaskState, "force"> = { writeR: true, writeG: true, writeB: true, writeA: true };

    depth: Omit<IDepthState, "force"> = {
        depthTest: true,
        depthTestFunc: DepthFuncEnum.LEQUAL,
        depthWrite: true,
    }

    blend: Omit<IBlendState, "force"> = {
        enable: false,
        blendSrc: BlendParamEnum.SRC_ALPHA,
        blendDst: BlendParamEnum.ONE,
        blendEquation: BlendEquationEnum.FUNC_ADD,
    };

    stencilTest: Omit<IStencilState, "force"> = {
        enable: false,
        stencilFunction: StencilFuncEnum.ALWAYS,
        stencilRefValue: 1,
        stencilMask: 0xff,
        stencilFail: GlConstants.KEEP,
        stencilPassZfail: GlConstants.REPLACE,
        stencilFailZpass: GlConstants.KEEP,
    };

    scissorTest: Omit<IScissorState, "force"> = {
        enable: false,
        scissorRect: Rect.create()
    }
}

export const BlitRenderState: IRenderState = {
    cull: { enable: true, cullMode: CullFaceModeEnum.BACK },
    colorMask: { writeR: true, writeG: true, writeB: true, writeA: true },
    depth: {
        depthTest: false,
        depthTestFunc: DepthFuncEnum.LEQUAL,
        depthWrite: false,
    },
    blend: {
        enable: false,
        blendSrc: BlendParamEnum.SRC_ALPHA,
        blendDst: BlendParamEnum.ONE,
        blendEquation: BlendEquationEnum.FUNC_ADD,
    },
    stencilTest: {
        enable: false,
        stencilFunction: StencilFuncEnum.ALWAYS,
        stencilRefValue: 1,
        stencilMask: 0xff,
        stencilFail: GlConstants.KEEP,
        stencilPassZfail: GlConstants.REPLACE,
        stencilFailZpass: GlConstants.KEEP,
    },
    scissorTest: {
        enable: false,
        scissorRect: Rect.create()
    }
}