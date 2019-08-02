import { Shader } from "../assets/shader";
import { GlRender } from "../../render/glRender";
import { Color } from "../../mathD/color";
import { DefTextrue } from "./defTexture";

export type shaderType = "2dColor" | "base" | "baseTex" | "alphaTex" | "2dTex";
export class DefShader {
    private static defShader: { [type: string]: Shader } = {};

    private static _color2d: Shader;
    static get COLOR2D() {
        if (this._color2d == null) {
            this._color2d = this.fromType("2dColor");
        }
        return this._color2d;
    }

    private static _tex2d: Shader;
    static get TEX2D() {
        if (this._tex2d == null) {
            this._tex2d = this.fromType("2dTex");
        }
        return this._tex2d;
    }

    private static _base: Shader;
    static get BASE() {
        if (this._base == null) {
            this._base = this.fromType("base");
        }
        return this._base;
    }

    private static _baseTex3d: Shader;
    static get TEX3D() {
        if (this._baseTex3d == null) {
            this._baseTex3d = this.fromType("baseTex");
        }
        return this._baseTex3d;
    }

    private static _alphaTex: Shader;
    static get ALPHATEX() {
        if (this._alphaTex == null) {
            this._alphaTex = this.fromType("alphaTex");
        }
        return this._alphaTex;
    }
    static fromType(type: shaderType): Shader {
        if (this.defShader[type] == null) {
            switch (type) {
                case "2dColor":
                    this.defShader[type] = this.create2DColorShader();
                    break;
                case "2dTex":
                    this.defShader[type] = this.create2DTextureShader();
                    break;
                case "base":
                    this.defShader[type] = this.create3DBaseShder();
                    break;
                case "baseTex":
                    this.defShader[type] = this.create3DTexShder();
                    break;
                case "alphaTex":
                    this.defShader[type] = this.createAlphaTestShder();
                    break;
                default:
                    console.warn("Unkowned default shader type:", type);
                    return null;
            }
        }
        return this.defShader[type];
    }

    private static create2DColorShader() {
        let colorVs =
            "\
          attribute vec3 POSITION;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              gl_Position = tmplet_1;\
          }";

        let colorFs =
            "\
            uniform highp vec4 MainColor;\
            void main()\
            {\
                gl_FragData[0] = MainColor;\
            }";
        return Shader.fromCustomData({
            passes: [
                {
                    program: {
                        vs: colorVs,
                        fs: colorFs,
                        name: "defcolor",
                    },
                    states: {
                        enableCullFace: false,
                    },
                },
            ],
            name: "def_color",
        });
    }
    private static create2DTextureShader() {
        let effectVs =
            "\
          attribute vec3 POSITION;\
          attribute vec3 TEXCOORD_0;\
          varying mediump vec2 xlv_TEXCOORD0;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz*2.0,1.0);\
              xlv_TEXCOORD0 = TEXCOORD_0.xy;\
              gl_Position = tmplet_1;\
          }";

        let effectFs =
            "\
            uniform highp vec4 MainColor;\
            uniform lowp sampler2D _MainTex;\
            varying mediump vec2 xlv_TEXCOORD0;\
            void main()\
            {\
                gl_FragData[0] = texture2D(_MainTex, xlv_TEXCOORD0);\
            }";
        return Shader.fromCustomData({
            passes: [
                {
                    program: {
                        vs: effectVs,
                        fs: effectFs,
                    },
                    states: {
                        enableCullFace: false,
                    },
                },
            ],
            name: "2dTex",
        });
    }
    private static create3DBaseShder() {
        let baseVs =
            "\
          attribute vec3 POSITION;\
          uniform highp mat4 u_mat_mvp;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";

        let baseFs =
            "\
            uniform highp vec4 MainColor;\
            void main()\
            {\
                gl_FragData[0] = MainColor;\
            }";
        return Shader.fromCustomData({
            passes: [
                {
                    program: {
                        vs: baseVs,
                        fs: baseFs,
                    },
                    states: {
                        enableCullFace: false,
                    },
                },
            ],
            mapUniformDef: { MainColor: Color.create() },
            name: "def_base",
        });
    }

    private static create3DTexShder() {
        let baseVs =
            "\
          attribute vec3 POSITION;\
          attribute vec3 TEXCOORD_0;\
          uniform highp mat4 u_mat_mvp;\
          varying mediump vec2 xlv_TEXCOORD0;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              xlv_TEXCOORD0 = TEXCOORD_0.xy;\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";

        let baseFs =
            "\
            uniform highp vec4 MainColor;\
            varying mediump vec2 xlv_TEXCOORD0;\
            uniform lowp sampler2D _MainTex;\
            void main()\
            {\
                gl_FragData[0] = texture2D(_MainTex, xlv_TEXCOORD0)*MainColor;\
            }";
        return Shader.fromCustomData({
            passes: [
                {
                    program: {
                        vs: baseVs,
                        fs: baseFs,
                    },
                    states: {
                        // enableCullFace: false,
                    },
                },
            ],
            mapUniformDef: { MainColor: Color.create(), _MainTex: DefTextrue.GIRD },
            name: "def_baseTex",
        });
    }
    private static createAlphaTestShder() {
        let baseVs =
            "\
          attribute vec3 POSITION;\
          attribute vec2 TEXCOORD_0;\
          uniform highp mat4 u_mat_mvp;\
          varying mediump vec2 xlv_TEXCOORD0;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              xlv_TEXCOORD0 = TEXCOORD_0.xy;\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";

        let baseFs =
            "\
            uniform highp vec4 MainColor;\
            uniform lowp float _AlphaCut;\
            varying mediump vec2 xlv_TEXCOORD0;\
            uniform lowp sampler2D _MainTex;\
            void main()\
            {\
                lowp vec4 basecolor = texture2D(_MainTex, xlv_TEXCOORD0);\
                if(basecolor.a < _AlphaCut)\
                {\
                    discard;\
                }\
                gl_FragData[0] = basecolor;\
            }";
        return Shader.fromCustomData({
            passes: [
                {
                    program: {
                        vs: baseVs,
                        fs: baseFs,
                    },
                    states: {
                        enableCullFace: false,
                    },
                },
            ],
            mapUniformDef: {
                _AlphaCut: 0.5,
            },
            name: "def_alphaTex",
        });
    }
}
