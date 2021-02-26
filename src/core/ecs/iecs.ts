// 每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
// 通过UniteBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;
// enity addcomponent时候将检查 相关system是否要管理此组件,关心的话就add到system中,这样就避免system的query过程.

import { UniteBitkey } from "../bitkey";
export const UPDATE = Symbol("update");
export const UNIT_BIT_KEY = Symbol("uniteBitkey");
export const COMPS = Symbol("comps");
export const UNIT_BIT_KEY_DIC = Symbol("uniteBitkeyDic");
export const ENTITIES = Symbol("entities");
export const COMPS_ARR = Symbol("compsArr");



export interface Icomponent {
    readonly entity: Ientity;
    readonly compName: string;
    [UPDATE](): void;
    clone(): Icomponent;
}

export interface Ientity {
    [COMPS]: { [compName: string]: Icomponent };
    [UNIT_BIT_KEY]: UniteBitkey;
    addComponent<T extends Icomponent, P extends object = any>(comp: new () => T, properties?: P): T;
    getComponent<T extends Icomponent>(comp: new () => T): T;
    removeComponent<T extends Icomponent>(comp: new () => T): void;
}
export interface Isystem {
    readonly caries: { [query: string]: (new () => Icomponent)[] };
    readonly queries: { [query: string]: any };
    [UNIT_BIT_KEY_DIC]: { [query: string]: UniteBitkey };
    [ENTITIES]: { [query: string]: { [id: string]: Ientity } };
    [COMPS_ARR]: { [query: string]: Icomponent[][] };
    addEntity(query: string, entity: Ientity): void;
    removeEntity(entity: Ientity): void;
    update(deltaTime: number): void;
    // [UPDATE](deltaTime: number): void;
}
