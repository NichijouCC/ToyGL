import { Ecs } from "../core/ecs";
import { vec3 } from "../mathD";
import { AbstractComponent } from "./abstractComponent";

@Ecs.registeComp
export class ThirdPersonController extends AbstractComponent {
    moveSpeed: number = 1.0;
    rotSpeed: number = 16.0;
    camRotSpeed: number = 1.0;
    offsetTocamera = vec3.fromValues(0, 3, 5);
}