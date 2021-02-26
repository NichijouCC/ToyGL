import { System } from "../core/ecs/system";
import { Animation } from "./animation";

export class AnimationSystem extends System<{ "comps": Animation[][] }> {
    caries = { "comps": [Animation] };
    update(deltaTime: number) {
        this.queries.comps.forEach(([comp]) => {
            if (comp.currentClip) {
                comp.currentClip._update(deltaTime);
            } else {
                if (comp.beAutoPlay && comp.clips.length > 0) {
                    comp.playByIndex(0);
                }
            }
        });
    }
}
