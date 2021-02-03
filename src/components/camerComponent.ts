import { AbsComponent } from "../core/absComponent";
import { Icomponent, Ecs } from "../core/ecs";
import { applyMixins } from "../core/util";
import { Camera } from "../scene/camera";

@Ecs.registeComp
export class CameraComponent extends AbsComponent {
    init() {
        this._node = this.entity;
    }
    clone(): CameraComponent {
        throw new Error("Method not implemented.");
    }
}

export interface CameraComponent extends Camera, AbsComponent { }
applyMixins(CameraComponent, [Camera]);