import { EventEmitter } from "@mtgoo/ctool";
import { vec2 } from "../mathD/index";

export enum MouseKeyEnum {
    Left = "Left",
    Middle = "Middle",
    Right = "Right", //
    None = "None",
}
export enum MouseEventEnum {
    MouseUp = "MouseUp",
    MouseDown = "MouseDown",
    MouseMove = "MouseMove",
    MouseWheel = "MouseWheel",
}

export class ClickEvent {
    /**
     * 屏幕坐标 posx
     */
    pointx: number;
    /**
     * 屏幕坐标 posy
     */
    pointy: number;
    /**
     * 滚轮
     */
    rotateDelta?: number;

    movementX: number;
    movementY: number;
    keyType: MouseKeyEnum;
}

namespace Private {
    export const keyDic: { [key: number]: MouseKeyEnum } = {
        0: MouseKeyEnum.Left,
        1: MouseKeyEnum.Middle,
        2: MouseKeyEnum.Right
    };
}

interface MyMouseEvent {
    "mouseup": ClickEvent,
    "mousedown": ClickEvent,
    "mousemove": ClickEvent,
    "mousewheel": ClickEvent
}

export class Mouse extends EventEmitter<MyMouseEvent> {
    private _position: vec2 = vec2.create();
    get position() { return this._position; };
    private _pressed: { [key: string]: boolean } = {};
    private _moved: { [key: string]: number } = {};
    constructor(canvas?: HTMLCanvasElement) {
        super();
        let dom = canvas ?? document;
        /**
         * 屏蔽网页原生鼠标事件
         */
        dom.oncontextmenu = e => {
            return false;
        };

        dom.addEventListener("mousedown", (ev: any) => {
            const key = ev.button;
            this._pressed[Private.keyDic[key]] = true;
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousedown", event);
        });

        dom.addEventListener("mouseup", (ev: any) => {
            const key = ev.button;
            this._pressed[Private.keyDic[key]] = false;
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mouseup", event);
        });

        dom.addEventListener("mousemove", (ev: any) => {
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousemove", event);
        });

        dom.addEventListener("mousewheel", (ev: any) => {
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousewheel", event);
        });

        dom.onblur = () => {
            this._pressed = {};
        };
    }

    getKeyState(key: MouseKeyEnum) {
        return this._pressed[key] ?? false;
    }

    private getClickEventByMouseEvent(ev: any): ClickEvent {
        const event = new ClickEvent();
        event.keyType = Private.keyDic[ev.button];
        event.pointx = ev.offsetX; // 鼠标指针相对于目标节点内边位置的X坐标
        event.pointy = ev.offsetY; // 鼠标指针相对于目标节点内边位置的Y坐标

        this._position[0] = ev.offsetX;
        this._position[1] = ev.offsetY;

        event.movementX = ev.movementX;
        event.movementY = -ev.movementY;

        event.rotateDelta = ev.detail | ev.wheelDelta;
        return event;
    }
}
