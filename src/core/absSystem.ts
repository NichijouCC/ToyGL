import { EventEmitter } from "@mtgoo/ctool";
import { AbsComponent } from "./absComponent";
import { UniteBitkey } from "./bitkey";
import { Isystem, UPDATE } from "./ecs";
import { Entity } from "./entity";

export abstract class AbsSystem<T = any> extends EventEmitter<IsystemEvents> implements Isystem {
    abstract careCompCtors: (new () => any)[];
    get careComps(): string[] { return this.careCompCtors.map(item => item.name) }
    readonly uniteBitkey: UniteBitkey = new UniteBitkey();
    /**
     * entityID => componentArr
     */
    protected comps: Map<string, T> = new Map();

    constructor() {
        super();
        this.onEnable();
    }

    onEnable(): void { }

    addEntity(entity: Entity): void {
        if (!this.comps.has(entity.id)) {
            const comps = this.careCompCtors.map(comp => entity.getComponent(comp));
            this.comps.set(entity.id, comps as any);
            this.emit("addEntity", { entity, comps });
        }
    }

    removeEntity(entity: Entity): void {
        if (this.comps.has(entity.id)) {
            this.emit("removeEntity", { entity, comps: this.comps.get(entity.id) as any });
            this.comps.delete(entity.id);
        }
    }

    [UPDATE](deltaTime: number) {
        this.update(deltaTime);
        this.comps.forEach((comps) => {
            (comps as any).forEach((comp: any) => comp[UPDATE]())
        })
    }

    update(deltaTime: number): void { }
}

interface IsystemEvents {
    onEnable: void;
    addEntity: { entity: Entity, comps: any[] }
    removeEntity: { entity: Entity, comps: any[] }
}