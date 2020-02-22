import { Icomponent, Ecs, Ientity, UniteBitkey } from "./Ecs";
import { Transform } from "./Transform";
export class Entity extends Transform implements Ientity
{
    name: string;
    constructor(name?: string)
    {
        super();
        this.name = name;
    }
    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent(comp: string): Icomponent
    {
        let newComp = Ecs.addComp(this, comp);
        return newComp;
    }
    removeComponent(comp: string): void
    {
        Ecs.removeComp(this, comp);
    }

    clone(): Entity
    {
        //TODO
        return new Entity();
    }
}
