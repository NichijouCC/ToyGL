import { Icomponent, Ecs, Ientity, UniteBitkey } from "./Ecs";
import { Transform } from "../scene/Transform";
export class Entity extends Transform implements Ientity
{
    name: string;
    constructor(name: string)
    {
        super();
        this.name = name;
    }
    _uniteBitkey: UniteBitkey;
    addComponent(comp: string): Icomponent
    {
        let newComp = Ecs.addComp(this, comp);
        return newComp;
    }
    removeComponent(comp: string): void
    {
        Ecs.removeComp(this, comp);
    }
}
