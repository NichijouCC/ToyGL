import { excuteDebuffAction, IdebuffeAction } from "./DebuffAction";
import { EventTarget } from "./EventTarget";

export class Timer implements Itimer {
    private beActive: boolean = true;
    active() {
        this.beActive = true;
    }

    disActive() {
        this.beActive = false;
    }

    constructor() {
        this.tickUpdate();
    }

    private _lastTime: number;
    private _deltaTime: number;
    get deltaTime() {
        return this._deltaTime;
    }

    timeScale: number = 1.0;
    private intervalLoop: IdebuffeAction;
    private update() {
        const now = Date.now();
        this._deltaTime = this._lastTime ? (now - this._lastTime) * this.timeScale * 0.001 : 0;
        this._lastTime = now;
        if (this.beActive != null) {
            this._ontick.raiseEvent(this._deltaTime);
        }
    }

    private _ontick = new EventTarget<number>();
    get onTick() { return this._ontick; }

    FPS: number = 60;
    private _lastFPS: number;
    private tickUpdate() {
        this.update();
        if (this.FPS == 60) {
            requestAnimationFrame(this.tickUpdate.bind(this));
        } else if (this.FPS != this._lastFPS) {
            // ----------帧率被修改
            this.FPS = Math.min(this.FPS, 60);
            this.FPS = Math.max(this.FPS, 0);
            this._lastFPS = this.FPS;

            if (this.intervalLoop) { this.intervalLoop.dispose(); }
            this.intervalLoop = excuteDebuffAction(() => {
                const loop = setInterval(() => {
                    this.tickUpdate();
                }, 1000 / this.FPS);

                return () => { clearInterval(loop); };
            });
        }
    }
}

export interface Itimer {
    active(): void;
    disActive(): void;
    readonly onTick: EventTarget<number>;
}
