export interface Ientity {
    readonly guid: number;
    components: { [name: string]: Icomponent };
    addCompByName(compName: string): Icomponent;
    addComp(comp: Icomponent): Icomponent;
    dispose(): void;
}
function newId(): number {
    return newId.prototype.id++;
}
newId.prototype.id = -1;

class Entity implements Ientity {
    name: string;
    readonly guid: number;
    beActive: boolean;
    components: { [name: string]: Icomponent };

    constructor(name: string = null) {
        this.guid = newId();
        this.name = name ? name : "newEntity";
        this.beActive = true;
    }

    addCompByName(name: string): Icomponent {
        let comp = ECS.NewComponent(name);
        this.components[name] = comp;
        comp.entity = this;
        return comp;
    }
    addComp(comp: Icomponent): Icomponent {
        this.components[comp.constructor.name] = comp;
        comp.entity = this;
        return comp;
    }
    removeCompByName(name: string) {
        if (this.components[name]) {
            this.components[name].dispose();
            delete this.components[name];
        }
    }

    dispose(): void {
        for (let key in this.components) {
            this.components[key].dispose();
        }
        this.components = null;
    }
}
export class Comps {}

export interface IcompoentConstructor {
    new (): Icomponent;
}
export interface Icomponent {
    entity: Ientity;
    dispose(): void;
}

export class ECS {
    private static dic: { [compName: string]: IcompoentConstructor };

    static RegComp(comp: Function) {
        this.dic[comp.constructor.name] = comp.constructor as IcompoentConstructor;
    }
    static NewComponent(compname: string): Icomponent {
        return new ECS.dic[compname]();
    }

    static NewEntity(name: string = null, compsArr: string[] = null) {
        let newobj = new Entity(name);
        if (compsArr != null) {
            for (let i = 0; i < compsArr.length; i++) {
                newobj.addCompByName(compsArr[i]);
            }
        }
    }
}
