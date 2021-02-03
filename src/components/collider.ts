import { AbsComponent } from "../core/absComponent";
import { vec3 } from "../mathD";
import { StaticMesh } from "../scene/asset";

export class Collider<T extends colliderTypes = "box"> extends AbsComponent {
    type: keyof colliderTypes;
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
        raduis: number,
    };
    "mesh": {
        mesh: StaticMesh
    }
}

export type colliderTypes = keyof ColliderParameters;

