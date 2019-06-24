import { AssetMgr } from "./resources/assetmgr";
import { IassetMgr } from "./resources/type";
import { RenderMachine } from "./render/renderMachine";
import { GameScreen } from "./gameScreen";
import { Scene } from "./scene/scene";
import { GameTimer } from "./GameTimer";

export class ToyGL {
    private loop: Iloop;
    assetMgr: IassetMgr;
    scene: Scene;
    // setupRender(canvas: HTMLCanvasElement) {}

    initByDiv(container: HTMLDivElement) {
        let cancvas = document.createElement("canvas");
        cancvas.width = container.clientWidth;
        cancvas.width = container.clientHeight;

        container.appendChild(cancvas);
        cancvas.style.width = "100%";
        cancvas.style.height = "100%";

        this.assetMgr = new AssetMgr();
        let render = new RenderMachine(cancvas);
        this.scene = new Scene(render);
        GameScreen.init(cancvas);

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
