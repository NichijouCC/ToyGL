import { EventEmitter } from "@mtgoo/ctool";
import { Vec2 } from "../mathD/vec2";

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
    private _position: Vec2 = Vec2.create();
    get position() { return this._position; };
    private _pressed: { [key: string]: boolean } = {};
    constructor(canvas: HTMLCanvasElement) {
        super();
        /**
         * 屏蔽网页原生鼠标事件
         */
        document.oncontextmenu = e => {
            return false;
        };

        canvas.addEventListener("mousedown", (ev: MouseEvent) => {
            const key = ev.button;
            this._pressed[Private.keyDic[key]] = true;
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousedown", event);
        });

        canvas.addEventListener("mouseup", (ev: MouseEvent) => {
            const key = ev.button;
            this._pressed[Private.keyDic[key]] = false;
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mouseup", event);
        });

        canvas.addEventListener("mousemove", (ev: MouseEvent) => {
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousemove", event);
        });

        canvas.addEventListener("mousewheel", (ev: any) => {
            const event = this.getClickEventByMouseEvent(ev);
            this.emit("mousewheel", event);
        });

        canvas.onblur = () => {
            this._pressed = {};
        };
    }

    getKeyState(key: MouseKeyEnum) {
        return this._pressed[key] ?? false;
    }

    private getClickEventByMouseEvent(ev: any): ClickEvent {
        const event = new ClickEvent();
        event.pointx = ev.offsetX; // 鼠标指针相对于目标节点内边位置的X坐标
        event.pointy = ev.offsetY; // 鼠标指针相对于目标节点内边位置的Y坐标

        this._position.x = ev.offsetX;
        this._position.y = ev.offsetY;

        event.movementX = ev.movementX;
        event.movementY = ev.movementY;

        event.rotateDelta = ev.detail | ev.wheelDelta;
        return event;
    }
}
