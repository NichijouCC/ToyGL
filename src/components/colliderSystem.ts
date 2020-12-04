import { AbstractCompSystem } from "./abstractCompSystem";
import { Collider } from "./collider";

export class ColliderSystem extends AbstractCompSystem<Collider<any>> {
    careCompCtors: (new () => Collider<any>)[] = [Collider];

    update(delta: number) {
        this.comps.forEach(([comp]) => {

        })
    }
}