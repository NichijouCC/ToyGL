import { Component, Entity } from "../scene";
import { AnimationClip } from "../resources/animationClip";
import { ClipInstance, ClipOptions } from "../scene/primitive/animation/clipInstance";

export class Animation extends Component {
    beAutoPlay: boolean = true;
    private _clips: AnimationClip[] = [];
    get clips() { return this._clips; }

    private _currentClip: ClipInstance;
    get currentClip() { return this._currentClip; }
    get bePlaying() { return this._currentClip?.bePlaying ?? false; }

    private _clipsMap: Map<string, ClipInstance> = new Map();

    addAnimationClip(clip: AnimationClip, options?: ClipOptions) {
        if (!this._clipsMap.has(clip.id)) {
            const newClip = new ClipInstance(clip, { root: () => { return this.entity; }, ...options });
            this._clipsMap.set(clip.id, newClip);
            this._clips.push(clip);
            return newClip;
        } else {
            console.warn(`animation already have the AnimationClip ${clip.name}`);
            return this._clipsMap.get(clip.id);
        }
    }

    init() {
        this._clipsMap.forEach(item => item._init());
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
        const clip = this._clips[index];
        if (clip) {
            this._currentClip = this._clipsMap.get(clip.id);
            this._currentClip._reset();
            if (options?.onEnd != null) {
                this._currentClip.onEnd.addEventListener(options.onEnd);
            }
        }
    }

    crossFade(clip: AnimationClip | string) {

    }

    clone(): Animation {
        const newComp: Animation = this.entity.ecs.createComp(this.constructor as any);
        this._clips.forEach(item => {
            newComp.addAnimationClip(item);
        });
        return newComp;
    }
}
