import { AbsSystem } from "../core/absSystem";
import { Animation } from "./animation";

export class AnimationSystem extends AbsSystem<Animation> {
    careCompCtors: (new () => Animation)[] = [Animation];

    static queries = [[Animation]];

    update(deltaTime: number) {
        this.comps.forEach(item => {
            const animation = item[0];
            if (animation.currentClip) {
                animation.currentClip._update(deltaTime);
            } else {
                if (animation.beAutoPlay && animation.clips.length > 0) {
                    animation.play(animation.clips[0]);
                }
            }
        });
    }
}
