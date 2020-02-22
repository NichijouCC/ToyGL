import { EventHandler } from "../core/Eventhandler";
import { Vec2 } from "../mathD/vec2";

export enum MouseKeyEnum
{
    Left = "MouseLeft",
    Middle = "MouseMiddle",
    Right = "MouseRight", //
    None = "MouseNone",
}
export enum MouseEventEnum
{
    Up = "mouseUp",
    Down = "mouseDown",
    Move = "mouseMove",
    Rotate = "mouseRotate",
}

export class ClickEvent
{
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


namespace Private
{
    export const keyDic: { [key: number]: MouseKeyEnum } = {
        0: MouseKeyEnum.Left,
        1: MouseKeyEnum.Middle,
        2: MouseKeyEnum.Right
    };
}

export class Mouse extends EventHandler
{
    private _position: Vec2;
    get position() { return this._position };
    constructor(canvas: HTMLCanvasElement)
    {
        super();
        /**
         * 屏蔽网页原生鼠标事件
         */
        document.oncontextmenu = e =>
        {
            return false;
        };

        canvas.addEventListener("mousedown", (ev: MouseEvent) =>
        {
            let key = ev.button;
            let keyEnum = Private.keyDic[key];

            let event = this.getClickEventByMouseEvent(ev);
            this.fire(MouseEventEnum.Down, event);
            this.fire([keyEnum, MouseEventEnum.Down], event);
        });

        canvas.addEventListener("mouseup", (ev: MouseEvent) =>
        {
            let key = ev.button;
            let keyEnum = Private.keyDic[key];

            let event = this.getClickEventByMouseEvent(ev);
            this.fire(MouseEventEnum.Up, event);
            this.fire([keyEnum, MouseEventEnum.Down], event);
        });

        canvas.addEventListener("mousemove", (ev: MouseEvent) =>
        {
            let event = this.getClickEventByMouseEvent(ev);
            this.fire(MouseEventEnum.Move, event);
        });

        canvas.addEventListener("mousewheel", (ev: any) =>
        {
            let event = this.getClickEventByMouseEvent(ev);
            this.fire(MouseEventEnum.Rotate, event);
        });
    }

    private getClickEventByMouseEvent(ev: any): ClickEvent
    {
        let event = new ClickEvent();
        event.pointx = ev.offsetX; //鼠标指针相对于目标节点内边位置的X坐标
        event.pointy = ev.offsetY; //鼠标指针相对于目标节点内边位置的Y坐标

        this._position.x = ev.offsetX;
        this._position.y = ev.offsetY;

        event.movementX = ev.movementX;
        event.movementY = ev.movementY;

        event.rotateDelta = ev.detail | ev.wheelDelta;
        return event;
    }
}
