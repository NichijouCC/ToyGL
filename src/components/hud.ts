import { Icomponent, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { Rect } from "../mathD/rect";
import { Material, Texture2D } from "../scene/Index";
import { Vec3 } from "../mathD/vec3";

@Ecs.registeComp
export class Hud implements Icomponent {
    entity: Entity;
    private _rect: Rect = new Rect(0, 0, 1, 1);
    private _command: (context: CanvasRenderingContext2D) => void;
    private _size: Vec3 = new Vec3();

    get rect() { return this._rect; }
    get commond() { return this._command; }
    get size() { return this._size; }

    _contentDirty: boolean = false;
    _mat: Material;
    _text2d: Texture2D;

    setcontent(rect: Rect, command: (context: CanvasRenderingContext2D) => void, width3d: number = 1) {
        this._contentDirty = true;
        this._rect = rect;
        this._command = command;
        this._size = new Vec3(width3d, width3d * rect.height / rect.width, 1.0);
    }
}
