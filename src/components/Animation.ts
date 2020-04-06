import { Icomponent } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { AnimationClip } from "../scene/asset/AnimationClip";
import { ClipInstance, ClipInsOptions } from "../scene/primitive/ClipInstance";

export class Animation implements Icomponent {
    readonly entity: Entity;

    private clips: Map<string, ClipInstance> = new Map();
    addAnimationClip(clip: AnimationClip, options?: ClipInsOptions) {
        let clipIns = new ClipInstance(clip, { animator: this.entity, ...options });
        this.clips.set(clip.name, clipIns);
        return clipIns;
    }

    private _currentClip: ClipInstance;
    get currentClip() { return this._currentClip }

    play(clip: AnimationClip | string) {
        if (this._currentClip != null) {
            //TODO
        }
        let playClip: ClipInstance;
        if (typeof clip == "string") {
            playClip = this.clips.get(clip);
        } else {
            playClip = this.addAnimationClip(clip);
        }
        if (playClip != null) {
            this._currentClip = playClip;
            playClip.active();
        } else {
            console.warn("failed to play clip!", clip);
        }
    }
}

