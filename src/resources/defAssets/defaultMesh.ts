import { StaticMesh } from "../../scene/asset/geometry/staticMesh";
import { DefaultGeometry } from "./defaultGeometry";

export class DefaultMesh {
    private static _cube: StaticMesh;
    static get cube() {
        if (this._cube == null) {
            this._cube = new StaticMesh();
            this._cube.sbuMeshs = [DefaultGeometry.cube as any]
        }
        return this._cube;
    }

    private static _plan: StaticMesh;
    static get plan() {
        if (this._plan == null) {
            this._plan = new StaticMesh();
            this._plan.sbuMeshs = [DefaultGeometry.plan as any]
        }
        return this._plan;
    }

    private static _quad: StaticMesh;
    static get quad() {
        if (this._quad == null) {
            this._quad = new StaticMesh();
            this._quad.sbuMeshs = [DefaultGeometry.quad as any]
        }
        return this._quad;
    }
}
