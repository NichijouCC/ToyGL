import { EventTarget } from "@mtgoo/ctool";
import { DebuffAction } from '@mtgoo/ctool'

export class Timer implements Itimer {
    private beActive: boolean = true;
    active() { this.beActive = true; }
    disActive() { this.beActive = false; }

    constructor() {
        this.tickUpdate();
    }

    private _lastTime: number;
    private _deltaTime: number;
    get deltaTime() { return this._deltaTime; }

    timeScale: number = 1.0;
    private intervalLoop: DebuffAction;
    private _onTick = new EventTarget<number>();
    get onTick() { return this._onTick; }

    private update() {
        const now = Date.now();
        this._deltaTime = this._lastTime ? (now - this._lastTime) * this.timeScale * 0.001 : 0;
        this._lastTime = now;
        if (this.beActive != null) {
            this._onTick.raiseEvent(this._deltaTime);
        }
    }

    FPS: number = 60;
    private _lastFPS: number;
    private tickUpdate() {
        this.update();
        if (this.FPS != this._lastFPS) {
            // ----------帧率被修改
            this.FPS = Math.min(this.FPS, 60);
            this.FPS = Math.max(this.FPS, 0);
            this._lastFPS = this.FPS;

            if (this.intervalLoop) { this.intervalLoop.dispose(); this.intervalLoop = null; }

            if (this.FPS == 60) {
                requestAnimationFrame(this.tickUpdate.bind(this));
            } else {
                this.intervalLoop = DebuffAction.create(() => {
                    const loop = setInterval(() => {
                        this.tickUpdate();
                    }, 1000 / this.FPS);
                    return () => { clearInterval(loop); };
                });
            }
        } else {
            if (this.FPS == 60) {
                requestAnimationFrame(this.tickUpdate.bind(this));
            }
        }
    }
}

export interface Itimer {
    active(): void;
    disActive(): void;
    readonly onTick: EventTarget<number>;
}
