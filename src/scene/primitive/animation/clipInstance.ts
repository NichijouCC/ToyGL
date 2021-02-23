/* eslint-disable brace-style */
/* eslint-disable indent */
import { AnimationClip } from "../../asset/animationClip";
import { Entity } from "../../../core/entity";
import { quat, vec3 } from '../../../mathD';
import { numberLerp } from "../../../mathD/common";
import { ChannelInstance } from "./channelInstance";
import { EventTarget } from '@mtgoo/ctool'

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

    setState(state?: { curFrame?: number, localTime?: number }) {
        const { curFrame = 0, localTime = 0 } = state || {};
        this.curFrame = curFrame;
        this.localTime = localTime;
    }

    private _state = ClipStateEnum.INITING;
    get bePlaying() { return this._state == ClipStateEnum.PLAYING; }
    _init() {
        const { _options: { root }, clip } = this;
        const entity = typeof root == "function" ? root() : root;
        this.channelInsArr = this.clip.channels.map(item => {
            let ins = new ChannelInstance(item);
            ins.init(entity);
            return ins;
        });
        this._state = ClipStateEnum.PLAYING;
    }

    private _excecute(deltaTime: number) {
        this.localTime += deltaTime * this.speed;
        let newFrame = (this.localTime * AnimationClip.FPS) | 0;
        if (newFrame != this.curFrame) {
            const { channelInsArr, clip: { totalFrame } } = this;
            if (newFrame > totalFrame) {
                if (this.curFrame < totalFrame) {
                    newFrame = totalFrame;
                } else {
                    if (this.beLoop) { // ----------------------restart play
                        newFrame = 0;
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
            this.curFrame = newFrame;
            channelInsArr.forEach(item => item.excecute(newFrame))
        }
    }

    _update(deltaTime: number) {
        this._excecute(deltaTime);
    }

    _reset() {
        this.localTime = 0;
        this.channelInsArr.forEach(item => item.jumpToStart())
    }
    onEnd = new EventTarget();

    private beCrossfade: boolean;
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

export enum AnimationChannelTargetPath {
    /**
     * Translation
     */
    TRANSLATION = "translation",
    /**
     * Rotation
     */
    ROTATION = "rotation",
    /**
     * Scale
     */
    SCALE = "scale",
    /**
     * Weights
     */
    WEIGHTS = "weights",
}
export namespace AnimationChannelTargetPath {
    const temptPos = vec3.create();
    const temptScale = vec3.create();
    const temptquat = quat.create();
    const funcMap: Map<AnimationChannelTargetPath, (from: any, to: any, lerp: number) => any> = new Map();
    {
        funcMap.set(AnimationChannelTargetPath.ROTATION, (from: quat, to: quat, lerp: number) => {
            quat.slerp(temptquat, from, to, lerp);
            // quat.normalize(temptquat, temptquat);
            return temptquat;
        });
        funcMap.set(AnimationChannelTargetPath.SCALE, (from: vec3, to: vec3, lerp: number) => {
            vec3.lerp(temptScale, from, to, lerp);
            return temptScale;
        });
        funcMap.set(AnimationChannelTargetPath.TRANSLATION, (from: vec3, to: vec3, lerp: number) => {
            vec3.lerp(temptPos, from, to, lerp);
            return temptPos;
        });
        funcMap.set(AnimationChannelTargetPath.WEIGHTS, (from: number, to: number, lerp: number) => {
            return numberLerp(from, to, lerp);
        });
    }
    export const lerpFunc = (value: AnimationChannelTargetPath) => {
        return funcMap.get(value);
    };

    const setMap: Map<AnimationChannelTargetPath, (value: any, obj: Entity) => void> = new Map();
    {
        setMap.set(AnimationChannelTargetPath.ROTATION, (value: any, obj: Entity) => {
            obj.localRotation = value;
        });
        setMap.set(AnimationChannelTargetPath.SCALE, (value: any, obj: Entity) => {
            obj.localScale = value;
        });
        setMap.set(AnimationChannelTargetPath.TRANSLATION, (value: any, obj: Entity) => {
            obj.localPosition = value;
        });
    }

    export const setFunc = (value: AnimationChannelTargetPath) => {
        return setMap.get(value);
    };
}

export enum ClipStateEnum {
    INITING,
    PLAYING,
    PAUSED,
    ENDED
}
