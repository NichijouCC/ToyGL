import { Icomponent, Ecs } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { Camera } from "../scene/Camera";

@Ecs.registeComp
export class CameraComponent extends Camera implements Icomponent {
    readonly entity: Entity;
    constructor() {
        super();
        this.node = this.entity;
    }
}
