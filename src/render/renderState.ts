import { GlConstants, DepthFuncEnum, BlendParamEnum, BlendEquationEnum, StencilFuncEnum, IBlendState, IDepthState, IColorMaskState, ICullState, CullFaceModeEnum, IStencilState, IScissorState } from "../webgl";
import { Rect } from "../mathD/rect";

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
