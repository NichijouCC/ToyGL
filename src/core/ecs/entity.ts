import { COMPS, Icomponent, Ientity, UNIT_BIT_KEY } from "./iecs";
import { Ecs } from "./ecs";
import { UnitedBitkey } from "./bitkey";
import { Transform } from "../transform";
import { EventTarget } from "@mtgoo/ctool";

export class Entity extends Transform implements Ientity {
    name: string;
    private constructor() { super() }

    static create(properties?: Partial<Entity>) {
        return Ecs.createEntity(properties);
    }
    static onDirty = new EventTarget<Entity>();
    [COMPS]: { [compName: string]: Icomponent } = {};
    [UNIT_BIT_KEY]: UnitedBitkey = new UnitedBitkey();
    addComponent<T extends Icomponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const newComp = Ecs.createComp(comp, properties);
        if (newComp) Ecs.bindCompToEntity(this, newComp);
        return newComp;
    }

    addComponentIns<T extends Icomponent>(comp: T) {
        if (comp) Ecs.bindCompToEntity(this, comp);
        return comp;
    }

    getComponent<T extends Icomponent>(comp: new () => T): T { return this[COMPS][comp.name] as T; }
    getComponentByName<T extends Icomponent = any>(comp: string): T { return this[COMPS][comp] as T; }
    removeComponent<T extends Icomponent>(comp: new () => T): void { Ecs.unbindCompToEntity(this, comp); }
    findComponents<T extends Icomponent>(comp: new () => T): T[] {
        let arr: T[] = [];
        this.traverse((node) => {
            let component = node.getComponent(comp);
            if (component != null) {
                arr.push(component);
            }
        });
        return arr;
    }

    clone(): Entity {
        // TODO
        return Entity.cloneFrom(this);
    }

    dispose() {
        this._parent.removeChild(this);
        this.traverse((item) => { Ecs.removeEntity(item) })
    }

    private static cloneFrom(from: Entity) {
        let newIns = Entity.create();
        newIns.name = from.name;
        newIns["_selfBeActive"] = from["_selfBeActive"];
        newIns['_parentsBeActive'] = from['_parentsBeActive'];

        newIns.localPosition = from.localPosition;
        newIns.localScale = from.localScale;
        newIns.localRotation = from.localRotation;

        Object.values(from[COMPS]).forEach((item) => {
            let newComp = item.clone();
            newIns.addComponentIns(newComp);
        });
        if (from._children.length > 0) {
            from._children.forEach(item => {
                newIns.addChild(Entity.cloneFrom(item));
            });
        }
        return newIns;
    }
}