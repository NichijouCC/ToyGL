import { Material } from "../../scene/asset/material/Material"
import { DefaultShader } from "./DefaultShader";
import { Color } from "../../mathD/color";
import { DefaultTexture } from "./DefaultTexture";

namespace Private {
    export const color_2d = new Material({ name: "color_2d", shaderOption: DefaultShader.color_2d, uniformParameters: { MainColor: Color.create(1, 1, 1, 1) } });
    export const color_3d = new Material({ name: "color_3d", shaderOption: DefaultShader.color_3d, uniformParameters: { MainColor: Color.create(1, 0, 0, 1) } });
    export const tex_2d = new Material({
        name: "tex_2d",
        shaderOption: DefaultShader.tex_2d,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1),
            MainTex: DefaultTexture.white
        }
    });
    export const tex_3d = new Material({
        name: "tex_3d",
        shaderOption: DefaultShader.tex_3d,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1),
            MainTex: DefaultTexture.white
        }
    });

    export const unlit_3d = new Material({
        name: "unlit_3d",
        shaderOption: DefaultShader.unlit_3d,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1),
        }
    });
}

export class DefaultMaterial {
    static get color_2d() { return Private.color_2d };
    static get color_3d() { return Private.color_3d };
    static get tex_2d() { return Private.tex_2d };
    static get tex_3d() { return Private.tex_3d };
    static get unlit_3d() { return Private.unlit_3d };
}