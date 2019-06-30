import { Vec2 } from "../mathD/vec2";
import { Mouse, MouseKeyEnum, MouseEventEnum, ClickEvent } from "./mouse";
import { Keyboard, KeyCodeEnum, KeyCodeEventEnum } from "./keyboard";

/**
 * 对应mouseevent 的button
 */

export class Input {
    // static mousePosition: Vec2 = Vec2.create();
    static init(canvas: HTMLCanvasElement) {
        Mouse.init(canvas);
        Keyboard.init();
    }
    static getKeyDown(key: KeyCodeEnum): boolean {
        let state = Keyboard.StateInfo[key];
        return state || false;
    }
    static getMouseDown(key: MouseKeyEnum): boolean {
        let state = Mouse.StateInfo[key];
        return state || false;
    }

    static addMouseEventListener(
        eventType: MouseEventEnum,
        func: (ev: ClickEvent) => void,
        key: MouseKeyEnum = MouseKeyEnum.None,
    ) {
        if (Mouse.MouseEvent[key] == null) {
            Mouse.MouseEvent[key] = {};
        }
        if (Mouse.MouseEvent[key][eventType] == null) {
            Mouse.MouseEvent[key][eventType] = [];
        }
        Mouse.MouseEvent[key][eventType].push(func);
    }

    //    static addMouseWheelEventListener(func:(ev:MouseWheelEvent)=>void)
    //    {
    //        let key=MouseKeyEnum.None;
    //        let ev=MouseEventEnum.Rotate;
    //        if(Mouse.MouseEvent[key]==null)
    //        {
    //            Mouse.MouseEvent[key]={};
    //        }
    //        if(Mouse.MouseEvent[key][ev]==null)
    //        {
    //            Mouse.MouseEvent[key][ev]=[];
    //        }
    //        Mouse.MouseEvent[key][ev].push(func);
    //    }

    static addKeyCodeEventListener(
        eventType: KeyCodeEventEnum,
        func: (ev: KeyboardEvent) => void,
        key: KeyCodeEnum = null,
    ) {
        if (key == null) {
            if (Keyboard.anyKeyEvent[eventType] == null) {
                Keyboard.anyKeyEvent[eventType] = [];
            }
            Keyboard.anyKeyEvent[eventType].push(func);
        } else {
            if (Keyboard.KeyEvent[key] == null) {
                Keyboard.KeyEvent[key] = {};
            }
            if (Keyboard.KeyEvent[key][eventType] == null) {
                Keyboard.KeyEvent[key][eventType] = [];
            }
            Keyboard.KeyEvent[key][eventType].push(func);
        }
    }
}
