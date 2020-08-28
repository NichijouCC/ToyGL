import { Isystem, UniteBitkey, Icomponent } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { EventCompositedHandler } from "../core/EventCompositedHandler";
export abstract class BassCompSystem extends EventCompositedHandler implements Isystem {
    abstract caredComps: string[];
    uniteBitkey: UniteBitkey = new UniteBitkey();
    protected comps: Map<number, Icomponent[]> = new Map();
    tryAddEntity(entity: Entity): void {
        if (!this.comps.has(entity.id)) {
            const comps = this.caredComps.map(comp => entity.getComponent(comp));
            this.comps.set(entity.id, comps);
            this.fire(CompSymEventEnum.afterAddE, comps);
        }
    }

    tryRemoveEntity(entity: Entity): void {
        if (this.comps.has(entity.id)) {
            this.fire(CompSymEventEnum.beforeRemoveE, this.comps.get(entity.id));
            this.comps.delete(entity.id);
        }
    }

    update(deltaTime: number): void { }
}
export enum CompSymEventEnum {
    afterAddE = "afterAddE",
    beforeRemoveE = "beforeRemoveE"
}
