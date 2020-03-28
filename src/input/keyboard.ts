import { EventCompositedHandler } from "../core/EventCompositedHandler";

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
    Up = "KeyUp",
    Down = "KeyDown",
}

export class Keyboard extends EventCompositedHandler {
    constructor() {
        super();
        document.onkeydown = (ev: KeyboardEvent) => {
            let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
            this.fire(KeyCodeEventEnum.Down, ev);
            this.fire([keystr, KeyCodeEventEnum.Down], ev);
        };
        document.onkeyup = (ev: KeyboardEvent) => {
            let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
            this.fire(KeyCodeEventEnum.Up, ev);
            this.fire([keystr, KeyCodeEventEnum.Up], ev);
        };
    }
}
