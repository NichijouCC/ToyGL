// 每个组件占据一个二级制位BitKey, 每个system都有关联的component，组成一个UniteBitKey,每个entity的components同样会组成一个UniteBitKey;
// 通过UnitedBitKey 二进制比对来快速检验 entity是否含有system所关心的组件;

import { UnitedBitKey } from "./bitKey";
export const UPDATE = Symbol("update");
export const UNIT_BIT_KEY = Symbol("uniteBitKey");
export const COMPS = Symbol("comps");
export const UNIT_BIT_KEY_DIC = Symbol("unitedBitKeyDic");
export const ENTITIES = Symbol("entities");

export interface IComponent {
    readonly entity: IEntity;
    readonly compName: string;
    [UPDATE](): void;
    clone(): IComponent;
}

export interface IEntity {
    id: string;
    [COMPS]: { [compName: string]: IComponent };
    [UNIT_BIT_KEY]: UnitedBitKey;
    addComponent<T extends IComponent, P extends object = any>(comp: new () => T, properties?: P): T;
    getComponent<T extends IComponent>(comp: new () => T): T;
    removeComponent<T extends IComponent>(comp: new () => T): void;
}
export interface ISystem {
    readonly caries: { [queryKey: string]: (new () => IComponent)[] };
    readonly queries: { [queryKey: string]: any };
    [UNIT_BIT_KEY_DIC]: { [queryKey: string]: UnitedBitKey };
    [ENTITIES]: { [queryKey: string]: IEntity[] };
    addEntity(queryKey: string, entity: IEntity): void;
    removeEntity(entity: IEntity): void;
    removeQueriedEntity(queryKey: string, entity: IEntity): void;
    update(deltaTime: number): void;
}
