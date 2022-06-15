import { AnimationChannelTargetPath } from "../scene/primitive/animation/channelInstance";
import { Asset } from "./asset";

export class AnimationClip extends Asset {
    channels: AnimationChannel[] = [];
    totalTime: number = 0;
    get totalFrame() { return (this.totalTime * AnimationClip.FPS) | 0 }
    static readonly FPS: number = 30;

    constructor(name?: string) {
        super();
        this.name = name ?? "clip_" + this.id;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class AnimationChannel {
    targetName: string;// find transform(bone) by TargetName;
    propertyName: AnimationChannelTargetPath;
    /** 关键帧时间 */
    keyframes: number[] = [];
    values: any[] = [];
    interPolation: AnimationSamplerInterpolation = AnimationSamplerInterpolation.LINEAR;

    get startTime() { return this.keyframes[0]; };
    get endTime() { return this.keyframes[this.keyframes.length - 1]; };
}

export enum AnimationSamplerInterpolation {
    /**
     * The animated values are linearly interpolated between keyframes
     */
    LINEAR = "LINEAR",
    /**
     * The animated values remain constant to the output of the first keyframe, until the next keyframe
     */
    STEP = "STEP",
    /**
     * The animation's interpolation is computed using a cubic spline with specified tangents
     */
    CUBIC_SPLINE = "CUBICSPLINE",
}
