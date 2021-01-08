import { AbsComponent } from "../core/absComponent";
import { Icomponent, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { Camera } from "../scene/camera";

@Ecs.registeComp
export class CameraComponent {
    init() {
        this._node = this.entity;
    }
}

export interface CameraComponent extends Camera, AbsComponent {

}
applyMixins(CameraComponent, [Camera, AbsComponent]);

function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
}