import { Icomponent, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { AnimationClip } from "../scene/asset/animationClip";
import { ClipInstance, ClipOptions } from "../scene/primitive/clipInstance";

@Ecs.registeComp
export class Animation implements Icomponent {
    readonly entity: Entity;
    private _clipsMap: Map<string, ClipInstance> = new Map();
    private _clips: AnimationClip[] = [];
    beAutoPlay: boolean = true;
    private _currentClip: ClipInstance;

    get clips() { return this._clips; }
    get currentClip() { return this._currentClip; }
    get beplaying() { return this._currentClip?.beplaying ?? false; }

    addAnimationClip(clip: AnimationClip, options?: ClipOptions) {
        if (!this._clipsMap.has(clip.name)) {
            const newClip = new ClipInstance(clip, { animator: () => { return this.entity; }, ...options });
            this._clipsMap.set(clip.name, newClip);
            this._clips.push(clip);
            return newClip;
        } else {
            console.warn(`animation already have an AnimationClip be named ${clip.name}`);
            return this._clipsMap.get(clip.name);
        }
    }

    play(clip: AnimationClip | string) {
        if (typeof clip == "string") {
            this._currentClip = this._clipsMap.get(clip);
        } else {
            const playClip = this.addAnimationClip(clip);
            this._currentClip = playClip;
        }
    }

    crossFade(clip: AnimationClip | string) {

    }
}
