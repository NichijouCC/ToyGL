import { Asset } from "./Asset";
import { AnimationChannelTargetPath } from "../primitive/ClipInstance";

export class AnimationClip extends Asset {
    channels: AnimationChannel[] = [];
    totalFrame: number = 0;
    static readonly FPS: number = 30;

    constructor(name?: string) {
        super();
        this.name = name;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class AnimationChannel {
    targetName: string;//find transform(bone) by TargetName;
    propertyName: AnimationChannelTargetPath;
    keyframes: number[] = [];
    values: any[] = [];
    interPolation: AnimationSamplerInterpolation;

    get startFrame() { return this.keyframes[0] };
    get endFrame() { return this.keyframes[this.keyframes.length - 1] };
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
    CUBICSPLINE = "CUBICSPLINE",
}