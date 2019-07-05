import { Material } from "../assets/material";
import { DefShader } from "./defShader";

export class DefMaterial {
    private static defMat: { [type: string]: Material } = {};
    static fromType(type: "color" | "base" | "baseTex" | "alphaTex"): Material {
        if (this.defMat[type] == null) {
            switch (type) {
                case "color":
                    let matColor = new Material();
                    matColor.shader = DefShader.fromType("color");
                    this.defMat[type] = matColor;
                    break;
                case "base":
                    let baseMat = new Material();
                    baseMat.shader = DefShader.fromType("base");
                    this.defMat[type] = baseMat;
                    break;
                case "baseTex":
                    let baseTexMat = new Material();
                    baseTexMat.shader = DefShader.fromType("baseTex");
                    this.defMat[type] = baseTexMat;
                    break;
                case "alphaTex":
                    let alphaTexMat = new Material();
                    alphaTexMat.shader = DefShader.fromType("alphaTex");
                    this.defMat[type] = alphaTexMat;
                    break;
                default:
                    console.warn("Unkowned default shader type:", type);
                    return null;
            }
        }
        return this.defMat[type];
    }
}
