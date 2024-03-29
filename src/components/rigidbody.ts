import { IComponent } from "../core/ecs/iecs";
import { vec3 } from "../mathD";
import { Component } from "../scene/entity";

export class Rigidbody extends Component {
    mass = 1;
    radius = 0.5;
    height = 1;
    velocity: vec3 = vec3.create();
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}
