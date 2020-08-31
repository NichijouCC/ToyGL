import { Isystem, UniteBitkey, Icomponent } from "../core/ecs";
import { Entity } from "../core/entity";
import { EventEmitter } from "../core/eventEmitter";
export abstract class BassCompSystem<T extends Icomponent> extends EventEmitter<IcompSymEvent> implements Isystem {
    protected careCompCtors: (new ()=>T)[]=[];
    get careComps() { return this.careCompCtors.map(item => item.name); }
    uniteBitkey: UniteBitkey = new UniteBitkey();
    protected comps: Map<number, T[]> = new Map();
    tryAddEntity(entity: Entity): void {
        if (!this.comps.has(entity.id)) {
            const comps = this.careCompCtors.map(comp => entity.getComponent(comp.name));
            this.comps.set(entity.id, comps);
            this.fire("afterAddE", comps);
        }
    }

    tryRemoveEntity(entity: Entity): void {
        if (this.comps.has(entity.id)) {
            this.fire("beforeRemoveE", this.comps.get(entity.id));
            this.comps.delete(entity.id);
        }
    }

    update(deltaTime: number): void { }
}

export interface IcompSymEvent{
    "afterAddE":any,
    "beforeRemoveE":any,
}
