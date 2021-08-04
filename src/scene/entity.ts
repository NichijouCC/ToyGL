import { COMPS, IComponent } from "../core/ecs/iecs";
import { ECS } from "../core/ecs/ecs";
import { Transform } from "./transform";
import { EventTarget } from "@mtgoo/ctool";
import { AbsComponent, AbsSystem } from "../core/ecs";

export class Entity extends Transform {
    name: string;
    constructor(properties?: Partial<Entity>) {
        super();
        if (properties) {
            Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item]);
        }
        ECS.addEntity(this);
    }

    clone(): Entity {
        // TODO
        return Entity.cloneFrom(this);
    }

    dispose() {
        this._parent.removeChild(this);
        this.traverse((item) => { ECS.removeEntity(item); });
    }

    findComponents<T extends IComponent>(comp: new () => T): T[] {
        const arr: T[] = [];
        this.traverse((node) => {
            const component = node.getComponent(comp);
            if (component != null) {
                arr.push(component);
            }
        });
        return arr;
    }

    static onDirty = new EventTarget<Entity>();
    private static cloneFrom(from: Entity) {
        const newIns = new Entity();
        newIns.name = from.name;
        newIns._selfBeActive = from._selfBeActive;
        newIns._parentsBeActive = from._parentsBeActive;

        newIns.localPosition = from.localPosition;
        newIns.localScale = from.localScale;
        newIns.localRotation = from.localRotation;

        Object.values(from[COMPS]).forEach((item) => {
            const newComp = item.clone();
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

export abstract class Component extends AbsComponent<Entity> { }
export abstract class System extends AbsSystem<Entity> { }
