import { Rect } from "../mathD/rect";
import { Component } from "../scene/index";
import { vec3 } from "../mathD/index";
import { Material, Texture2D } from "../render";

export class Hud extends Component {
    private _rect: Rect = new Rect(0, 0, 1, 1);
    private _command: (context: CanvasRenderingContext2D) => void;
    private _size: vec3 = vec3.create();

    get rect() { return this._rect; }
    get command() { return this._command; }
    get size() { return this._size; }

    _contentDirty: boolean = false;
    _mat: Material;
    _text2d: Texture2D;

    setContent(rect: Rect, command: (context: CanvasRenderingContext2D) => void, width3d: number = 1) {
        this._contentDirty = true;
        this._rect = rect;
        this._command = command;
        this._size = vec3.fromValues(width3d, width3d * rect.height / rect.width, 1.0);
    }

    clone(): Hud {
        throw new Error("Method not implemented.");
    }
}
