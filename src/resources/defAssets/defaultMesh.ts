import { StaticMesh } from "../../scene/asset/geometry/staticMesh";
import { DefaultGeometry } from "./defaultGeometry";
namespace Private {
    export const cube = new StaticMesh(); {
    cube.sbuMeshs = [DefaultGeometry.cube as any];
}
}

export class DefaultMesh {
    static get cube() { return Private.cube; }
}
