import { COMPS, IComponent, IEntity, UNIT_BIT_KEY } from "./iecs";
import { ECS } from "./ecs";
import { UnitedBitKey } from "./bitKey";
import { UUID } from "@mtgoo/ctool";

export class Entity implements IEntity {
    readonly id: string = UUID.create_v4();
    [COMPS]: { [compName: string]: IComponent } = {};
    [UNIT_BIT_KEY]: UnitedBitKey = new UnitedBitKey();
    addComponent<T extends IComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const newComp = ECS.createComp(comp, properties);
        if (newComp) ECS.bindCompToEntity(this, newComp);
        return newComp;
    }

    addComponentIns<T extends IComponent>(comp: T) {
        if (comp) ECS.bindCompToEntity(this, comp);
        return comp;
    }

    getComponent<T extends IComponent>(comp: new () => T): T { return this[COMPS][comp.name] as T; }
    getComponentByName<T extends IComponent = any>(comp: string): T { return this[COMPS][comp] as T; }
    removeComponent<T extends IComponent>(comp: new () => T): void { ECS.unbindCompToEntity(this, comp); }
}
