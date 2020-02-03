

export interface Icomponent
{
    readonly entity: Ientity;
}

export interface Ientity
{
    _uniteBitkey: UniteBitkey;
    addComponent(comp: string): Icomponent;
    removeComponent(comp: string): void;
}
export interface Isystem
{
    readonly caredComps: string[];
    readonly uniteBitkey: UniteBitkey;
    entities: Ientity[];
    addEntity(entity: Ientity): void;
    removeEntity(entity: Ientity): void;
}

export class Ecs
{
    private static registedcomps: { [name: string]: { ctr: any, bitKey: Bitkey, relatedSystem: Isystem[] } } = {};
    static registeComp(comp: Function)
    {
        let target = comp.prototype;
        let compName = target.constructor.name as string;
        if (this.registedcomps[compName] == null)
        {
            this.registedcomps[compName] = { ctr: target.constructor, bitKey: Bitkey.create(), relatedSystem: [] }
        } else
        {
            throw new Error("重复注册组件: " + compName);
        }
    }

    static addComp(entity: Ientity, comp: string): Icomponent
    {
        let compInfo = this.registedcomps[comp];
        if (compInfo == null) return;
        let relatedSystem = compInfo.relatedSystem;
        relatedSystem.forEach(item =>
        {
            if (entity._uniteBitkey.containe(item.uniteBitkey))
            {
                item.addEntity(entity);
            }
        });
        entity._uniteBitkey.addBitKey(compInfo.bitKey);

        let newcomp = new compInfo.ctr() as Icomponent;
        (entity as any)[comp] = newcomp;
        return newcomp;
    }

    static removeComp(entity: Ientity, comp: string)
    {
        let component = (entity as any)[comp];
        if (component != null)
        {
            let relatedSystem = this.registedcomps[comp].relatedSystem;
            relatedSystem.forEach(item =>
            {
                if (item.entities.indexOf(entity) >= 0)
                {
                    item.removeEntity(entity);
                }
            })
        }
    }

    private static systems: Isystem[] = [];
    static addSystem(system: Isystem)
    {
        this.systems.push(system);
        system.caredComps.forEach(item =>
        {
            this.registedcomps[item].relatedSystem.push(system);
        });
    }
}


// 每个组件占一个二进制位，50个二进制位作为一个group，如果component数量超过50的话。
// Reference:https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers

export class Bitkey
{
    private static currentGroupIndex = 0;
    private static currentItemIndex = 0;
    readonly groupIndex: number;
    private itemIndex: number;
    readonly value: number;
    private constructor(groupIndex: number, itemIndex: number)
    {
        this.groupIndex = groupIndex;
        this.itemIndex = itemIndex;
        this.value = 1 << itemIndex;
    }
    static create()
    {
        let newKey = this.currentItemIndex++;
        if (newKey > 50)
        {
            this.currentGroupIndex++;
            this.currentItemIndex = 0;
        }
        return new Bitkey(this.currentGroupIndex, this.currentItemIndex);
    }
}

export class UniteBitkey
{
    private keysMap: { [groupKey: number]: number } = {};
    addBitKey(key: Bitkey)
    {
        let groupKey = key.groupIndex;
        if (this.keysMap[groupKey] == null)
        {
            this.keysMap[groupKey] = 0;
        }
        let currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue | key.value;
    }
    removeBitKey(key: Bitkey)
    {
        let groupKey = key.groupIndex;
        let currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue & ~key.value;
    }

    containe(otherKey: UniteBitkey)
    {
        let keys = Object.keys(otherKey.keysMap);
        let key, otherValue, thisValue, becontained
        for (let i = 0; i < keys.length; i++)
        {
            key = keys[i] as any;
            otherValue = otherKey.keysMap[key];
            thisValue = this.keysMap[key];
            becontained = thisValue != null && ((otherValue & thisValue) == otherValue);
            if (!becontained) return false;
        }
        return true;
    }
}
