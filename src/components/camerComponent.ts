import { Icomponent, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { Camera } from "../scene/Camera";

@Ecs.registeComp
export class CameraComponent extends Camera implements Icomponent {
    readonly entity: Entity;
    constructor() {
        super();
        this.node = this.entity;
    }
}
