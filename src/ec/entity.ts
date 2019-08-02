import { Transform } from "./transform";
import { Ientity, Icomponent, ToyActor, Irender, CullingMask } from "./ec";

@ToyActor.Reg
export class Entity implements Ientity {
    maskLayer: CullingMask = CullingMask.default;
    name: string;
    readonly guid: number;
    beActive: boolean;
    components: { [name: string]: Icomponent } = {};

    constructor(name: string = null, compsArr: string[] = null) {
        this.guid = newId();
        this.name = name != null ? name : "newEntity";
        this.beActive = true;
        this._transform = ToyActor.create("Transform") as Transform;
        this._transform.entity = this;

        if (compsArr != null) {
            for (let i = 0; i < compsArr.length; i++) {
                this.addCompByName(compsArr[i]);
            }
        }
    }
    private _transform: Transform;
    get transform(): Transform {
        return this._transform;
    }

    addCompByName(name: string): Icomponent {
        let comp = ToyActor.create(name);
        this.components[name] = comp;
        comp.entity = this;
        return comp;
    }
    getCompByName(compName: string): Icomponent {
        return this.components[compName];
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

function newId(): number {
    return newId.prototype.id++;
}
newId.prototype.id = -1;

export * from "./transform";
export * from "./components/mesh";
export * from "./components/cameracontroller";
