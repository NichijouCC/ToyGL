import { BassCompSystem } from "./BassCompSystem";
import { Animation } from "./Animation";

export class AnimationSystem extends BassCompSystem {
    caredComps: string[] = [Animation.name];

    update(deltaTime: number) {
        this.comps.forEach(item => {
            const animation = item[0] as Animation;
            if (animation.currentClip) {
                animation.currentClip.update(deltaTime);
            } else {
                if (animation.beAutoPlay && animation.clips.length > 0) {
                    animation.play(animation.clips[0]);
                }
            }
        });
    }
}
