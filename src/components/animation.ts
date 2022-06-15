import { Component, Entity } from "../scene";
import { AnimationClip } from "../resources/animationClip";
import { ClipInstance, ClipOptions } from "../scene/primitive/animation/clipInstance";

export class Animation extends Component {
    /**是否自动播放 */
    beAutoPlay: boolean = true;
    bePlaying = false;
    /**播放速度*/
    timeScale = 1;
    private _clips: AnimationClip[] = [];
    /** 动画 */
    get clips() { return this._clips; }
    private _currentClip: ClipInstance;
    /** 当前动画 */
    get currentClip() { return this._currentClip; }
    private _clipsMap: Map<string, ClipInstance> = new Map();
    /**添加动画 */
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
    /**播放动画 */
    play(clipName: string) {
        let newClip = this._clipsMap.get(clipName);
        if (newClip != null) {
            this._currentClip = newClip;
            this._currentClip._reset();
        } else {
            console.warn(`播放动画失败，无法找到动画[name=${clipName}]`);
        }
    }
    /**播放动画 */
    playByIndex(index: number, options?: { onEnd?: () => void }) {
        const clip = this._clips[index];
        if (clip) {
            this._currentClip = this._clipsMap.get(clip.id);
            this._currentClip._reset();
            if (options?.onEnd != null) {
                this._currentClip.onEnd.addEventListener(options.onEnd);
            }
        } else {
            console.warn(`播放动画失败，无法找到动画[index=${index}]`);
        }
    }
    frameIndex: number;
    /** 指定动画播放帧 */
    playFrameIndex(clipName: string, frameIndex: number) {
        let newClip = this._clipsMap.get(clipName);
        if (newClip != null) {
            this.frameIndex = frameIndex;
            this._currentClip = newClip;
            this._currentClip._reset();
        } else {
            console.warn(`播放动画帧失败，无法找到动画[name=${clipName}]`);
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
