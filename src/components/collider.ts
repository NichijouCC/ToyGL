import { vec3 } from "../mathD";
import { StaticMesh } from "../scene/asset";
import { AbstractComponent } from "./abstractComponent";


export class Collider<T extends colliderTypes = "box"> extends AbstractComponent {
    type: keyof colliderTypes;
    parameters: ColliderParameters[T];
    layer: string = "default";
}

interface ColliderParameters {
    "box": {
        center: vec3,
        size: vec3,
    };
    "sphere": {
        center: vec3,
        raduis: number,
    };
    "mesh": {
        mesh: StaticMesh
    }
}

export type colliderTypes = keyof ColliderParameters;

