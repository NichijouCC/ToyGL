import { Icomponent, Ecs, Ientity, UniteBitkey } from "./Ecs";
export class Entity implements Ientity
{
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
