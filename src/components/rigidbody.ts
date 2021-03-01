import { Component } from "../core/ecs/component";
import { Ecs } from "../core/ecs/ecs";
import { Icomponent } from "../core/ecs/iecs";
@Ecs.registerComp
export class Rigidbody extends Component {
    mass = 1;
    clone(): Icomponent {
        throw new Error("Method not implemented.");
    }
}