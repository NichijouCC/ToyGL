import { StaticGeometry } from "../../scene/asset/geometry/staticGeometry";
import { DefaultGeometry } from "./defaultGeometry";

export class DefaultMesh {
    private static _cube: StaticGeometry;
    static get cube() {
        if (this._cube == null) {
            this._cube = new StaticGeometry([DefaultGeometry.cube as any]);
        }
        return this._cube;
    }

    private static _plan: StaticGeometry;
    static get plan() {
        if (this._plan == null) {
            this._plan = new StaticGeometry([DefaultGeometry.plan as any]);
        }
        return this._plan;
    }

    private static _quad: StaticGeometry;
    static get quad() {
        if (this._quad == null) {
            this._quad = new StaticGeometry([DefaultGeometry.quad as any]);
        }
        return this._quad;
    }
}
