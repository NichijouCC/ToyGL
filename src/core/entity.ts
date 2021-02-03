import { COMPS, Ecs, Icomponent, Ientity, UNITBITKEY } from "./ecs";
import { UniteBitkey } from "./bitkey";
import { Transform } from "./transform";
import { EventTarget } from "@mtgoo/ctool";

export class Entity extends Transform implements Ientity {
    name: string;
    private constructor(properties?: Partial<Entity>) {
        super();
        if (properties) {
            Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item])
        }
    }

    static create(properties?: Partial<Entity>) {
        let newEntity = new Entity(properties);
        Ecs.addEntity(newEntity);
        return newEntity;
    }
    static onDirty = new EventTarget<Entity>();
    [COMPS]: { [compName: string]: Icomponent } = {};
    [UNITBITKEY]: UniteBitkey = new UniteBitkey();
    addComponent<T extends Icomponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const newComp = Ecs.createComp(comp, properties);
        if (newComp) Ecs.bindComp(this, newComp);
        return newComp;
    }

    addComponentIns<T extends Icomponent>(comp: T) {
        if (comp) Ecs.bindComp(this, comp);
        return comp;
    }

    getComponent<T extends Icomponent>(comp: new () => T): T { return this[COMPS][comp.name] as T; }
    removeComponent<T extends Icomponent>(comp: new () => T): void { Ecs.unbindComp(this, comp); }

    traverse(handler: (e: Entity) => void | boolean, includeSelf: boolean = true): void {
        let _find;
        if (includeSelf) {
            _find = handler(this);
        }
        if (_find !== true) {
            let child;
            for (let i = 0; i < this._children.length; i++) {
                child = this._children[i];
                child.traverse(handler, true);
            }
        } else {
            return;
        }
    }

    find(check: (e: Entity) => void | boolean): Entity | null {
        let queue: Entity[] = [this];
        while (queue.length != 0) {
            let first = queue.shift();
            if (check(first)) return first;
            for (let i = 0; i < first._children.length; i++) {
                queue.push(first._children[i]);
            }
        }
        return null;
    }

    findInParents(check: (e: Entity) => void | boolean): Entity | null {
        if (check(this)) return this;
        if (this._parent) {
            return (this._parent).findInParents(check);
        }
        return null;
    }

    clone(): Entity {
        // TODO
        return Entity.clonefrom(this);
    }
    private static clonefrom(from: Entity) {
        let newIns = Entity.create();
        (newIns as any)["clonefrom"] = from.name;
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
                newIns.addChild(Entity.clonefrom(item));
            });
        }
        return newIns;
    }
}