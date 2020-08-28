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
    private beLoop: boolean;

    constructor(clip: AnimationClip, options: { animator: Entity } & ClipInsOptions) {
        this.clip = clip;
        this.curFrame = 0;
        this.speed = options.speed ?? 1;
        this.beLoop = options.beLoop ?? true;

        const animatorEntity = options.animator;
        clip.channels.forEach(item => {
            const bone = animatorEntity.find(child => item.targetName == child.name);
            if (bone != null) {
                this.targets.set(item.targetName, bone);
            } else {
                console.warn("cannot find bone.", item.targetName);
            }
        });
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
        let currentFrame = (this.localTime * AnimationClip.FPS) | 0;
        if (currentFrame != this.curFrame) {
            const { totalFrame, channels } = this.clip;
            let channel: AnimationChannel, target: Entity, keyframes: number[];
            if (currentFrame > totalFrame) {
                if (this.curFrame < totalFrame) {
                    currentFrame = totalFrame;
                } else {
                    if (this.beLoop) { // ----------------------restart play
                        currentFrame = 0;
                        this.localTime = 0;
                        this.temptLastStartIndex = null;

                        for (let i = 0, len = channels.length; i < len; i++) {
                            channel = channels[i];
                            target = this.targets.get(channel?.targetName);
                            const setfunc = AnimationChannelTargetPath.setFunc(channel.propertyName);
                            setfunc(channel.values[0], target);
                        }
                    } else { // --------------------------------play end
                        this.enableTimeFlow = false;
                        return;
                    }
                }
            }
            this.curFrame = currentFrame;
            // console.warn("current frame", currentFrame);
            for (let i = 0, len = channels.length; i < len; i++) {
                channel = channels[i];
                if (currentFrame < channel.startFrame || currentFrame > channel.endFrame) continue;
                target = this.targets.get(channel?.targetName);
                if (target == null) continue;
                keyframes = channel.keyframes;
                // ---------------------------------寻找lerp start end frame
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
}

export interface ClipInsOptions {
    speed?: number,
    beLoop?: boolean
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
    const funcMap: Map<AnimationChannelTargetPath, (from: any, to: any, lerp: number, obj: Entity) => void> = new Map(); {
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

    const setMap: Map<AnimationChannelTargetPath, (value: any, obj: Entity) => void> = new Map(); {
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
