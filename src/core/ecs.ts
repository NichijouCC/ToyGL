// 每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
// 通过UniteBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;
// enity addcomponent时候将检查 相关system是否要管理此组件,关心的话就add到system中,这样就避免system的query过程.

import { UniteBitkey, Bitkey } from "./bitkey";
export const UPADTE = Symbol("update");
export const UNITBITKEY = Symbol("uniteBitkey");
export const COMPS = Symbol("comps");


export interface Icomponent {
    readonly entity: Ientity;
    readonly compName: string;
    [UPADTE](): void;
    clone(): Icomponent;
}

export interface Ientity {
    [COMPS]: { [compName: string]: Icomponent };
    [UNITBITKEY]: UniteBitkey;
    addComponent<T extends Icomponent, P extends object = any>(comp: new () => T, properties?: P): T;
    getComponent<T extends Icomponent>(comp: new () => T): T;
    removeComponent<T extends Icomponent>(comp: new () => T): void;
}
export interface Isystem {
    readonly careComps: string[];
    readonly uniteBitkey: UniteBitkey;
    // entities: Ientity[];
    addEntity(entity: Ientity): void;
    removeEntity(entity: Ientity): void;
    update(deltaTime: number): void;
    [UPADTE](deltaTime: number): void;
}

export class Ecs {
    private static registedcomps: { [name: string]: { ctr: new () => any, bitKey: Bitkey, relatedSystem: Isystem[] } } = {};
    static systems: { system: Isystem, priority: number }[] = [];
    static entitys = new WeakSet<Ientity>();
    static comps = new WeakSet<Icomponent>();

    static addEntity(entity: Ientity) {
        this.entitys.add(entity);
        return entity;
    }

    static registeComp = (comp: Function) => {
        const compName = comp.name;
        if (Ecs.registedcomps[compName] == null) {
            Ecs.registedcomps[compName] = { ctr: comp as any, bitKey: Bitkey.create(), relatedSystem: [] };
        } else {
            throw new Error("重复注册组件: " + compName);
        }
    }

    static createComp<T extends Icomponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const compInfo = this.registedcomps[comp.name];
        if (compInfo == null) return;
        const newcomp = new compInfo.ctr();
        this.comps.add(newcomp);
        if (properties) {
            Object.keys(properties).forEach(item => newcomp[item] = (properties as any)[item])
        }
        return newcomp;
    }

    static bindComp(entity: Ientity, comp: Icomponent) {
        const compInfo = this.registedcomps[comp.compName];
        if (compInfo == null) return;
        Object.defineProperty(comp, "entity", {
            value: entity
        });
        entity[COMPS][comp.compName] = comp;
        entity[UNITBITKEY].addBitKey(compInfo.bitKey);

        const relatedSystem = compInfo.relatedSystem;
        relatedSystem.forEach(item => {
            if (entity[UNITBITKEY].containe(item.uniteBitkey)) {
                item.addEntity(entity);
            }
        });
    }

    static unbindComp<T extends Icomponent>(entity: Ientity, comp: new () => T) {
        const component = entity[COMPS][comp.name];
        if (component != null) {
            const compInfo = this.registedcomps[comp.name];
            if (compInfo != null) {
                const relatedSystem = compInfo.relatedSystem;
                relatedSystem.forEach(item => {
                    item.removeEntity(entity);
                });
            }
        }
    }


    static addSystem(system: Isystem, priority?: number) {
        this.systems.push({ system, priority: priority ?? this.systems.length });
        system.careComps.forEach(item => {
            const info = this.registedcomps[item];
            system.uniteBitkey.addBitKey(info.bitKey);
            info.relatedSystem.push(system);
        });

        this.systems.sort((a, b) => a.priority - b.priority);
    }

    static removeSystem(system: Isystem) {
        let targetIndex = this.systems.findIndex((item) => item.system = system);
        if (targetIndex != -1) {
            this.systems.splice(targetIndex - 1, 1);
        }
    }

    static update(deltaTime: number) {
        this.systems.forEach(item => item.system[UPADTE](deltaTime));
    }
}