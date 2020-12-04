import { Mouse, MouseKeyEnum } from "./mouse";
import { Keyboard, KeyCodeEnum } from "./keyboard";

class InputCtr {
    private _mouse: Mouse;
    get mouse() { return this._mouse; };

    private _keyBoard: Keyboard;
    get keyBoard() { return this._keyBoard; }

    get position() { return this._mouse.position; }
    constructor() {
        this._mouse = new Mouse();
        this._keyBoard = new Keyboard();
    }

    getKeyDown(key: KeyCodeEnum) {
        return this._keyBoard.getKeyState(key);
    }

    getMouseDown(key: MouseKeyEnum) {
        return this._mouse.getKeyState(key);
    }
}

export const Input = new InputCtr();
