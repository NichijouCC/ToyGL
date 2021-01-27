import { Icomponent, Ecs, Ientity } from "./ecs";
import { UniteBitkey } from "./bitkey";
import { Transform } from "./transform";
import { AbsComponent, ComponentCtor } from "./absComponent";

export class Entity extends Transform implements Ientity {
    name: string;
    beActive: boolean = true;
    constructor(properties?: Partial<Entity>) {
        super();
        if (properties) {
            Object.keys(properties).forEach(item => (this as any)[item] = (properties as any)[item])
        }
    }
    /**
     * @private
     */
    _components: { [compName: string]: AbsComponent } = {};
    /**
     * @private
     */
    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent<T extends AbsComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const newComp = Ecs.addComp(this, comp, properties);
        return newComp;
    }

    getComponent<T extends AbsComponent>(comp: new () => T) { return (this as any)[comp.name]; }
    removeComponent<T extends AbsComponent>(comp: new () => T): void {
        Ecs.removeComp(this, comp);
    }

    traverse(handler: (e: Entity) => void | boolean, includeSelf: boolean = true) {
        let _find;
        if (includeSelf) {
            _find = handler(this);
        }
        if (_find !== true) {
            let child;
            for (let i = 0; i < this.children.length; i++) {
                child = this.children[i] as Entity;
                child.traverse(handler, true);
            }
        }
    }

    find(check: (e: Entity) => void | boolean): Entity | null {
        let queue: Entity[] = [this];
        while (queue.length != 0) {
            let first = queue.shift();
            if (check(first)) return first;
            for (let i = 0; i < first.children.length; i++) {
                queue.push(first.children[i] as Entity);
            }
        }
        return null;
    }

    findInParents(check: (e: Entity) => void | boolean): Entity | null {
        if (check(this)) return this;
        if (this.parent) {
            return (this.parent as Entity).findInParents(check);
        }
        return null;
    }

    clone(): Entity {
        // TODO
        return new Entity();
    }
}
