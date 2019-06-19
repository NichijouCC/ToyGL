import { Entity } from "./ec/entity";

export class Scene {
    private entities: Map<number, Entity> = new Map();

    newEntity(name: string = null, compsArr: string[] = null): Entity {
        let newobj = new Entity(name, compsArr);
        this.addEntity(newobj);
        return newobj;
    }

    addEntity(entity: Entity) {
        this.entities.set(entity.guid, entity);
    }
}
