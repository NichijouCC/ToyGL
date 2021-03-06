import { EventTarget } from "@mtgoo/ctool";
import { AbsComponent } from "../core/ecs/component";
import { ECS } from "../core/ecs/ecs";
import { vec3 } from "../mathD";
import { Component, Entity } from "../scene";

@ECS.registerComp
export class ThirdPersonController extends Component {
    canMove = true;
    moveSpeed: number = 10 * 3.0;
    rotSpeed = 16.0;
    camRotSpeed = 1.0;
    offsetToCamera = vec3.fromValues(0, 3 * 10, 5 * 10);

    // useRigidbody: boolean = true;
    beIntersectCollision = true;
    onMove = new EventTarget();
    onStop = new EventTarget();

    clone(): ThirdPersonController {
        throw new Error("Method not implemented.");
    }
}
