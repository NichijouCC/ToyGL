import { ECS } from "../core/ecs";
import { IComponent } from "../core/ecs/iecs";
import { vec3 } from "../mathD";
import { Component, Entity } from "../scene";
import { StaticMesh } from "../scene/asset";

@ECS.registerComp
export class BoxCollider extends Component {
    center: vec3 = vec3.create();
    halfSize: vec3 = vec3.clone(vec3.ONE);
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}

@ECS.registerComp
export class SphereCollider extends Component {
    center: vec3 = vec3.create();
    radius = 1.0;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}

@ECS.registerComp
export class MeshCollider extends Component {
    mesh: StaticMesh
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}
