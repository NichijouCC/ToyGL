import { GlRender } from "../render/glRender";
import { Geometry } from "./assets/geometry";

export class DefMesh {
    private static defMesh: { [type: string]: Geometry } = {};
    static fromType(type: string): Geometry {
        if (this.defMesh[type] == null) {
            let gemetryinfo;
            switch (type) {
                case "quad":
                    gemetryinfo = GlRender.createGeometry({
                        atts: {
                            aPos: [-0.5, -0.5, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0],
                            aUv: [0, 1, 0, 0, 1, 0, 1, 1],
                        },
                        indices: [0, 1, 2, 0, 3, 2],
                    });
                    break;
                default:
                    console.warn("Unkowned default mesh type:", type);
                    return null;
            }
            if (gemetryinfo != null) {
                this.defMesh[type] = new Geometry({ name: "def_" + type, beDefaultAsset: true });
                this.defMesh[type].data = gemetryinfo;
                return this.defMesh[type];
            }
        } else {
            return this.defMesh[type];
        }
    }
}
