import { Icomponent, Ecs } from "../core/ecs";
import { AnimationClip } from "../scene/asset/animationClip";
import { ClipInstance, ClipOptions } from "../scene/primitive/animtion/clipInstance";
import { AbstractComponent } from "./abstractComponent";

@Ecs.registeComp
export class Animation extends AbstractComponent {
    private _clipsMap: Map<string, ClipInstance> = new Map();
    private _clips: AnimationClip[] = [];
    beAutoPlay: boolean = true;
    private _currentClip: ClipInstance;

    get clips() { return this._clips; }
    get currentClip() { return this._currentClip; }
    get beplaying() { return this._currentClip?.beplaying ?? false; }

    addAnimationClip(clip: AnimationClip, options?: ClipOptions) {
        if (!this._clipsMap.has(clip.name)) {
            const newClip = new ClipInstance(clip, { root: () => { return this.entity; }, ...options });
            this._clipsMap.set(clip.name, newClip);
            this._clips.push(clip);
            return newClip;
        } else {
            console.warn(`animation already have an AnimationClip be named ${clip.name}`);
            return this._clipsMap.get(clip.name);
        }
    }

    play(clip: AnimationClip | string) {
        let newClip: ClipInstance;
        if (typeof clip == "string") {
            newClip = this._clipsMap.get(clip);
        } else {
            newClip = this.addAnimationClip(clip);
        }
        if (newClip != null) {
            this._currentClip = newClip;
            this._currentClip._reset();
        }
    }
    playByIndex(index: number, options?: { onEnd?: () => void }) {
        let clip = this._clips[index];
        if (clip) {
            this._currentClip = this._clipsMap.get(clip.name);
            this._currentClip._reset();
            if (options?.onEnd != null) {
                this._currentClip.onEnd.addEventListener(options.onEnd)
            }
        }
    }

    crossFade(clip: AnimationClip | string) {

    }
}
