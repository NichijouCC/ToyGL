import { Icomponent, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { Camera } from "../scene/camera";

@Ecs.registeComp
export class CameraComponent extends Camera implements Icomponent {
    readonly entity: Entity;
    get node() { return this.entity }
    constructor() {
        super();
    }
}
