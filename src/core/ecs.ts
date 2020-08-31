// 每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
// 通过UniteBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;
// enity addcomponent时候将检查 相关system是否要管理此组件,关心的话就add到system中,这样就避免system的query过程.

export interface Icomponent {
    entity: Ientity;
}

export interface Ientity {
    _uniteBitkey: UniteBitkey;
    addComponent(comp: string): Icomponent;
    removeComponent(comp: string): void;
}
export interface Isystem {
    readonly caredComps: string[];
    readonly uniteBitkey: UniteBitkey;
    // entities: Ientity[];
    tryAddEntity(entity: Ientity): void;
    tryRemoveEntity(entity: Ientity): void;
    update(deltaTime: number): void;
}

export class Ecs {
    private static registedcomps: { [name: string]: { ctr: any, bitKey: Bitkey, relatedSystem: Isystem[] } } = {};
    static registeComp = (comp: Function) => {
        const target = comp.prototype;
        const compName = target.constructor.name as string;
        if (Ecs.registedcomps[compName] == null) {
            Ecs.registedcomps[compName] = { ctr: target.constructor, bitKey: Bitkey.create(), relatedSystem: [] };
        } else {
            throw new Error("重复注册组件: " + compName);
        }
    }

    static addComp(entity: Ientity, comp: string): Icomponent {
        const compInfo = this.registedcomps[comp];
        if (compInfo == null) return;

        // eslint-disable-next-line new-cap
        const newcomp = new compInfo.ctr() as Icomponent;
        newcomp.entity = entity;
        (entity as any)[comp] = newcomp;
        entity._uniteBitkey.addBitKey(compInfo.bitKey);

        const relatedSystem = compInfo.relatedSystem;
        relatedSystem.forEach(item => {
            if (entity._uniteBitkey.containe(item.uniteBitkey)) {
                item.tryAddEntity(entity);
            }
        });
        return newcomp;
    }

    static removeComp(entity: Ientity, comp: string) {
        const component = (entity as any)[comp];
        if (component != null) {
            const relatedSystem = this.registedcomps[comp].relatedSystem;
            relatedSystem.forEach(item => {
                item.tryRemoveEntity(entity);
            });
        }
    }

    private static systems: Isystem[] = [];
    static addSystem(system: Isystem) {
        this.systems.push(system);
        system.caredComps.forEach(item => {
            const info = this.registedcomps[item];
            system.uniteBitkey.addBitKey(info.bitKey);
            info.relatedSystem.push(system);
        });
    }

    static update(deltaTime: number) {
        this.systems.forEach(item => item.update(deltaTime));
    }
}

// 每个组件占一个二进制位，50个二进制位作为一个group，如果component数量超过50的话。
// Reference:https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers

export class Bitkey {
    private static currentGroupIndex = 0;
    private static currentItemIndex = 0;
    readonly groupIndex: number;
    private itemIndex: number;
    readonly value: number;
    private constructor(groupIndex: number, itemIndex: number) {
        this.groupIndex = groupIndex;
        this.itemIndex = itemIndex;
        this.value = 1 << itemIndex;
    }

    static create() {
        const newKey = this.currentItemIndex++;
        if (newKey > 50) {
            this.currentGroupIndex++;
            this.currentItemIndex = 0;
        }
        return new Bitkey(this.currentGroupIndex, this.currentItemIndex);
    }
}

export class UniteBitkey {
    private keysMap: { [groupKey: number]: number } = {};
    addBitKey(key: Bitkey) {
        const groupKey = key.groupIndex;
        if (this.keysMap[groupKey] == null) {
            this.keysMap[groupKey] = 0;
        }
        const currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue | key.value;
    }

    removeBitKey(key: Bitkey) {
        const groupKey = key.groupIndex;
        const currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue & ~key.value;
    }

    containe(otherKey: UniteBitkey) {
        const keys = Object.keys(otherKey.keysMap);
        let key, otherValue, thisValue, becontained;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i] as any;
            otherValue = otherKey.keysMap[key];
            thisValue = this.keysMap[key];
            becontained = thisValue != null && ((otherValue & thisValue) == otherValue);
            if (!becontained) return false;
        }
        return true;
    }
}
