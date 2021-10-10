import { EventTarget } from "@mtgoo/ctool";
export class Screen {
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

        };
    }

    static create(element: HTMLDivElement | HTMLCanvasElement, options?: { autoAdaptScreenSize?: boolean }) {
        const { autoAdaptScreenSize = true } = options || {};
        let canvas: HTMLCanvasElement;
        if (element instanceof HTMLDivElement) {
            canvas = document.createElement("canvas");
            const screen = new Screen(canvas);
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
            element.appendChild(canvas);
            if (autoAdaptScreenSize) {
                element.onresize = () => {
                    canvas.width = element.clientWidth;
                    canvas.height = element.clientHeight;
                    screen.onresize.raiseEvent({ width: canvas.width, height: canvas.height });
                };
            }
            return screen;
        } else {
            canvas = element;
            const screen = new Screen(canvas);
            if (autoAdaptScreenSize) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                window.onresize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;

                    screen.onresize.raiseEvent({ width: canvas.width, height: canvas.height });
                };
            }
            return screen;
        }
    }
}

export interface ResizeEvent {
    width: number,
    height: number
}
