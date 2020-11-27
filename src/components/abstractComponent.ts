import { Icomponent, Ientity } from "../core/ecs";
import { Entity } from "../core/entity";

export abstract class AbstractComponent implements Icomponent {
    entity: Entity;

    update() {

    }
}