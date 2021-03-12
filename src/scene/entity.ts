import { COMPS, IComponent } from "../core/ecs/iecs";
import { ECS } from "../core/ecs/ecs";
import { Transform } from "./transform";
import { EventTarget } from "@mtgoo/ctool";
import { AbsComponent, AbsSystem, Entity as BaseEntity } from '../core/ecs';
import { applyMixins, copyProperties } from "../core/util";

// export class Entity extends Transform implements IEntity {
//     name: string;
//     constructor(properties?: Partial<Entity>) {
//         super();
//         if (properties) {
//             Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item])
//         }
//         Ecs.addEntity(this);
//     }
//     static onDirty = new EventTarget<Entity>();
//     [COMPS]: { [compName: string]: IComponent } = {};
//     [UNIT_BIT_KEY]: UnitedBitKey = new UnitedBitKey();
//     addComponent<T extends IComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
//         const newComp = Ecs.createComp(comp, properties);
//         if (newComp) Ecs.bindCompToEntity(this, newComp);
//         return newComp;
//     }

//     addComponentIns<T extends IComponent>(comp: T) {
//         if (comp) Ecs.bindCompToEntity(this, comp);
//         return comp;
//     }

//     getComponent<T extends IComponent>(comp: new () => T): T { return this[COMPS][comp.name] as T; }
//     getComponentByName<T extends IComponent = any>(comp: string): T { return this[COMPS][comp] as T; }
//     removeComponent<T extends IComponent>(comp: new () => T): void { Ecs.unbindCompToEntity(this, comp); }
//     findComponents<T extends IComponent>(comp: new () => T): T[] {
//         let arr: T[] = [];
//         this.traverse((node) => {
//             let component = node.getComponent(comp);
//             if (component != null) {
//                 arr.push(component);
//             }
//         });
//         return arr;
//     }

//     clone(): Entity {
//         // TODO
//         return Entity.cloneFrom(this);
//     }

//     dispose() {
//         this._parent.removeChild(this);
//         this.traverse((item) => { Ecs.removeEntity(item) })
//     }

//     private static cloneFrom(from: Entity) {
//         let newIns = new Entity();
//         newIns.name = from.name;
//         newIns["_selfBeActive"] = from["_selfBeActive"];
//         newIns['_parentsBeActive'] = from['_parentsBeActive'];

//         newIns.localPosition = from.localPosition;
//         newIns.localScale = from.localScale;
//         newIns.localRotation = from.localRotation;

//         Object.values(from[COMPS]).forEach((item) => {
//             let newComp = item.clone();
//             newIns.addComponentIns(newComp);
//         });
//         if (from._children.length > 0) {
//             from._children.forEach(item => {
//                 newIns.addChild(Entity.cloneFrom(item));
//             });
//         }
//         return newIns;
//     }
// }

export class Entity extends Transform {
    name: string;
    constructor(properties?: Partial<Entity>) {
        super();
        if (properties) {
            Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item])
        }
        BaseEntity.call(this);
        ECS.addEntity(this);

    }
    clone(): Entity {
        // TODO
        return Entity.cloneFrom(this);
    }

    dispose() {
        this._parent.removeChild(this);
        this.traverse((item) => { ECS.removeEntity(item) })
    }

    findComponents<T extends IComponent>(comp: new () => T): T[] {
        let arr: T[] = [];
        this.traverse((node) => {
            let component = node.getComponent(comp);
            if (component != null) {
                arr.push(component);
            }
        });
        return arr;
    }
    static onDirty = new EventTarget<Entity>();
    private static cloneFrom(from: Entity) {
        let newIns = new Entity();
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

export interface Entity extends BaseEntity, Transform { }
// applyMixins(Entity, [BaseEntity]);
copyProperties(Entity.prototype, BaseEntity.prototype);


export abstract class Component extends AbsComponent<Entity>{ }
export abstract class System extends AbsSystem<Entity>{ }

