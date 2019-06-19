import { GlRender } from "./glRender";
import { AssetMgr } from "./resources/assetmgr";
import { IassetMgr } from "./resources/type";

export class ToyGL {
    private loop: Iloop;
    private glrender: GlRender;
    private assetMgr: IassetMgr;
    // setupRender(canvas: HTMLCanvasElement) {}

    initByDiv(container: HTMLDivElement) {
        let cancvas = document.createElement("canvas");
        cancvas.width = container.clientWidth;
        cancvas.width = container.clientHeight;

        container.appendChild(cancvas);
        cancvas.style.width = "100%";
        cancvas.style.height = "100%";
        this.glrender = new GlRender(cancvas);
        this.assetMgr = new AssetMgr();

        this.loop = new Loop();
        this.loop.update = this.frameUpdate;
    }
    private frameUpdate = () => {};
}

export class Loop implements Iloop {
    active() {
        this.beActive = true;
    }
    disActive() {
        this.beActive = false;
    }
    update: () => void = () => {};

    private beActive: boolean = false;
    constructor() {
        let func = () => {
            if (this.beActive) {
                this.update();
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
    update: () => void;
}
