/* eslint-disable brace-style */
/* eslint-disable indent */
import { AnimationClip, AnimationChannel } from "../asset/animationClip";
import { Entity } from "../../core/entity";
import { Quat } from "../../mathD/quat";
import { Vec3 } from "../../mathD/vec3";
import { numberLerp } from "../../mathD/common";

export class ClipInstance {
    private clip: AnimationClip;
    private targets: Map<string, Entity>;
    private curFrame: number = 0;
    private speed: number = 1;
    private localTime: number = 0;
    private beloop: boolean;

    private _options: { animator: Entity | (() => Entity) } & ClipOptions;
    constructor(clip: AnimationClip, options: { animator: Entity | (() => Entity) } & ClipOptions) {
        this.clip = clip;
        this.curFrame = 0;
        this.speed = options.speed ?? 1;
        this.beloop = options.beLoop ?? true;

        this._options = options;
    }

    setState(state?: { curFrame?: number, localTime?: number }) {
        const { curFrame = 0, localTime = 0 } = state || {};
        this.curFrame = curFrame;
        this.localTime = localTime;
    }

    private _state = ClipStateEnum.INITING;
    get beplaying() { return this._state == ClipStateEnum.PLAYING; }
    private static init(ins: ClipInstance) {
        if (ins.targets == null) {
            const { _options: { animator }, clip } = ins;
            const animatorEntity = typeof animator == "function" ? animator() : animator;
            const targets = new Map();
            clip.channels.forEach(item => {
                const bone = animatorEntity.find(child => item.targetName == child.name);
                if (bone != null) {
                    targets.set(item.targetName, bone);
                } else {
                    console.warn("cannot find bone.", item.targetName);
                }
            });
            ins.targets = targets;
        }
        ins._state = ClipStateEnum.PLAYING;
    }

    private _excecute(deltaTime: number) {
        this.localTime += deltaTime * this.speed;
        let newFrame = (this.localTime * AnimationClip.FPS) | 0;
        if (newFrame != this.curFrame) {
            const { totalFrame, channels } = this.clip;
            let channel: AnimationChannel, target: Entity, keyframes: number[];
            if (newFrame > totalFrame) {
                if (this.curFrame < totalFrame) {
                    newFrame = totalFrame;
                } else {
                    if (this.beloop) { // ----------------------restart play
                        newFrame = 0;
                        this.localTime = 0;
                        this.temptLastStartIndex = null;

                        for (let i = 0, len = channels.length; i < len; i++) {
                            channel = channels[i];
                            target = this.targets.get(channel?.targetName);
                            const setfunc = AnimationChannelTargetPath.setFunc(channel.propertyName);
                            setfunc(channel.values[0], target);
                        }
                    } else { // --------------------------------play end
                        // this.enableTimeFlow = false;
                        this._state = ClipStateEnum.ENDED;
                        return;
                    }
                }
            }
            this.curFrame = newFrame;
            // console.warn("current frame", currentFrame);
            for (let i = 0, len = channels.length; i < len; i++) {
                channel = channels[i];
                if (newFrame < channel.startFrame || newFrame > channel.endFrame) continue;
                target = this.targets.get(channel?.targetName);
                if (target == null) continue;
                keyframes = channel.keyframes;
                // ---------------------------------寻找lerp start end frame
                let startIndex = this.temptLastStartIndex ?? ((keyframes.length - 1) * newFrame / channel.endFrame) | 0;
                if (keyframes[startIndex] < newFrame) {
                    startIndex++;
                    while (keyframes[startIndex] < newFrame) { startIndex++; }
                    if (keyframes[startIndex] > newFrame) { startIndex--; }
                } else {
                    while (keyframes[startIndex] > newFrame) { startIndex--; }
                }
                this.temptLastStartIndex = startIndex;

                let endIndex = startIndex + 1;
                if (keyframes[endIndex] == null) {
                    endIndex = startIndex;
                    const setfunc = AnimationChannelTargetPath.setFunc(channel.propertyName);
                    setfunc(channel.values[startIndex], target);
                } else {
                    const lerpfunc = AnimationChannelTargetPath.lerpFunc(channel.propertyName);
                    const lerp = (this.curFrame - keyframes[startIndex]) / (keyframes[endIndex] - keyframes[startIndex]);
                    lerpfunc(channel.values[startIndex], channel.values[endIndex], lerp, target);
                }
            }
        }
    }

    private temptLastStartIndex: number;
    _update(deltaTime: number) {
        if (this._state == ClipStateEnum.INITING) {
            ClipInstance.init(this);
        } else if (this._state == ClipStateEnum.PLAYING) {
            this._excecute(deltaTime);
        }
    }

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
    const temptPos = Vec3.create();
    const temptScale = Vec3.create();
    const temptQuat = Quat.create();
    const funcMap: Map<AnimationChannelTargetPath, (from: any, to: any, lerp: number, obj: Entity) => void> = new Map();
    {
        funcMap.set(AnimationChannelTargetPath.ROTATION, (from: Quat, to: Quat, lerp: number, obj: Entity) => {
            Quat.lerp(from, to, lerp, temptQuat);
            Quat.normalize(temptQuat, temptQuat);
            if (isNaN(temptQuat.x)) {
                console.warn("error");
            }
            obj.localRotation = temptQuat;
        });
        funcMap.set(AnimationChannelTargetPath.SCALE, (from: Vec3, to: Vec3, lerp: number, obj: Entity) => {
            Vec3.lerp(from, to, lerp, temptScale);
            obj.localScale = temptScale;
        });
        funcMap.set(AnimationChannelTargetPath.TRANSLATION, (from: Vec3, to: Vec3, lerp: number, obj: Entity) => {
            Vec3.lerp(from, to, lerp, temptPos);
            obj.localPosition = temptPos;
        });
        funcMap.set(AnimationChannelTargetPath.WEIGHTS, (from: number, to: number, lerp: number, obj: any) => {
            obj.WEIGHTS = numberLerp(from, to, lerp);
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
