import { COMPS, IComponent, IEntity } from "../core/ecs/iecs";
import { ECS } from "../core/ecs/ecs";
import { Transform } from "./transform";
import { AbsComponent, AbsSystem } from "../core/ecs";
import { LayerMask } from "../render/camera";
import { World } from "./world";

export class Entity extends Transform implements IEntity {
    name: string;
    layer: LayerMask = LayerMask.default;
    constructor(ecs: ECS, properties?: Partial<Entity>) {
        super(ecs);
        if (properties) {
            Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item]);
        }
    }

    clone(): Entity {
        // TODO
        return Entity.cloneFrom(this);
    }

    dispose() {
        this._parent.removeChild(this);
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

    private static cloneFrom(from: Entity) {
        const newIns = new Entity(from.ecs);
        newIns.name = from.name;
        newIns._selfBeActive = from._selfBeActive;
        newIns._parentsBeActive = from._parentsBeActive;

        newIns.localPosition = from.localPosition;
        newIns.localScale = from.localScale;
        newIns.localRotation = from.localRotation;

        Object.values(from[COMPS]).forEach((item) => {
            const newComp = item.clone();
            newIns.addComponentDirect(newComp);
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