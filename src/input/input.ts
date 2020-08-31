import { Vec2 } from "../mathD/vec2";
import { Mouse, MouseKeyEnum, MouseEventEnum, ClickEvent } from "./mouse";
import { Keyboard, KeyCodeEnum, KeyCodeEventEnum } from "./keyboard";

export class Input {
    private _mouse: Mouse;
    get mouse() { return this._mouse; };

    private _keyBoard: Keyboard;
    get keyBoard() { return this._keyBoard; }

    get position() { return this._mouse.position; }
    constructor(canvas: HTMLCanvasElement) {
        this._mouse = new Mouse(canvas);
        this._keyBoard = new Keyboard();
    }
}
