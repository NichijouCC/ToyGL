import { Icomponent, Ecs, Ientity, UniteBitkey } from "./ecs";
import { Transform } from "./transform";

export class Entity extends Transform implements Ientity {
    name: string;
    beActive: boolean = true;
    constructor(name?: string) {
        super();
        this.name = name;
    }

    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent<T extends Icomponent>(comp: string): T {
        const newComp = Ecs.addComp(this, comp);
        return newComp as T;
    }

    getComponent(comp: string) { return (this as any)[comp]; }
    removeComponent(comp: string): void {
        Ecs.removeComp(this, comp);
    }

    traverse(handler: (e: Entity) => void | boolean, includeSelf: boolean = true) {
        let _continue;
        if (includeSelf) {
            _continue = handler(this);
        }
        if (_continue !== false) {
            let child;
            for (let i = 0; i < this.children.length; i++) {
                child = this.children[i] as Entity;
                child.traverse(handler, true);
            }
        }
    }

    find(check: (e: Entity) => boolean) {
        if (check(this)) return this;
        let child: Entity, result: Entity;
        for (let i = 0; i < this.children.length; i++) {
            child = this.children[i] as Entity;
            result = child.find(check);
            if (result) break;
        }
        return result;
    }

    findInParents(check: (e: Entity) => boolean) {
        if (check(this)) {
            return this;
        } else {
            let result: Entity;
            if (this.parent) {
                result = (this.parent as Entity).findInParents(check) as Entity;
            }
            return result;
        }
    }

    clone(): Entity {
        // TODO
        return new Entity();
    }
}
