import { Component } from "../core/ecs/component";
import { Ecs } from "../core/ecs/ecs";
import { applyMixins } from "../core/util";
import { Camera } from "../scene/camera";

@Ecs.registerComp
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