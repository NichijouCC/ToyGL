import { EventEmitter } from "@mtgoo/ctool";
import { Component } from "./component";
import { UniteBitkey } from "../bitkey";
import { COMPS_ARR, ENTITIES, Icomponent, Ientity, Isystem, UNIT_BIT_KEY_DIC, UPDATE } from "./iecs";
import { Entity } from "./entity";

export abstract class System<T extends object = any> extends EventEmitter<IsystemEvents> implements Isystem {
    constructor() {
        super();
        this.onEnable();
    }
    /**
     * 在 addSystem 的时候进行初始化
     */
    [UNIT_BIT_KEY_DIC]: { [query: string]: UniteBitkey; };
    [ENTITIES]: { [query: string]: { [id: string]: Ientity; }; };
    [COMPS_ARR]: { [query: string]: Icomponent[][]; };

    abstract caries: { [query: string]: (new () => Icomponent)[]; }
    get queries(): T { return this[COMPS_ARR] as any; }
    onEnable(): void { }

    addEntity(query: string, entity: Entity): void {
        if (!this[ENTITIES][query][entity.id]) {
            this[ENTITIES][query][entity.id] = entity;
            const comps = this.caries[query].map(comp => entity.getComponent(comp));
            this[COMPS_ARR][query].push(comps);
        }
    }

    removeEntity(entity: Entity): void {
        for (const key in this[ENTITIES]) {
            if (this[ENTITIES][key][entity.id] != null) {
                delete this[ENTITIES][key][entity.id];
            }
        }
        for (const key in this[COMPS_ARR]) {
            let compsArr = this[COMPS_ARR][key];
            let newArr = [];
            for (let i = 0; i < compsArr.length; i++) {
                if (compsArr[i][0]?.entity != entity) {
                    newArr.push(compsArr[i]);
                }
            };
            delete this[COMPS_ARR][key];
            this[COMPS_ARR][key] = newArr;
        }
    }
    update(deltaTime: number): void { }
}

interface IsystemEvents {
    onEnable: void;
    addEntity: { entity: Entity, comps: any[] }
    removeEntity: { entity: Entity, comps: any[] }
}