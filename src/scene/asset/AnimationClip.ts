import { Asset } from "./Asset";
import { AnimationChannelTargetPath } from "../primitive/ClipInstance";

export class AnimationClip extends Asset {
    channels: AnimationChannel[] = [];
    totalFrame: number;
    readonly FPS: number = 30;
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class AnimationChannel {
    targetName: string;//find transform(bone);
    propertyName: AnimationChannelTargetPath;
    keyframes: number[] = [];
    values: any[] = [];
    interPolation: InterPloateEnum;

    get startFrame() { return this.keyframes[0] };
    get endFrame() { return this.keyframes[this.keyframes.length] };
}

export enum InterPloateEnum {
    LINER,
    STEP,
    CUBICSPINE
}