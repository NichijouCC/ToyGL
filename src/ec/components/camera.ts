import { Icomponent, Ientity } from "../ec";
import { Rect } from "../../mathD/rect";
import { Color } from "../../mathD/color";

export enum ProjectionEnum {
    PERSPECTIVE,
    ORTHOGRAPH,
}

export enum ClearEnum {
    COLOR = 0b001,
    DEPTH = 0b010,
    STENCIL = 0b100,
}
export class Camera implements Icomponent {
    entity: Ientity;
    projectionType: ProjectionEnum = ProjectionEnum.PERSPECTIVE;
    private _near: number = 0.01;
    get near(): number {
        return this._near;
    }
    set near(val: number) {
        if (this.projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
            val = 0.01;
        }
        if (val >= this.far) val = this.far - 0.01;
        this._near = val;
    }
    private _far: number = 1000;
    get far(): number {
        return this._far;
    }
    set far(val: number) {
        if (val <= this.near) val = this.near + 0.01;
        this._far = val;
    }
    viewport: Rect = Rect.create(0, 0, 1, 1);
    clearFlag: ClearEnum = ClearEnum.COLOR | ClearEnum.DEPTH;
    backgroundColor: Color = Color.create(0.3, 0.3, 0.3, 1);
    dePthValue: number = 1.0;
    stencilValue: number = 0;
    dispose(): void {}
}
