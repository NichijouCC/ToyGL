import { Mouse, MouseKeyEnum } from "./mouse";
import { Keyboard, KeyCodeEnum } from "./keyboard";

export class Input {
    private _mouse: Mouse;
    get mouse() { return this._mouse; };

    private _keyBoard: Keyboard;
    get keyBoard() { return this._keyBoard; }

    get position() { return this._mouse.position; }
    constructor(canvas: HTMLCanvasElement) {
        this._mouse = new Mouse(canvas);
        this._keyBoard = new Keyboard(canvas);
    }

    getKeyDown(key: KeyCodeEnum) {
        return this._keyBoard.getKeyState(key);
    }

    getMouseDown(key: MouseKeyEnum) {
        return this._mouse.getKeyState(key);
    }
}
