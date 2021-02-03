import { AbsComponent } from "./absComponent";
import { UniteBitkey } from "./bitkey";
import { Isystem, UPADTE } from "./ecs";
import { Entity } from "./entity";

export abstract class AbsSystem<T extends AbsComponent> implements Isystem {
    abstract careCompCtors: (new () => T)[];
    get careComps() { return this.careCompCtors.map(item => item.name); }
    readonly uniteBitkey: UniteBitkey = new UniteBitkey();
    /**
     * enityID => compoentArr
     */
    protected comps: Map<string, T[]> = new Map();
    addEntity(entity: Entity): void {
        if (!this.comps.has(entity.id)) {
            const comps = this.careCompCtors.map(comp => entity.getComponent(comp));
            this.comps.set(entity.id, comps);
        }
    }

    removeEntity(entity: Entity): void {
        if (this.comps.has(entity.id)) {
            this.comps.delete(entity.id);
        }
    }

    [UPADTE](deltaTime: number) {
        this.update(deltaTime);
        this.comps.forEach((comps) => {
            comps.forEach(comp => comp[UPADTE]())
        })
    }

    update(deltaTime: number): void { }
}
