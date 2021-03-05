import { EventEmitter } from "@mtgoo/ctool";
import { UnitedBitKey } from "./bitKey";
import { ENTITIES, IComponent, IEntity, ISystem, UNIT_BIT_KEY_DIC } from "./iecs";
import { Entity } from "./entity";

export abstract class System extends EventEmitter<IsystemEvents> implements ISystem {
    constructor() {
        super();
        this.onCreate();
        this.emit("onCreate");
    }
    /**
     * 在 addSystem 的时候进行初始化
     */
    [UNIT_BIT_KEY_DIC]: { [queryKey: string]: UnitedBitKey; };
    [ENTITIES]: { [queryKey: string]: Entity[]; };

    abstract caries: { [queryKey: string]: (new () => IComponent)[]; }
    get queries() { return this[ENTITIES] }

    onCreate(): void { }

    addEntity(queryKey: string, entity: Entity): void {
        let results = this[ENTITIES][queryKey];
        if (!results.includes(entity)) {
            results.push(entity);
            this.emit("addEntity", { queryKey, entity })
        }
    }

    removeEntity(entity: Entity): void {
        let results: IEntity[], index: number
        for (const key in this[ENTITIES]) {
            results = this[ENTITIES][key];
            index = results.indexOf(entity);
            if (index >= 0) {
                results.splice(index, 1);
                this.emit("removeEntity", { queryKey: key, entity });
            }
        }
    }

    removeQueriedEntity(queryKey: string, entity: Entity) {
        let results = this[ENTITIES][queryKey];
        let index = results.indexOf(entity);
        if (index >= 0) {
            results.splice(index, 1);
            this.emit("removeEntity", { queryKey, entity });
        }
    }

    update(deltaTime: number): void { }
}

interface IsystemEvents {
    onCreate: void;
    addEntity: { queryKey: string, entity: Entity }
    removeEntity: { queryKey: string, entity: Entity }
}