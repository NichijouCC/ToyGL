import { Material } from "../assets/material";
import { DefShader, shaderType } from "./defShader";

export class DefMaterial {
    private static defMat: { [type: string]: Material } = {};
    static fromType(type: shaderType): Material {
        if (this.defMat[type] == null) {
            let shader = DefShader.fromType(type);
            if (shader != null) {
                let mat = new Material();
                mat.shader = shader;
                this.defMat[type] = mat;
            }
        }
        return this.defMat[type];
    }
}
