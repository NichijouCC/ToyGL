import { Isystem, UniteBitkey, Ientity } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { MeshInstance } from "../scene/MeshInstance";

export class ModelSystem implements Isystem
{
    constructor()
    {

    }
    caredComps: string[] = ["ModelComponent"];
    uniteBitkey: UniteBitkey = new UniteBitkey();
    entities: Entity[] = [];

    addEntity(entity: Entity): void
    {
        this.entities.push(entity);
        entity.onChangeActiveState.addEventListener(() =>
        {

        })
    }
    removeEntity(entity: Entity): void
    {
        throw new Error("Method not implemented.");
    }
}