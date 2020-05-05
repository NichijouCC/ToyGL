import { Icomponent, Ecs } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { AnimationClip } from "../scene/asset/AnimationClip";
import { ClipInstance, ClipInsOptions } from "../scene/primitive/ClipInstance";

@Ecs.registeComp
export class Animation implements Icomponent {
    readonly entity: Entity;

    private _clipsMap: Map<string, { ins: ClipInstance, clip: AnimationClip }> = new Map();
    private _clips: AnimationClip[] = [];
    get clips() { return this._clips }
    addAnimationClip(clip: AnimationClip, options?: ClipInsOptions) {
        if (!this._clipsMap.has(clip.name)) {
            let clipIns = new ClipInstance(clip, { animator: this.entity, ...options });
            this._clipsMap.set(clip.name, { ins: clipIns, clip: clip });
            this._clips.push(clip);
            return clipIns
        } else {
            return this._clipsMap.get(clip.name).ins;
        }
    }
    beAutoPlay: boolean = true;
    private _currentClip: ClipInstance;
    get currentClip() { return this._currentClip }

    play(clip: AnimationClip | string) {
        if (this._currentClip != null) {
            //TODO
        }
        let playClip: ClipInstance;
        if (typeof clip == "string") {
            playClip = this._clipsMap.get(clip).ins;
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

