import { COMPS, Icomponent, Ientity, UNIT_BIT_KEY } from "./iecs";
import { Ecs } from "./ecs";
import { UniteBitkey } from "../bitkey";
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
    [UNIT_BIT_KEY]: UniteBitkey = new UniteBitkey();
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
    getComponentByName<T extends Icomponent = any>(comp: string): T { return this[COMPS][comp] as T; }
    removeComponent<T extends Icomponent>(comp: new () => T): void { Ecs.unbindComp(this, comp); }

    traverse(handler: (e: Entity) => void | boolean, includeSelf: boolean = true): void {//先序遍历
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

    find(check: (e: Entity) => void | boolean): Entity | null {//层序遍历
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