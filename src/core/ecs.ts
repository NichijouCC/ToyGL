// 每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
// 通过UniteBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;
// enity addcomponent时候将检查 相关system是否要管理此组件,关心的话就add到system中,这样就避免system的query过程.

import { UniteBitkey, Bitkey } from "./bitkey";
import { AbsComponent, ComponentCtor } from "./absComponent";

export interface Icomponent {
    entity: Ientity;
}

export interface Ientity {
    _components: { [compName: string]: AbsComponent };
    _uniteBitkey: UniteBitkey;
    addComponent<T extends AbsComponent, P extends object = any>(comp: new () => T, properties?: P): T;
    getComponent<T extends AbsComponent>(comp: new () => T): T;
    removeComponent<T extends AbsComponent>(comp: new () => T): void;
}
export interface Isystem {
    readonly careComps: string[];
    readonly uniteBitkey: UniteBitkey;
    // entities: Ientity[];
    addEntity(entity: Ientity): void;
    removeEntity(entity: Ientity): void;
    update(deltaTime: number): void;
    /**
     * 
     * @param deltaTime 
     */
    _update(deltaTime: number): void;
}

export class Ecs {
    private static registedcomps: { [name: string]: { ctr: any, bitKey: Bitkey, relatedSystem: Isystem[] } } = {};

    static addEntity() {

    }

    static registeComp = (comp: Function) => {
        const compName = comp.name;
        if (Ecs.registedcomps[compName] == null) {
            Ecs.registedcomps[compName] = { ctr: comp.constructor, bitKey: Bitkey.create(), relatedSystem: [] };
        } else {
            throw new Error("重复注册组件: " + compName);
        }
    }

    static addComp<T extends AbsComponent, P extends object>(entity: Ientity, comp: new () => T, properties?: P): T {
        const compInfo = this.registedcomps[comp.name];
        if (compInfo == null) return;

        // eslint-disable-next-line new-cap
        const newcomp = new comp();
        Object.defineProperty(newcomp, "entity", {
            value: entity
        });
        (entity as any)[comp.name] = newcomp;
        entity._uniteBitkey.addBitKey(compInfo.bitKey);

        const relatedSystem = compInfo.relatedSystem;
        relatedSystem.forEach(item => {
            if (entity._uniteBitkey.containe(item.uniteBitkey)) {
                item.addEntity(entity);
            }
        });
        return newcomp;
    }

    static removeComp<T extends AbsComponent>(entity: Ientity, comp: new () => T) {
        const component = entity._components[comp.name];
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

    private static systems: { system: Isystem, priority: number }[] = [];
    static addSystem(system: Isystem, priority?: number) {
        this.systems.push({ system, priority: priority ?? this.systems.length });
        system.careComps.forEach(item => {
            const info = this.registedcomps[item];
            system.uniteBitkey.addBitKey(info.bitKey);
            info.relatedSystem.push(system);
        });

        this.systems.sort((a, b) => a.priority - b.priority);
    }

    static update(deltaTime: number) {
        this.systems.forEach(item => item.system._update(deltaTime));
    }
}