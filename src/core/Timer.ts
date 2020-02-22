import { excuteDebuffAction, IdebuffeAction } from "./DebuffAction";
import { InterEvent } from "./Event";

export class Timer implements Itimer
{
    private beActive: boolean = true;
    active()
    {
        this.beActive = true;
    }
    disActive()
    {
        this.beActive = false;
    }
    constructor()
    {
        this.frameUpdate();
    }
    private _lastTime: number;
    private _deltaTime: number;
    get deltaTime()
    {
        return this._deltaTime;
    }

    timeScale: number = 1.0;
    private intervalLoop: IdebuffeAction;
    private update()
    {
        let now = Date.now();
        this._deltaTime = this._lastTime ? (now - this._lastTime) * this.timeScale * 0.001 : 0;
        this._lastTime = now;
        if (this.beActive != null)
        {
            this._ontick.raiseEvent(this._deltaTime);
        }
    }

    private _ontick = new InterEvent();
    get onTick() { return this._ontick }

    FPS: number = 60;
    private _lastFPS: number;
    private frameUpdate()
    {
        this.update();
        if (this.FPS == 60)
        {
            requestAnimationFrame(this.frameUpdate.bind(this));
        } else if (this.FPS != this._lastFPS)
        {
            //----------帧率被修改
            this.FPS = Math.min(this.FPS, 60);
            this.FPS = Math.max(this.FPS, 0);
            this._lastFPS = this.FPS;

            if (this.intervalLoop) { this.intervalLoop.dispose() }
            this.intervalLoop = excuteDebuffAction(() =>
            {
                let loop = setInterval(() =>
                {
                    this.frameUpdate();
                }, 1000 / this.FPS);

                return () => { clearInterval(loop) }
            });
        }
    }
}

export interface Itimer
{
    active(): void;
    disActive(): void;
    readonly onTick: InterEvent;
}
