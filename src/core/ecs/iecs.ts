// 每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
// 通过UnitedBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;

import { UnitedBitkey } from "./bitkey";
export const UPDATE = Symbol("update");
export const UNIT_BIT_KEY = Symbol("uniteBitkey");
export const COMPS = Symbol("comps");
export const UNIT_BIT_KEY_DIC = Symbol("unitedBitkeyDic");
export const ENTITIES = Symbol("entities");

export interface Icomponent {
    readonly entity: Ientity;
    readonly compName: string;
    [UPDATE](): void;
    clone(): Icomponent;
}

export interface Ientity {
    [COMPS]: { [compName: string]: Icomponent };
    [UNIT_BIT_KEY]: UnitedBitkey;
    addComponent<T extends Icomponent, P extends object = any>(comp: new () => T, properties?: P): T;
    getComponent<T extends Icomponent>(comp: new () => T): T;
    removeComponent<T extends Icomponent>(comp: new () => T): void;
}
export interface Isystem {
    readonly caries: { [queryKey: string]: (new () => Icomponent)[] };
    readonly queries: { [queryKey: string]: any };
    [UNIT_BIT_KEY_DIC]: { [queryKey: string]: UnitedBitkey };
    [ENTITIES]: { [queryKey: string]: Ientity[] };
    addEntity(queryKey: string, entity: Ientity): void;
    removeEntity(entity: Ientity): void;
    removeQueriedEntity(queryKey: string, entity: Ientity): void;
    update(deltaTime: number): void;
}
