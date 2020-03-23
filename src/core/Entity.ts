import { Icomponent, Ecs, Ientity, UniteBitkey } from "./Ecs";
import { Transform } from "./Transform";
import { EventHandler } from "./Event";
import { RefData } from "./RefData";

namespace Private {
    export let id = 0;
}

export class Entity extends Transform implements Ientity {
    name: string;
    ref_beActive = new RefData<boolean>(true);
    get beActive() { return this.ref_beActive.data };
    set beActive(value: boolean) {
        this.ref_beActive.data = value;
    }
    readonly id: number;
    constructor(name?: string) {
        super();
        this.name = name;
        this.id = Private.id++;
    }
    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent(comp: string): Icomponent {
        let newComp = Ecs.addComp(this, comp);
        return newComp;
    }
    getComponent(comp: string) { return (this as any)[comp] }
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
        let child;
        for (let i = 0; i < this.children.length; i++) {
            child = this.children[i] as Entity;
            child.find(check);
        }
        return null;
    }

    clone(): Entity {
        //TODO
        return new Entity();
    }
}
