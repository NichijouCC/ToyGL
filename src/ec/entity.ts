import { Ientity, Icomponent, EC } from "./ec";
import { Transform } from "./components/transform";

export class Entity implements Ientity {
    name: string;
    readonly guid: number;
    beActive: boolean;
    components: { [name: string]: Icomponent };

    get transform(): Transform {
        return this.components["Transform"] as Transform;
    }
    constructor(name: string = null, compsArr: string[] = null) {
        this.guid = newId();
        this.name = name || "newEntity";
        this.beActive = true;

        if (compsArr != null) {
            for (let i = 0; i < compsArr.length; i++) {
                this.addCompByName(compsArr[i]);
            }
        }
        if (this.transform == null) {
            this.addCompByName("Transform");
        }
    }

    addCompByName(name: string): Icomponent {
        let comp = EC.NewComponent(name);
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

    update(deltatime: number) {
        for (const key in this.components) {
            this.components[key].update(deltatime);
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
