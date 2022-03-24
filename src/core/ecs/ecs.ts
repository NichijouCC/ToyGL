import { Entity } from ".";
import { BitKey, UnitedBitKey } from "./bitKey";
import { ISystem, IComponent, COMPS, UNIT_BIT_KEY, UPDATE, UNIT_BIT_KEY_DIC, ENTITIES, IEntity } from "./iecs";

export class ECS {
    registeredComps: { [name: string]: { Ctr: new () => any; bitKey: BitKey; relatedSystem: { system: ISystem, query: string }[]; }; } = {};
    systems: { system: ISystem; priority: number; }[] = [];

    entities: { [id: string]: IEntity } = {};
    addEntity(entity: IEntity) {
        if (this.entities[entity.id] != null) {
            return;
        }
        this.entities[entity.id] = entity;
        for (let key in entity[COMPS]) {
            let comp = entity[COMPS][key];
            this.systemAddEntityByComp(comp);
        }
    }

    createEntity() {
        let entity = new Entity(this);
        this.entities[entity.id] = entity;
        return entity;
    }

    removeEntity(entity: IEntity) {
        if (entity == null) return;
        delete this.entities[entity.id];
        entity.removeAllListeners();
        this.systems.forEach(item => item.system.removeEntity(entity))
    }

    registComp = (comp: Function) => {
        const compName = comp.name;
        if (this.registeredComps[compName] == null) {
            this.registeredComps[compName] = { Ctr: comp as any, bitKey: BitKey.create(), relatedSystem: [] };
        } else {
            console.warn(`组件${compName}已注册`);
        }
    };

    createComp<T extends IComponent, P extends Partial<T>>(comp: new () => T, properties?: P): T {
        const compInfo = this.registeredComps[comp.name];
        if (compInfo == null) return;
        const newComp = new compInfo.Ctr();
        if (properties) {
            Object.keys(properties).forEach(item => newComp[item] = (properties as any)[item]);
        }
        return newComp;
    }

    addCompToEntity(entity: IEntity, comp: IComponent) {
        const compInfo = this.registeredComps[comp.compName];
        if (compInfo == null) return;
        Object.defineProperty(comp, "entity", {
            value: entity
        });
        entity[COMPS][comp.compName] = comp;
        entity[UNIT_BIT_KEY].addBitKey(compInfo.bitKey);
        entity.emit("AddComp", comp);
        this.systemAddEntityByComp(comp);
    }

    removeCompFromEntity<T extends IComponent>(entity: IEntity, comp: new () => T) {
        const component = entity[COMPS][comp.name];
        if (component != null) {
            const compInfo = this.registeredComps[comp.name];
            entity[UNIT_BIT_KEY].removeBitKey(compInfo.bitKey);
            delete entity[COMPS][comp.name];
            entity.emit("removeComp", component);
            this.systemRemoveEntityByComp(component);
        }
    }

    addSystem(system: ISystem, priority?: number) {
        const { caries } = system;
        this.systems.push({ system, priority: priority ?? this.systems.length });
        this.systems.sort((a, b) => a.priority - b.priority);

        for (let key in system.caries) {
            let comps = system.caries[key];
            comps.forEach(comp => {
                this.registComp(comp);
            })
        }

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
    }

    removeSystem(system: ISystem) {
        const targetIndex = this.systems.findIndex((item) => item.system = system);
        if (targetIndex != -1) {
            this.systems.splice(targetIndex, 1);

            for (const key in this.registeredComps) {
                this.registeredComps[key].relatedSystem = this.registeredComps[key].relatedSystem.filter(item => item.system != system);
            }
        }
    }

    systemAddEntityByComp = (comp: IComponent) => {
        const compInfo = this.registeredComps[comp.compName];
        if (compInfo == null) return;
        let entity = comp.entity;
        compInfo.relatedSystem.forEach(({ system, query }) => {
            if (entity[UNIT_BIT_KEY].contain(system[UNIT_BIT_KEY_DIC][query])) {
                system.addEntity(query, entity);
            }
        });
    }

    systemRemoveEntityByComp = (comp: IComponent) => {
        const compInfo = this.registeredComps[comp.compName];
        if (compInfo == null) return;
        let entity = comp.entity;
        compInfo.relatedSystem.forEach(item => {
            item.system.removeQueriedEntity(item.query, entity);
        });
    }
}
