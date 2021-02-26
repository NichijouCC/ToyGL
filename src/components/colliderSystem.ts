import { System } from "../core/ecs/system";
import { vec3 } from "../mathD";
import { Collider } from "./collider";
import * as CANNON from 'cannon-es';

export class ColliderSystem extends System<{ comps: Collider<any>[][] }> {
    caries = { comps: [Collider] };
    private dic: { [id: string]: CANNON.Body } = {};
    constructor() {
        super();
        PhysicsWorld.init();
        this.on("removeEntity", ({ entity, comps }) => {
            PhysicsWorld.removeShape(this.dic[entity.id]);
        });
        this.on("addEntity", ({ entity, comps }) => {
            let comp = comps[0] as Collider;
            if (comp.type == "box") {
                let worldPos = vec3.add(vec3.create(), comp.parameters.center, entity.worldPosition);
                let shape = PhysicsWorld.addBoxShape(worldPos, comp.parameters.size);
                this.dic[entity.id] = shape;
            } else if (comp.type = "sphere") {
                let worldPos = vec3.add(vec3.create(), comp.parameters.center, entity.worldPosition);
                let shape = PhysicsWorld.addSphereShape(worldPos, comp.parameters.radius);
                this.dic[entity.id] = shape;
            }
        });
    }

    update(delta: number) { }
}


export class PhysicsWorld {
    static world: CANNON.World;
    static init() {
        var world = new CANNON.World();
        world.gravity.set(0, 0, -9.82); // m/s²
        this.world = world;
    }

    static addBoxShape(position: ArrayLike<number>, halfExtents: ArrayLike<number>) {
        let body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Box(new CANNON.Vec3(halfExtents[0], halfExtents[1], halfExtents[2])),
        });
        this.world.addBody(body);
        return body;
    }
    static addSphereShape(position: ArrayLike<number>, radius: number) {
        let body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Sphere(radius),
        });
        this.world.addBody(body);
        return body;
    }
    static removeShape(body: CANNON.Body) {
        this.world.removeBody(body);
    }
}