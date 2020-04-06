import { BassCompSystem } from "./BassCompSystem";
import { Animation } from "./Animation";

export class AnimationSystem extends BassCompSystem {
    caredComps: string[] = [Animation.name];

    update(deltaTime: number) {
        this.comps.forEach(item => {
            let animation = item[0] as Animation;
            animation.currentClip?.update(deltaTime);
        })
    }
}