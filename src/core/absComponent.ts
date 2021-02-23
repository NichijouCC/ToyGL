import { Ecs, Icomponent, Ientity, UPDATE } from "./ecs";
import { Entity } from "./entity";

const key = "__storedProperty";
export function ComponentProperty<T>(target: Function, name: string) {
    let proto = target.prototype;
    if (proto[key] == null) proto[key] = {};
    if (proto[key][name] == null) proto[key][name] = true;
}

function setComponentProperty(target: AbsComponent, value: object) {
    let storedProperties = target.constructor.prototype[key];
    if (storedProperties != null) {
        Object.keys(storedProperties).forEach(property => {
            if (value.hasOwnProperty(property)) {
                (target as any)[property] = (value as any)[property]
            }
        })
    }
}

export abstract class AbsComponent implements Icomponent {
    readonly entity: Entity;
    beInit: boolean = false;
    constructor(props?: Partial<typeof AbsComponent>) {
        if (props) {
            setComponentProperty(this, props);
        }
    }
    static compName() {
        return this.prototype.constructor.name;
    }
    get compName() { return this.constructor.name; }
    get compType() { return this.constructor; }

    onInit() { }
    /**
     * private
     */
    [UPDATE]() {
        if (!this.beInit) {
            this.beInit = true;
            this.onInit();
        }
        this.update();
    }
    update() { }

    abstract clone(): Icomponent

    static create<K extends AbsComponent>(this: new () => K, properties?: Partial<K>): K {
        return Ecs.createComp(this, properties);
    }
}
