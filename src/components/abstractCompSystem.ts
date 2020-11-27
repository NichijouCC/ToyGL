import { Isystem, UniteBitkey, Icomponent } from "../core/ecs";
import { Entity } from "../core/entity";
import { EventEmitter } from '@mtgoo/ctool';

export abstract class AbstractCompSystem<T extends Icomponent> extends EventEmitter<IcompSymEvent> implements Isystem {
    abstract careCompCtors: (new () => T)[] = [];
    get careComps() { return this.careCompCtors.map(item => item.name); }
    readonly uniteBitkey: UniteBitkey = new UniteBitkey();
    /**
     * enityID => compoentArr
     */
    protected comps: Map<number, T[]> = new Map();
    tryAddEntity(entity: Entity): void {
        if (!this.comps.has(entity.id)) {
            const comps = this.careCompCtors.map(comp => entity.getComponent(comp.name));
            this.comps.set(entity.id, comps);
            this.emit("afterAddE", comps);
        }
    }

    tryRemoveEntity(entity: Entity): void {
        if (this.comps.has(entity.id)) {
            this.emit("beforeRemoveE", this.comps.get(entity.id));
            this.comps.delete(entity.id);
        }
    }

    update(deltaTime: number): void { }
}

export interface IcompSymEvent {
    "afterAddE": any,
    "beforeRemoveE": any,
}
