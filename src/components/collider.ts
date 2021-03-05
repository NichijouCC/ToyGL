import { Component } from "../core/ecs/component";
import { Ecs } from "../core/ecs/ecs";
import { IComponent } from "../core/ecs/iecs";
import { vec3 } from "../mathD";
import { StaticMesh } from "../scene/asset";

@Ecs.registerComp
export class BoxCollider extends Component {
    center: vec3 = vec3.create();
    size: vec3 = vec3.clone(vec3.ONE);
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}

@Ecs.registerComp
export class SphereCollider extends Component {
    center: vec3 = vec3.create();
    radius = 1.0;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}

@Ecs.registerComp
export class MeshCollider extends Component {
    mesh: StaticMesh
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}
