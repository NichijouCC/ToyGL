import { Component } from "../core/ecs/component";
import { Ecs } from "../core/ecs/ecs";
import { vec3 } from "../mathD";
import { StaticMesh } from "../scene/asset";

@Ecs.registerComp
export class Collider<T extends colliderTypes = any> extends Component {
    type: keyof ColliderParameters;
    parameters: ColliderParameters[T];
    layer: string = "default";

    clone(): Collider {
        throw new Error("Method not implemented.");
    }
}

interface ColliderParameters {
    "box": {
        center: vec3,
        size: vec3,
    };
    "sphere": {
        center: vec3,
        radius: number,
    };
    "mesh": {
        mesh: StaticMesh
    }
}

export type colliderTypes = keyof ColliderParameters;

