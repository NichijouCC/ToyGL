import { EventTarget } from "@mtgoo/ctool";
import { AbsComponent } from "../core/absComponent";
import { Ecs } from "../core/ecs";
import { vec3 } from "../mathD";

@Ecs.registeComp
export class ThirdPersonController extends AbsComponent {
    canMove: boolean = true;
    moveSpeed: number = 3.0;
    rotSpeed: number = 16.0;
    camRotSpeed: number = 1.0;
    offsetTocamera = vec3.fromValues(0, 3, 5);

    onMove = new EventTarget();
    onStop = new EventTarget();
}