import { BitKey, UnitedBitKey } from "./bitKey";
import { ISystem, IComponent, COMPS, UNIT_BIT_KEY, UPDATE, UNIT_BIT_KEY_DIC, ENTITIES, IEntity } from "./iecs";

export class ECS {
    private static registeredComps: { [name: string]: { Ctr: new () => any; bitKey: BitKey; relatedSystem: { system: ISystem, query: string }[]; }; } = {};
    static systems: { system: ISystem; priority: number; }[] = [];
    static entities = new Map<string, IEntity>();
    static comps = new Set<IComponent>();

    static addEntity(entity: IEntity) {
        if (!this.containEntity(entity)) {
            this.entities.set(entity.id, entity);
        }
    }

    static containEntity(entity: IEntity) { return this.entities.has(entity.id); }
    static findEntityById(id: string) { return this.entities.get(id); }
    static removeEntity(entity: IEntity) {
        this.entities.delete(entity.id);
        this.systems.forEach(item => item.system.removeEntity(entity));
    }

    static registerComp = (comp: Function) => {
        const compName = comp.name;
        if (ECS.registeredComps[compName] == null) {
            ECS.registeredComps[compName] = { Ctr: comp as any, bitKey: BitKey.create(), relatedSystem: [] };
        } else {
            throw new Error("重复注册组件: " + compName);
        }
    };

    static createComp<T extends IComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const compInfo = this.registeredComps[comp.name];
        if (compInfo == null) return;
        const newComp = new compInfo.Ctr();
        this.comps.add(newComp);
        if (properties) {
            Object.keys(properties).forEach(item => newComp[item] = (properties as any)[item]);
        }
        return newComp;
    }

    static bindCompToEntity(entity: IEntity, comp: IComponent) {
        const compInfo = this.registeredComps[comp.compName];
        if (compInfo == null) return;
        Object.defineProperty(comp, "entity", {
            value: entity
        });
        entity[COMPS][comp.compName] = comp;
        entity[UNIT_BIT_KEY].addBitKey(compInfo.bitKey);

        if (this.containEntity(entity)) {
            const relatedSystem = compInfo.relatedSystem;
            relatedSystem.forEach(({ system, query }) => {
                if (entity[UNIT_BIT_KEY].contain(system[UNIT_BIT_KEY_DIC][query])) {
                    system.addEntity(query, entity);
                }
            });
        }
    }

    static unbindCompToEntity<T extends IComponent>(entity: IEntity, comp: new () => T) {
        const component = entity[COMPS][comp.name];
        if (component != null) {
            const compInfo = this.registeredComps[comp.name];
            entity[UNIT_BIT_KEY].removeBitKey(compInfo.bitKey);

            if (this.containEntity(entity)) {
                const relatedSystem = compInfo.relatedSystem;
                relatedSystem.forEach(item => {
                    item.system.removeQueriedEntity(item.query, entity);
                });
            }
        }
        delete entity[COMPS][comp.name];
    }

    static addSystem(system: ISystem, priority?: number) {
        const { caries } = system;
        system[UNIT_BIT_KEY_DIC] = {};
        system[ENTITIES] = {};
        for (const query in caries) {
            const unit_keys = new UnitedBitKey();
            caries[query].forEach(item => {
                const info = this.registeredComps[item.name];
                info.relatedSystem.push({ system, query });
                unit_keys.addBitKey(info.bitKey);
            });
            system[UNIT_BIT_KEY_DIC][query] = unit_keys;
            system[ENTITIES][query] = [];
        }
        this.systems.push({ system, priority: priority ?? this.systems.length });
        this.systems.sort((a, b) => a.priority - b.priority);
    }

    static removeSystem(system: ISystem) {
        const targetIndex = this.systems.findIndex((item) => item.system = system);
        if (targetIndex != -1) {
            this.systems.splice(targetIndex - 1, 1);
        }

        for (const key in this.registeredComps) {
            this.registeredComps[key].relatedSystem = this.registeredComps[key].relatedSystem.filter(item => item.system != system);
        }
    }

    /**
     * 单位秒
     * @param deltaTime 
     */
    static update(deltaTime: number) {
        this.entities.forEach(item => {
            for (const key in item[COMPS]) {
                item[COMPS][key][UPDATE]();
            }
        });
        this.systems.forEach(item => item.system.update(deltaTime));
    }
}
