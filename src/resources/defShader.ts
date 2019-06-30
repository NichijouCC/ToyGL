import { Shader } from "./assets/shader";
import { GlRender } from "../render/glRender";
import { Color } from "../mathD/color";

export class DefShader {
    private static defShader: { [type: string]: Shader } = {};
    static fromType(type: string): Shader {
        if (this.defShader[type] == null) {
            switch (type) {
                case "color":
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
                    this.defShader[type] = Shader.fromCustomData({
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
                    });
                    break;
                case "base":
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
                    this.defShader[type] = Shader.fromCustomData({
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
                    });
                    break;
                default:
                    console.warn("Unkowned default shader type:", type);
                    return null;
            }
        }
        return this.defShader[type];
    }
}
