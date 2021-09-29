import { IComponent, IEntity, UPDATE } from "./iecs";
import { ECS } from "./ecs";

const key = "__storedProperty";
export function ComponentProperty(target: Function, name: string) {
    const proto = target.prototype;
    if (proto[key] == null) proto[key] = {};
    if (proto[key][name] == null) proto[key][name] = true;
}

function setComponentProperty(target: AbsComponent<any>, value: object) {
    const storedProperties = target.constructor.prototype[key];
    if (storedProperties != null) {
        Object.keys(storedProperties).forEach(property => {
            if (value.hasOwnProperty(property)) {
                (target as any)[property] = (value as any)[property];
            }
        });
    }
}

export abstract class AbsComponent<T extends IEntity> implements IComponent {
    readonly entity: T;
    protected _beInit: boolean = false;
    get compName() { return this.constructor.name; }
    get compType() { return this.constructor; }

    constructor(props?: Partial<typeof AbsComponent>) {
        if (props) {
            setComponentProperty(this, props);
        }
    }

    /**
     * private
     */
    [UPDATE](deltaTime: number) {
        if (!this._beInit) {
            this._beInit = true;
            this.init();
        }
        this.update();
    }

    init() { }
    update() { }

    abstract clone(): IComponent

    static compName() {
        return this.prototype.constructor.name;
    }

    static create<K extends AbsComponent<any>>(this: new () => K, properties?: Partial<K>): K {
        return ECS.createComp(this, properties);
    }
}
