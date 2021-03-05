import { IComponent, IEntity, UPDATE } from "./iecs";
import { Ecs } from "./ecs";
import { Entity } from "./entity";

const key = "__storedProperty";
export function ComponentProperty<T>(target: Function, name: string) {
    let proto = target.prototype;
    if (proto[key] == null) proto[key] = {};
    if (proto[key][name] == null) proto[key][name] = true;
}

function setComponentProperty(target: Component, value: object) {
    let storedProperties = target.constructor.prototype[key];
    if (storedProperties != null) {
        Object.keys(storedProperties).forEach(property => {
            if (value.hasOwnProperty(property)) {
                (target as any)[property] = (value as any)[property]
            }
        })
    }
}

export abstract class Component implements IComponent {
    readonly entity: Entity;
    protected _beInit: boolean = false;
    get compName() { return this.constructor.name; }
    get compType() { return this.constructor; }

    constructor(props?: Partial<typeof Component>) {
        if (props) {
            setComponentProperty(this, props);
        }
    }

    /**
     * private
     */
    [UPDATE]() {
        if (!this._beInit) {
            this._beInit = true;
            this.onInit();
        }
        this.update();
    }

    onInit() { }
    update() { }

    abstract clone(): IComponent

    static compName() {
        return this.prototype.constructor.name;
    }
    static create<K extends Component>(this: new () => K, properties?: Partial<K>): K {
        return Ecs.createComp(this, properties);
    }
}
