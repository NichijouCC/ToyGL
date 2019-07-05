/**
 *
 * (0,0)-----|
 * |         |
 * |         |
 * |------(w,h)
 *
 */
export class GameScreen {
    /**
     * 绘制区域宽/高度 像素单位
     */
    private static canvaswidth: number;
    private static canvasheight: number;
    private static apset: number;

    /**
     * 屏幕(canvas)高度
     */
    static get Height() {
        return this.canvasheight;
    }
    /**
     * 屏幕(canvas)宽度
     */
    static get Width() {
        return this.canvaswidth;
    }

    /**
     * width/height
     */
    static get aspect() {
        return this.apset;
    }

    private static canvas: HTMLCanvasElement;
    // static divcontiner: HTMLDivElement;
    static init(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.OnResizeCanvas();
        // canvas.onresize = () => {
        //     this.OnResizeCanvas();
        // };
    }

    static update() {
        if (this.canvasheight != this.canvas.height || this.canvaswidth != this.canvas.width) {
            this.OnResizeCanvas();
        }
    }
    private static OnResizeCanvas() {
        console.warn("canvas resize!");
        this.canvaswidth = this.canvas.clientWidth;
        this.canvasheight = this.canvas.clientHeight;

        this.apset = this.canvaswidth / this.canvasheight;
        for (let i = 0; i < this.resizeListenerArr.length; i++) {
            let fuc = this.resizeListenerArr[i];
            fuc();
        }
    }
    private static resizeListenerArr: Function[] = [];
    static addListenertoCanvasResize(fuc: () => void) {
        this.resizeListenerArr.push(fuc);
    }

    // static windowToCanvas(windowx:number,windowy:number,screenPos:MathD.vec2)
    // {
    //     let bbox = this.canvas.getBoundingClientRect();
    //     screenPos.x=windowx- bbox.left - (bbox.width - this.canvas.width) / 2;
    //     screenPos.y=windowy- bbox.top - (bbox.height - this.canvas.height) / 2;
    // }
}
