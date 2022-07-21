import { COMPS, IComponent, IEntity, UNIT_BIT_KEY } from "./iecs";
import { ECS } from "./ecs";
import { UnitedBitKey } from "./bitKey";
import { EventEmitter, UUID } from "@mtgoo/ctool";

// export interface IEntityEvent {
//     "AddComp": IComponent,
//     "removeComp": IComponent
// }

export class Entity implements IEntity {
    readonly ecs: ECS;
    readonly id: string = UUID.create_v4();
    [COMPS]: { [compName: string]: IComponent } = {};
    [UNIT_BIT_KEY]: UnitedBitKey = new UnitedBitKey();

    constructor(ecs: ECS) {
        this.ecs = ecs;
        ecs.addEntity(this);
    }

    addComponent<T extends IComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const newComp = this.ecs.createComp(comp, properties);
        if (newComp) this.ecs.addCompToEntity(this, newComp);
        return newComp;
    }

    addComponentDirect<T extends IComponent>(comp: T) {
        if (comp) this.ecs.addCompToEntity(this, comp);
        return comp;
    }

    getComponent<T extends IComponent>(comp: new () => T): T { return this[COMPS][comp.name] as T; }
    getComponentByName<T extends IComponent = any>(comp: string): T { return this[COMPS][comp] as T; }
    removeComponent<T extends IComponent>(comp: new () => T): void {
        this.ecs.removeCompFromEntity(this, comp);
    }
}
