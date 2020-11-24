import { EventEmitter } from "@mtgoo/ctool";

export enum KeyCodeEnum {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",
    SPACE = " ",
    ESC = "ESC",
}

export enum KeyCodeEventEnum {
    keyup = "keyup",
    keydown = "keydown",
}

interface KeyboardEventMap {
    "keydown": KeyboardEvent,
    "keyup": KeyboardEvent
}

export class Keyboard extends EventEmitter<KeyboardEventMap> {
    private _pressed: { [key: string]: boolean } = {};
    constructor(canvas: HTMLCanvasElement) {
        super();
        document.onkeydown = (ev: KeyboardEvent) => {
            const keystr = ev.key.toUpperCase(); // safari浏览器不支持keypress事件中的key属性

            if (Object.values(KeyCodeEnum).indexOf(keystr as any) >= 0) {
                this._pressed[keystr] = true;
                this.emit("keydown", ev);
                this.emit([keystr, "keydown"].join("-") as any, ev);
            } else {
                this._pressed = {};
            }
        };
        document.onkeyup = (ev: KeyboardEvent) => {
            const keystr = ev.key.toUpperCase(); // safari浏览器不支持keypress事件中的key属性
            this._pressed[keystr] = false;
            this.emit("keyup", ev);
            this.emit([keystr, "keyup"].join("-") as any, ev);
        };
        document.onblur = () => {
            this._pressed = {};
        };
    }

    onKeyBoard = (key: KeyCodeEnum, type: KeyCodeEventEnum, cb: () => void) => {
        this.on([key, type].join("-") as any, cb);
    }

    offKeyBoard = (key: KeyCodeEnum, type: KeyCodeEventEnum, cb: () => void) => {
        this.off([key, type].join("-") as any, cb);
    }

    getKeyState(key: KeyCodeEnum) {
        return this._pressed[key] ?? false;
    }
}
