import { AbsComponent } from "../core/ecs/component";
import { ECS } from "../core/ecs/ecs";
import { applyMixins } from "../core/util";
import { Component, Entity } from "../scene";
import { Camera } from "../scene/camera";

@ECS.registerComp
export class CameraComponent extends Component {
    onInit() {
        this._node = this.entity;
    }
    clone(): CameraComponent {
        throw new Error("Method not implemented.");
    }
}

export interface CameraComponent extends Camera, Component { }
applyMixins(CameraComponent, [Camera]);