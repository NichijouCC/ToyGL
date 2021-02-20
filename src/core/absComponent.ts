import { Ecs, Icomponent, Ientity, UPADTE } from "./ecs";
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

export abstract class AbsComponent implements Icomponent {
    readonly entity: Entity;
    beInit: boolean = false;
    constructor(props?: Partial<typeof AbsComponent>) {
        if (props) {
            setComponetProperty(this, props);
        }
    }
    static compName() {
        return this.prototype.constructor.name;
    }
    get compName() { return this.constructor.name; }
    get compType() { return this.constructor; }

    init() { }
    /**
     * private
     */
    [UPADTE]() {
        if (!this.beInit) {
            this.beInit = true;
            this.init();
        }
        this.update();
    }
    update() { }

    abstract clone(): Icomponent

    static create<K extends AbsComponent>(this: new () => K, properties?: Partial<K>): K {
        return Ecs.createComp(this, properties);
    }
}
