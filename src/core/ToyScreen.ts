import { EventTarget } from "./EventTarget";
export class ToyScreen {
    onresize = new EventTarget<ResizeEvent>();

    /**
     * 屏幕(canvas)高度
     */
    get width() {
        return this.canvas.width;
    }

    /**
     * 屏幕(canvas)宽度
     */
    get height() {
        return this.canvas.height;
    }

    /**
     * width/height
     */
    get aspect() {
        return this.width / this.height;
    }

    private _canvas: HTMLCanvasElement;
    get canvas() { return this._canvas; }
    private constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        canvas.onresize = () => {
            console.warn("canvas resize!");
            this.onresize.raiseEvent({ width: this.width, height: this.height });
        };
    }

    static create(element: HTMLDivElement | HTMLCanvasElement, options?: { autoAdaptScreenSize?: boolean }) {
        const { autoAdaptScreenSize = true } = options || {};
        let canvas: HTMLCanvasElement;
        if (element instanceof HTMLDivElement) {
            canvas = document.createElement("canvas");
            canvas.width = element.clientWidth;
            canvas.width = element.clientHeight;
            element.appendChild(canvas);
            if (autoAdaptScreenSize) {
                element.onresize = () => {
                    canvas.width = element.clientWidth;
                    canvas.width = element.clientHeight;
                };
            }
        } else {
            canvas = element;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            if (autoAdaptScreenSize) {
                window.onresize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                };
            }
        }
        const screen = new ToyScreen(canvas);
        return screen;
    }
}

export interface ResizeEvent {
    width: number,
    height: number
}
