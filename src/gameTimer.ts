/**
 * The game time class.
 */
export class GameTimer implements Itimer {
    private beActive: boolean = false;
    active() {
        this.beActive = true;
        this.frameUpdate();
    }
    disActive() {
        this.beActive = false;
    }
    tick: (deltaTime: number) => void;
    constructor()
    {
        this.active();
    }
    private  lastTimer: number;
    private  totalTime: number;
    private  deltaTime: number;
    get Time() {
        return this.totalTime * 0.001;
    }
    get DeltaTime() {
        return this.deltaTime * this.TimeScale * 0.001;
    }

    TimeScale: number = 1.0;
    private IntervalLoop: any;
    private update() {
        let now = Date.now();
        this.deltaTime = now - this.lastTimer;
        this.lastTimer = now;

        let realDetal = this.deltaTime * this.TimeScale;
        if(this.beActive!=null)
        {
            if(this.tick!=null)
            {
                this.tick(realDetal);
            }
            for(let i=0;i<this.updateList.length;i++)
            {
                this.updateList[i](realDetal);
            }
        }
    }

    private  updateList: Function[] = [];
    addListenToTimerUpdate(func: (delta: number) => void) {
        this.updateList.push(func);
    }
    removeListenToTimerUpdate(func: () => void) {
        this.updateList.forEach(item => {
            if (item == func) {
                let index = this.updateList.indexOf(func);
                this.updateList.splice(index, 1);
                return;
            }
        });
    }

    removeAllListener() {
        this.updateList.length = 0;
    }

    FPS: number = 60;
    private _lastFrameRate: number;
    private frameUpdate() {
        if (this.FPS != this._lastFrameRate) {
            //----------帧率被修改
            this.FPS = Math.min(this.FPS, 60);
            this.FPS = Math.max(this.FPS, 0);
            if (this.IntervalLoop != null) {
                clearInterval(this.IntervalLoop);
                this.IntervalLoop = null;
            }
            this._lastFrameRate = this.FPS;
        }
        if (this.FPS == 60) {
            this.update();
            requestAnimationFrame(this.frameUpdate.bind(this));
        } else {
            if (this.IntervalLoop == null) {
                this.IntervalLoop = setInterval(() => {
                    this.update();
                    this.frameUpdate();
                }, 1000 / this.FPS);
            }
        }
    }
}

export class Timer implements Itimer {
    private beActive: boolean = false;
    active() {
        this.beActive = true;
    }
    disActive() {
        this.beActive = false;
    }
    tick: (deltaTime: number) => void = () => {};

    private _lastTime: number;
    constructor() {
        let func = () => {
            let now = Date.now();
            let deltaTime = now - this._lastTime || now;
            this._lastTime = now;
            if (this.beActive) {
                this.tick(deltaTime);
            }
            requestAnimationFrame(func);
        };
        func();
        this.beActive = true;
    }
}

export interface Itimer {
    active(): void;
    disActive(): void;
    tick: (deltaTime: number) => void;
}
