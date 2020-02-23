import { EventHandler } from "./Event";

/**
 *
 * (0,0)-----|
 * |         |
 * |         |
 * |------(w,h)
 *
 */
export class Screen
{
    /**
     * 屏幕(canvas)高度
     */
    get width()
    {
        return this.canvas.width;
    }
    /**
     * 屏幕(canvas)宽度
     */
    get height()
    {
        return this.canvas.height;
    }

    /**
     * width/height
     */
    get aspect()
    {
        return this.width / this.height;
    }

    private canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;
        canvas.onresize = () => { console.warn("canvas resize!"); };
        this.onresize.raiseEvent();
    }
    onresize = new EventHandler<void>();
}
