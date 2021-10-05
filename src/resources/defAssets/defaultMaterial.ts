import { Material } from "../../render/material";
import { DefaultShader } from "./defaultShader";
import { Color } from "../../mathD/color";
import { DefaultTexture } from "./defaultTexture";

namespace Private {
    export const color_2d = new Material({ name: "color_2d", shader: DefaultShader.color_2d, uniformParameters: { MainColor: Color.create(1, 1, 1, 1) } });
    export const color_3d = new Material({ name: "color_3d", shader: DefaultShader.color_3d, uniformParameters: { MainColor: Color.create(1, 0, 0, 1) } });
    export const tex_2d = new Material({
        name: "tex_2d",
        shader: DefaultShader.tex_2d,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1),
            MainTex: DefaultTexture.white
        }
    });
    export const unlit_3d = new Material({
        name: "unlit_3d",
        shader: DefaultShader.unlit_3d,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1)
        }
    });
    export const unlit_3d_1 = new Material({
        name: "unlit_3d",
        shader: DefaultShader.unlit_3d_1,
        uniformParameters: {
            MainColor: Color.create(1, 1, 1, 1)
        }
    });
}

export class DefaultMaterial {
    static get color_2d() { return Private.color_2d.clone(); };
    static get color_3d() { return Private.color_3d.clone(); };
    static get tex_2d() { return Private.tex_2d.clone(); };
    static get unlit_3d() { return Private.unlit_3d.clone(); };
    static get unlit_3d_1() { return Private.unlit_3d_1.clone(); };
}
