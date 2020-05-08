import { Shader } from "../../scene/asset/material/Shader";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import baseVs from '../../shaders/Unlit.vert.glsl';
import baseFs from '../../shaders/Unlit.vert.glsl';

namespace Private {
    export const color_2d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION
        },
        vsStr: `attribute vec3 POSITION;
        void main()
        {
            highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
            gl_Position = tmplet_1;\
        }`,
        fsStr: `uniform highp vec4 MainColor;
        void main()
        {
            gl_FragData[0] = MainColor;
        }`
    });
    export const tex_2d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: `attribute vec3 POSITION;
          attribute vec2 TEXCOORD_0;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              highp vec4 tmplet_1=vec4(POSITION.xyz*2.0,1.0);
              xlv_TEXCOORD0 = TEXCOORD_0.xy;
              gl_Position = tmplet_1;
          }`,
        fsStr: `uniform highp vec4 MainColor;
          uniform lowp sampler2D MainTex;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0);
          }`
    });

    export const color_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
        },
        vsStr: `attribute vec3 POSITION;
        uniform highp mat4 czm_modelViewp;
        void main()
        {
            highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);
            gl_Position = czm_modelViewp * tmplet_1;
        }`,
        fsStr: `uniform highp vec4 MainColor;
        void main()
        {
            gl_FragData[0] = MainColor;
        }`
    });
    export const tex_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
        },
        vsStr: `attribute vec3 POSITION;
        attribute vec3 TEXCOORD_0;
        uniform highp mat4 czm_modelViewp;
        varying mediump vec2 xlv_TEXCOORD0;
        void main()
        {
            highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);
            xlv_TEXCOORD0 = TEXCOORD_0.xy;
            gl_Position = czm_modelViewp * tmplet_1;
        }`,
        fsStr: `uniform highp vec4 MainColor;
        varying mediump vec2 xlv_TEXCOORD0;
        uniform lowp sampler2D MainTex;
        void main()
        {
            gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0)*MainColor;
        }`
    });

    export const unlit_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
        },
        vsStr: baseVs,
        fsStr: baseFs
    });
}
export class DefaultShader {
    static get color_2d() { return Private.color_2d };
    static get color_3d() { return Private.color_3d };
    static get tex_2d() { return Private.tex_2d };
    static get tex_3d() { return Private.tex_3d };
    static get unlit_3d() { return Private.unlit_3d };
}