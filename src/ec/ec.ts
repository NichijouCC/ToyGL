export interface Ientity {
    readonly guid: number;
    components: { [name: string]: Icomponent };
    addCompByName(compName: string): Icomponent;
    addComp(comp: Icomponent): Icomponent;
    dispose(): void;
}

export interface IcompoentConstructor {
    new (): Icomponent;
}
export interface Icomponent {
    entity: Ientity;
    dispose(): void;
}

export class EC {
    private static dic: { [compName: string]: IcompoentConstructor };
    static RegComp(comp: Function) {
        this.dic[comp.constructor.name] = comp.constructor as IcompoentConstructor;
    }
    static NewComponent(compname: string): Icomponent {
        return new EC.dic[compname]();
    }
}
