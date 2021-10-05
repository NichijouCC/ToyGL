import { numberLerp, quat, vec3 } from "../../../mathD";
import { AnimationChannel } from "../../../resources/animationClip";
import { Entity } from "../../entity";

export class ChannelInstance {
    channel: AnimationChannel;

    private beInit: boolean = false;
    private target: Entity;
    private setFunc: (value: any, obj: Entity) => void;
    private lerpFunc: (from: number, to: number, lerp: number) => any;

    private temptLastStartIndex: number;

    constructor(channel: AnimationChannel) {
        this.channel = channel;
    }

    init(root: Entity) {
        const bone = root.find(child => this.channel.targetName == child.name);
        if (bone != null) {
            this.target = bone;
        } else {
            console.warn("cannot find bone.", this.channel.targetName);
            return;
        }
        this.setFunc = AnimationChannelTargetPath.setFunc(this.channel.propertyName);
        this.lerpFunc = AnimationChannelTargetPath.lerpFunc(this.channel.propertyName);
        this.beInit = true;
    }

    jumpToStart() {
        if (!this.beInit) { return; }
        this.setFunc(this.channel.values[0], this.target);
        this.temptLastStartIndex = null;
    }

    execute(currentFrame: number) {
        if (!this.beInit) { return; }
        if (currentFrame < this.channel.startFrame || currentFrame > this.channel.endFrame) { return; }

        const { keyframes, endFrame, values } = this.channel;
        // ---------------------------------寻找lerp start end frame
        let startIndex = this.temptLastStartIndex ?? ((keyframes.length - 1) * currentFrame / endFrame) | 0;
        if (keyframes[startIndex] < currentFrame) {
            startIndex++;
            while (keyframes[startIndex] < currentFrame) { startIndex++; }
            if (keyframes[startIndex] > currentFrame) { startIndex--; }
        } else {
            while (keyframes[startIndex] > currentFrame) { startIndex--; }
        }
        this.temptLastStartIndex = startIndex;
        const endIndex = startIndex + 1;

        if (keyframes[endIndex] == null) {
            this.setFunc(values[startIndex], this.target);
        } else {
            const frameOffset = keyframes[endIndex] - keyframes[startIndex];
            if (frameOffset == 0) return;
            const lerp = (currentFrame - keyframes[startIndex]) / frameOffset;
            const value = this.lerpFunc(values[startIndex], values[endIndex], lerp);
            this.setFunc(value, this.target);
        }
    }
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
    const temptQuat = quat.create();
    const funcMap: Map<AnimationChannelTargetPath, (from: any, to: any, lerp: number) => any> = new Map(); {
        funcMap.set(AnimationChannelTargetPath.ROTATION, (from: quat, to: quat, lerp: number) => {
            quat.slerp(temptQuat, from, to, lerp);
            // quat.normalize(temptQuat, temptQuat);
            return temptQuat;
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
