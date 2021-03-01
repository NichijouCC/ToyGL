import { Bitkey, UnitedBitkey } from "./bitkey";
import { Entity } from "./entity";
import { Isystem, Ientity, Icomponent, COMPS, UNIT_BIT_KEY, UPDATE, UNIT_BIT_KEY_DIC, ENTITIES } from "./iecs";

export class Ecs {
    private static registeredComps: { [name: string]: { ctr: new () => any; bitKey: Bitkey; relatedSystem: { system: Isystem, query: string }[]; }; } = {};
    static systems: { system: Isystem; priority: number; }[] = [];
    static entities = new Set<Ientity>();
    static comps = new Set<Icomponent>();

    static createEntity(properties?: Partial<Entity>) {
        let ins = new (Entity as any)();
        if (properties) {
            Object.keys(properties).forEach(item => (ins as any)[item] = (properties as any)[item])
        }
        this.entities.add(ins);
        return ins as Entity;
    }

    static removeEntity(entity: Ientity) {
        this.entities.delete(entity);
        this.systems.forEach(item => item.system.removeEntity(entity));
    }

    static registerComp = (comp: Function) => {
        const compName = comp.name;
        if (Ecs.registeredComps[compName] == null) {
            Ecs.registeredComps[compName] = { ctr: comp as any, bitKey: Bitkey.create(), relatedSystem: [] };
        } else {
            throw new Error("重复注册组件: " + compName);
        }
    };

    static createComp<T extends Icomponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const compInfo = this.registeredComps[comp.name];
        if (compInfo == null) return;
        const newComp = new compInfo.ctr();
        this.comps.add(newComp);
        if (properties) {
            Object.keys(properties).forEach(item => newComp[item] = (properties as any)[item]);
        }
        return newComp;
    }

    static bindCompToEntity(entity: Ientity, comp: Icomponent) {
        const compInfo = this.registeredComps[comp.compName];
        if (compInfo == null) return;
        Object.defineProperty(comp, "entity", {
            value: entity
        });
        entity[COMPS][comp.compName] = comp;
        entity[UNIT_BIT_KEY].addBitKey(compInfo.bitKey);

        const relatedSystem = compInfo.relatedSystem;
        relatedSystem.forEach(({ system, query }) => {
            if (entity[UNIT_BIT_KEY].contain(system[UNIT_BIT_KEY_DIC][query])) {
                system.addEntity(query, entity);
            }
        });
    }

    static unbindCompToEntity<T extends Icomponent>(entity: Ientity, comp: new () => T) {
        const component = entity[COMPS][comp.name];
        if (component != null) {
            const compInfo = this.registeredComps[comp.name];
            entity[UNIT_BIT_KEY].removeBitKey(compInfo.bitKey);
            const relatedSystem = compInfo.relatedSystem;
            relatedSystem.forEach(item => {
                item.system.removeQueriedEntity(item.query, entity);
            });
        }
        delete entity[COMPS][comp.name];
    }

    static addSystem(system: Isystem, priority?: number) {
        let { caries } = system;
        system[UNIT_BIT_KEY_DIC] = {};
        system[ENTITIES] = {};
        for (let query in caries) {
            let unit_keys = new UnitedBitkey();
            caries[query].forEach(item => {
                const info = this.registeredComps[item.name];
                info.relatedSystem.push({ system, query });
                unit_keys.addBitKey(info.bitKey);
            })
            system[UNIT_BIT_KEY_DIC][query] = unit_keys;
            system[ENTITIES][query] = [];
        }
        this.systems.push({ system, priority: priority ?? this.systems.length });
        this.systems.sort((a, b) => a.priority - b.priority);
    }
    static removeSystem(system: Isystem) {
        let targetIndex = this.systems.findIndex((item) => item.system = system);
        if (targetIndex != -1) {
            this.systems.splice(targetIndex - 1, 1);
        }

        for (let key in this.registeredComps) {
            this.registeredComps[key].relatedSystem = this.registeredComps[key].relatedSystem.filter(item => item.system != system);
        }
    }

    static update(deltaTime: number) {
        this.entities.forEach(item => {
            for (let key in item[COMPS]) {
                item[COMPS][key][UPDATE]();
            }
        })
        this.systems.forEach(item => item.system.update(deltaTime));
    }
}
