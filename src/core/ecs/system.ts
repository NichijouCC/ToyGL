import { EventEmitter } from "@mtgoo/ctool";
import { UnitedBitKey } from "./bitKey";
import { ENTITIES, IComponent, IEntity, ISystem, UNIT_BIT_KEY_DIC, UPDATE } from "./iecs";

export abstract class AbsSystem<T extends IEntity> extends EventEmitter<ISystemEvents<T>> implements ISystem {
    private _beInit: boolean = false;
    constructor() {
        super();
        setTimeout(() => {
            this.init()
                .then(() => {
                    this._beInit = true;
                    this.emit("onInit");
                });
        })
    }
    async init() { }
    update(deltaTime: number): void { }
    [UPDATE](deltaTime: number): void {
        if (this._beInit == false) return;
        this.update(deltaTime);
    }
    /**
     * 在 addSystem 的时候进行初始化
     */
    [UNIT_BIT_KEY_DIC]: { [queryKey: string]: UnitedBitKey; };
    [ENTITIES]: { [queryKey: string]: T[]; };

    abstract caries: { [queryKey: string]: (new () => IComponent)[]; }
    get queries() { return this[ENTITIES]; }

    addEntity(queryKey: string, entity: T): void {
        const results = this[ENTITIES][queryKey];
        if (!results.includes(entity)) {
            results.push(entity);
            this.emit("addEntity", { queryKey, entity });
        }
    }

    removeEntity(entity: T): void {
        let results: T[], index: number;
        for (const key in this[ENTITIES]) {
            results = this[ENTITIES][key];
            index = results.indexOf(entity);
            if (index >= 0) {
                results.splice(index, 1);
                this.emit("removeEntity", { queryKey: key, entity });
            }
        }
    }

    removeQueriedEntity(queryKey: string, entity: T) {
        const results = this[ENTITIES][queryKey];
        const index = results.indexOf(entity);
        if (index >= 0) {
            results.splice(index, 1);
            this.emit("removeEntity", { queryKey, entity });
        }
    }

}

interface ISystemEvents<T extends IEntity> {
    onInit: void;
    addEntity: { queryKey: string, entity: T }
    removeEntity: { queryKey: string, entity: T }
}
