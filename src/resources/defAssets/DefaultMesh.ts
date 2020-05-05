import { StaticMesh } from "../../scene/asset/geometry/StaticMesh";
import { DefaultGeometry } from "./DefaultGeometry";
namespace Private {
    export const cube = new StaticMesh();
    {
        cube.sbuMeshs = [DefaultGeometry.cube as any];
    }
}

export class DefaultMesh {
    static get cube() { return Private.cube; }
}
