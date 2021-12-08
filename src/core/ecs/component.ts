import { IComponent, IEntity, UPDATE } from "./iecs";

export abstract class AbsComponent<T extends IEntity> implements IComponent {
    readonly entity: T;
    protected _beInit: boolean = false;
    get compName() { return this.constructor.name; }
    get compType() { return this.constructor; }

    /**
     * private
     */
    [UPDATE](deltaTime: number) {
        if (!this._beInit) {
            this._beInit = true;
            this.init();
        }
        this.update(deltaTime);
    }

    init() { }
    update(deltaTime: number) { }

    abstract clone(): IComponent

    static compName() {
        return this.prototype.constructor.name;
    }
}
