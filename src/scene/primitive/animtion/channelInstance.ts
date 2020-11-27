import { AnimationChannel } from "../../asset/animationClip";
import { Entity } from "../../../core/entity";
import { AnimationChannelTargetPath } from "./clipInstance";


export class ChannelInstance {
    channel: AnimationChannel;

    private beinit: boolean = false;
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
        this.beinit = true;
    }

    jumpToStart() {
        if (!this.beinit)
            return;
        this.setFunc(this.channel.values[0], this.target);
        this.temptLastStartIndex = null;
    }

    excecute(currentFrame: number) {
        if (!this.beinit)
            return;
        if (currentFrame < this.channel.startFrame || currentFrame > this.channel.endFrame)
            return;

        let { keyframes, endFrame, values } = this.channel;
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
        let endIndex = startIndex + 1;

        if (keyframes[endIndex] == null) {
            this.setFunc(values[startIndex], this.target);
        } else {
            let frameOffset = keyframes[endIndex] - keyframes[startIndex];
            if (frameOffset == 0) return;
            const lerp = (currentFrame - keyframes[startIndex]) / frameOffset;
            let value = this.lerpFunc(values[startIndex], values[endIndex], lerp);
            this.setFunc(value, this.target);
        }
    }
}