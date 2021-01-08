import { AbsSystem } from "../core/absSystem";
import { Collider } from "./collider";

export class ColliderSystem extends AbsSystem<Collider> {
    careCompCtors: (new () => Collider<any>)[] = [Collider];

    update(delta: number) {
        this.comps.forEach(([comp]) => {

        })
    }
}