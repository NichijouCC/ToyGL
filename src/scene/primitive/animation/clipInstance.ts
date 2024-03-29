import { AnimationClip } from "../../../resources/animationClip";
import { Entity } from "../../entity";
import { ChannelInstance } from "./channelInstance";
import { EventTarget } from "@mtgoo/ctool";

export class ClipInstance {
    private clip: AnimationClip;

    private channelInsArr: ChannelInstance[] = [];
    private curFrame: number = 0;
    private speed: number = 1;
    private localTime: number = 0;
    private beLoop: boolean;

    private _options: { root: Entity | (() => Entity) } & ClipOptions;
    constructor(clip: AnimationClip, options: { root: Entity | (() => Entity) } & ClipOptions) {
        this.clip = clip;
        this.curFrame = 0;
        this.speed = options.speed ?? 1;
        this.beLoop = options.beLoop ?? true;

        this._options = options;
    }

    private _state = ClipStateEnum.INITING;
    get bePlaying() { return this._state == ClipStateEnum.PLAYING; }
    _init() {
        const { _options: { root }, clip } = this;
        const entity = typeof root == "function" ? root() : root;
        this.channelInsArr = this.clip.channels.map(item => {
            const ins = new ChannelInstance(item);
            ins.init(entity);
            return ins;
        });
        this._state = ClipStateEnum.PLAYING;
    }

    private _execute(deltaTime: number) {
        this.setTime(this.localTime + deltaTime * this.speed);
    }
    /** 指定动画时间显示*/
    setTime(time: number) {
        this.localTime = time;
        let newFrame = (this.localTime * AnimationClip.FPS) | 0;
        this.setFrameIndex(newFrame);
    }

    /** 指定动画帧显示*/
    setFrameIndex(frameIndex: number) {
        if (frameIndex != this.curFrame) {
            const { channelInsArr, clip: { totalFrame } } = this;
            if (frameIndex > totalFrame) {
                if (this.curFrame < totalFrame) {
                    frameIndex = totalFrame;
                } else {
                    if (this.beLoop) { // ----------------------restart play
                        frameIndex = 0;
                        this.localTime = 0;
                        this.channelInsArr.forEach(item => item.jumpToStart());
                        this.onEnd.raiseEvent();
                    } else { // --------------------------------play end
                        // this.enableTimeFlow = false;
                        this._state = ClipStateEnum.ENDED;
                        return;
                    }
                }
            }
            this.curFrame = frameIndex;
            channelInsArr.forEach(item => item.execute(frameIndex));
        }
    }

    _update(deltaTime: number) {
        this._execute(deltaTime);
    }

    _reset() {
        this.localTime = 0;
        this.channelInsArr.forEach(item => item.jumpToStart());
    }

    onEnd = new EventTarget();

    private beCrossFade: boolean;
    private fadeTime: number;
    crossFade() {

    }
}

export interface ClipOptions {
    speed?: number,
    beLoop?: boolean,
    crossFade?: boolean,
    fadeTime?: number,
}


export enum ClipStateEnum {
    INITING,
    PLAYING,
    PAUSED,
    ENDED
}
