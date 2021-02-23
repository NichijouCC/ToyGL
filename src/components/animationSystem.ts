import { AbsSystem } from "../core/absSystem";
import { Animation } from "./animation";

export class AnimationSystem extends AbsSystem<[Animation]> {
    careCompCtors = [Animation];
    update(deltaTime: number) {
        this.comps.forEach(([comp]) => {
            if (comp.currentClip) {
                comp.currentClip._update(deltaTime);
            } else {
                if (comp.beAutoPlay && comp.clips.length > 0) {
                    comp.play(comp.clips[0]);
                }
            }
        });
    }
}
