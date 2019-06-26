import { AssetMgr } from "./resources/assetmgr";
import { IassetMgr } from "./resources/type";
import { RenderMachine } from "./render/renderMachine";
import { GameScreen } from "./gameScreen";
import { Scene } from "./scene/scene";
import { GlRender } from "./render/glRender";

export class ToyGL {
    private loop: Iloop;
    assetMgr: IassetMgr;
    scene: Scene;
    // setupRender(canvas: HTMLCanvasElement) {}

    initByHtmlElement(element: HTMLDivElement | HTMLCanvasElement) {
        let canvas: HTMLCanvasElement;
        if (element instanceof HTMLDivElement) {
            canvas = document.createElement("canvas");
            canvas.width = element.clientWidth;
            canvas.width = element.clientHeight;

            element.appendChild(canvas);
            canvas.style.width = "100%";
            canvas.style.height = "100%";
        } else {
            canvas = element;
        }

        this.assetMgr = new AssetMgr();
        let render = new RenderMachine(canvas);
        this.scene = new Scene(render);
        GameScreen.init(canvas);

        this.loop = new Loop();
        this.loop.update = this.frameUpdate;
    }

    private frameUpdate = (deltaTime: number) => {
        this.scene.update(deltaTime);
    };
}

export class Loop implements Iloop {
    active() {
        this.beActive = true;
    }
    disActive() {
        this.beActive = false;
    }
    update: (deltaTime: number) => void = () => {};

    private beActive: boolean = false;
    private _lastTime: number;
    constructor() {
        let func = () => {
            let now = Date.now();
            let deltaTime = now - this._lastTime || now;
            this._lastTime = now;
            if (this.beActive) {
                this.update(deltaTime);
            }
            requestAnimationFrame(func);
        };
        func();
        this.beActive = true;
    }
}

export interface Iloop {
    active(): void;
    disActive(): void;
    update: (deltaTime: number) => void;
}

export * from "./ec/components/mesh";
