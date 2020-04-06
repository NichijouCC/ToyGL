import { AnimationClip, AnimationChannel } from "../asset/AnimationClip";
import { Entity } from "../../core/Entity";
import { Quat } from "../../mathD/quat";
import { Vec3 } from "../../mathD/vec3";
import { numberLerp } from "../../mathD/common";

export class ClipInstance {
    private clip: AnimationClip;
    private targets: Map<string, Entity> = new Map();
    private curFrame: number = 0;
    private speed: number = 1;
    private localTime: number = 0;
    private enableTimeFlow: boolean = false;
    private beLoop: boolean = false;

    constructor(clip: AnimationClip, options: { animator: Entity } & ClipInsOptions) {
        this.clip = clip;
        this.curFrame = 0;
        this.speed = options.speed ?? 1;
        this.beLoop = options.beLoop ?? false;

        let animatorEntity = options.animator;
        clip.channels.forEach(item => {
            let bone = animatorEntity.find(child => item.targetName == child.name);
            if (bone != null) {
                this.targets.set(item.targetName, bone);
            } else {
                console.warn("cannot find bone.", item.targetName);
            }
        })
    }

    active() {
        this.enableTimeFlow = true;
        this.curFrame = 0;
        this.localTime = 0;
    }
    disactive() {
        this.enableTimeFlow = false;
    }

    private temptLastStartIndex: number;
    update(deltaTime: number) {
        if (!this.enableTimeFlow) return;
        this.localTime += deltaTime * this.speed;
        let currentFrame = (this.localTime * this.clip.FPS) | 0;
        if (currentFrame != this.curFrame) {
            let { totalFrame, channels } = this.clip;
            if (currentFrame > totalFrame && this.curFrame < totalFrame) {
                currentFrame = totalFrame;
            } else {
                if (this.beLoop) {//----------------------restart play
                    currentFrame = 0;
                    this.localTime = 0;
                    this.temptLastStartIndex = null;
                } else {//--------------------------------play end
                    this.enableTimeFlow = false;
                    return;
                }
            }
            this.curFrame = currentFrame;

            let channel: AnimationChannel, target: Entity, keyframes: number[];
            for (let i = 0, len = channels.length; i < len; i++) {
                channel = channels[i];
                target = this.targets.get(channel?.targetName);
                if (target == null) continue;
                keyframes = channel.keyframes;
                if (currentFrame < channel.startFrame || currentFrame > channel.endFrame) continue;


                //---------------------------------寻找lerp start end frame
                let startIndex = this.temptLastStartIndex ?? ((keyframes.length - 1) * currentFrame / channel.endFrame) | 0;
                if (keyframes[startIndex] < currentFrame) {
                    startIndex++;
                    while (keyframes[startIndex] < currentFrame) { startIndex++; }
                    if (keyframes[startIndex] > currentFrame) { startIndex--; }
                } else {
                    while (keyframes[startIndex] > currentFrame) { startIndex--; }
                }
                this.temptLastStartIndex = startIndex;

                let endIndex = startIndex + 1;
                if (endIndex > channel.endFrame) {
                    endIndex = channel.endFrame;
                }
                let lerpfunc = AnimationChannelTargetPath.lerpFunc(channel.propertyName);
                let lerp = (this.curFrame - keyframes[startIndex]) / (keyframes[endIndex] - keyframes[startIndex]);
                lerpfunc(channel.values[startIndex], channel.values[endIndex], lerp, target);
            }
        }
    }
}

export interface ClipInsOptions {
    speed?: number,
    beLoop?: boolean
}

export enum AnimationChannelTargetPath {
    ROTATION,
    SCALE,
    TRANSLATION,
    WEIGHTS
}

export namespace AnimationChannelTargetPath {
    let funcMap: Map<AnimationChannelTargetPath, (from: any, to: any, lerp: number, obj: Entity) => void> = new Map();
    {
        funcMap.set(AnimationChannelTargetPath.ROTATION, (from: Quat, to: Quat, lerp: number, obj: Entity) => {
            Quat.lerp(from, to, lerp, obj.localRotation);
            Quat.normalize(obj.localRotation, obj.localRotation);
        });
        funcMap.set(AnimationChannelTargetPath.SCALE, (from: Vec3, to: Vec3, lerp: number, obj: Entity) => {
            Vec3.lerp(from, to, lerp, obj.localScale);
        });
        funcMap.set(AnimationChannelTargetPath.TRANSLATION, (from: Vec3, to: Vec3, lerp: number, obj: Entity) => {
            Vec3.lerp(from, to, lerp, obj.localPosition);
        });
        funcMap.set(AnimationChannelTargetPath.WEIGHTS, (from: number, to: number, lerp: number, obj: any) => {
            obj["WEIGHTS"] = numberLerp(from, to, lerp);
        });
    }
    export const lerpFunc = (value: AnimationChannelTargetPath) => {
        return funcMap.get(value);
    }
}