import { abort } from "process";
import { Icomponent, Ientity } from "./ecs";
import { Entity } from "./entity";

const key = "__storedProperty";
export function ComponetProperty<T>(target: Function, name: string) {
    let proto = target.prototype;
    if (proto[key] == null) proto[key] = {};
    if (proto[key][name] == null) proto[key][name] = true;
}

function setComponetProperty(target: AbsComponent, value: object) {
    let storedProperties = target.constructor.prototype[key];
    if (storedProperties != null) {
        Object.keys(storedProperties).forEach(property => {
            if (value.hasOwnProperty(property)) {
                (target as any)[property] = (value as any)[property]
            }
        })
    }
}


export abstract class AbsComponent<T extends object = any> implements Icomponent {
    readonly entity: Entity;
    readonly beInit: boolean = false;
    constructor(props?: T) {
        if (props) {
            setComponetProperty(this, props);
        }
    }
    getName() {
        return this.constructor.name;
    }
    init() { }
    /**
     * private
     */
    _update() {
        if (!this.beInit) this.init();
        this.update();
    }
    update() { }

    static getName() {
        return this.prototype.constructor.name;
    }
}

export interface ComponentCtor<T extends object = {}> {
    new(props: T): AbsComponent<T>;
}