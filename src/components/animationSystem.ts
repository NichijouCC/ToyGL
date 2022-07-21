import { Entity, System } from "../scene";
import { Animation } from "./animation";

export class AnimationSystem extends System {
    caries = { comps: [Animation] };
    update(deltaTime: number) {
        this.queries.comps.forEach((node) => {
            if (node.beInWorld == false) return;
            const comp = node.getComponent(Animation);
            if (comp.currentClip) {
                if (comp.frameIndex != null) {
                    comp.currentClip.setFrameIndex(comp.frameIndex);
                } else {
                    comp.currentClip._update(deltaTime * comp.timeScale);
                }
            } else {
                if (comp.beAutoPlay && comp.clips.length > 0) {
                    comp.playByIndex(0);
                }
            }
        });
    }
}
