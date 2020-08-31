import { Icomponent, Ecs, Ientity, UniteBitkey } from "./ecs";
import { Transform } from "./transform";
import { EventTarget } from "./eventTarget";
import { RefData } from "./refData";

export class Entity extends Transform implements Ientity {
    static IdCount = 0;
    name: string;
    ref_beActive = new RefData<boolean>(true);
    get beActive() { return this.ref_beActive.current; };
    set beActive(value: boolean) {
        this.ref_beActive.current = value;
    }

    readonly id: number;
    constructor(name?: string) {
        super();
        this.name = name;
        this.id = Entity.IdCount++;
    }

    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent(comp: string): Icomponent {
        const newComp = Ecs.addComp(this, comp);
        return newComp;
    }

    getComponent(comp: string) { return (this as any)[comp]; }
    removeComponent(comp: string): void {
        Ecs.removeComp(this, comp);
    }

    traverse(handler: (e: Entity) => boolean, includeSelf: boolean = true) {
        let _continue = true;
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
