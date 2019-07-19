import { GlRender, IgeometryOptions } from "../../render/glRender";
import { Geometry } from "../assets/geometry";

export type DefGeometryType = "cube" | "quad";

export class DefGeometry {
    private static defGeometry: { [type: string]: Geometry } = {};
    static fromType(typeEnum: DefGeometryType): Geometry {
        if (this.defGeometry[typeEnum] == null) {
            let geometryOption: IgeometryOptions;
            switch (typeEnum) {
                case "quad":
                    geometryOption = {
                        name: "def_quad",
                        atts: {
                            POSITION: [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0],
                            TEXCOORD_0: [0, 0, 0, 1, 1, 1, 1, 0],
                        },
                        indices: [0, 2, 1, 0, 3, 2],
                    };
                    break;
                case "cube":
                    geometryOption = this.createCube();
                    break;
                default:
                    console.warn("Unkowned default mesh type:", typeEnum);
                    return null;
            }
            if (geometryOption != null) {
                this.defGeometry[typeEnum] = Geometry.fromCustomData(geometryOption);
            }
        }
        return this.defGeometry[typeEnum];
    }

    private static createCube() {
        let bassInf: { posarr: number[]; uvArray: number[]; indices: number[] } = {
            posarr: [],
            uvArray: [],
            indices: [],
        };
        this.addQuad(
            bassInf,
            [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 2, 1, 0, 3, 2],
        ); //前
        this.addQuad(
            bassInf,
            [-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 1, 2, 0, 2, 3],
        ); //后
        this.addQuad(
            bassInf,
            [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 1, 2, 0, 2, 3],
        ); //左
        this.addQuad(
            bassInf,
            [0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 2, 1, 0, 3, 2],
        ); //右
        this.addQuad(
            bassInf,
            [-0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 2, 1, 0, 3, 2],
        ); //上
        this.addQuad(
            bassInf,
            [-0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 1, 2, 0, 2, 3],
        ); //下
        return {
            name: "def_cube",
            atts: {
                POSITION: bassInf.posarr,
                TEXCOORD_0: bassInf.uvArray,
            },
            indices: bassInf.indices,
        };
    }

    private static addQuad(
        bassInf: { posarr: number[]; uvArray: number[]; indices: number[] },
        posarr: number[],
        uvArray: number[],
        indices: number[],
    ) {
        let maxIndex = bassInf.posarr.length / 3;

        for (let i = 0; i < posarr.length; i++) {
            bassInf.posarr.push(posarr[i]);
        }
        for (let i = 0; i < uvArray.length; i++) {
            bassInf.uvArray.push(uvArray[i]);
        }
        for (let i = 0; i < indices.length; i++) {
            bassInf.indices.push(maxIndex + indices[i]);
        }
    }
}
