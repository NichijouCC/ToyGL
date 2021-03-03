import { System } from "../core/ecs/system";
import { vec3 } from "../mathD";
import { BoxCollider, SphereCollider } from "./collider";
import * as CANNON from 'cannon-es';
import { Rigidbody } from "./rigidbody";
import { Ecs } from "../core/ecs/ecs";

export class ColliderSystem extends System {
    caries = { boxColliders: [BoxCollider], SphereColliders: [SphereCollider], rigidbodies: [Rigidbody] };
    private dic: { [id: string]: CANNON.Body } = {};
    constructor() {
        super();
        PhysicsWorld.init();
        this.on("removeEntity", ({ entity, queryKey }) => {
            if (queryKey == "colliders") {
                PhysicsWorld.removeShape(this.dic[entity.id]);
            }
        });
        this.on("addEntity", ({ entity, queryKey }) => {
            if (queryKey == "boxColliders") {
                let comp = entity.getComponent(BoxCollider);
                let worldPos = vec3.add(vec3.create(), comp.center, entity.worldPosition);
                let shape = PhysicsWorld.addBoxShape(worldPos, comp.size);
                this.dic[entity.id] = shape;
            } else if (queryKey == "SphereColliders") {
                let comp = entity.getComponent(SphereCollider);
                let worldPos = vec3.add(vec3.create(), comp.center, entity.worldPosition);
                let shape = PhysicsWorld.addSphereShape(worldPos, comp.radius);
                this.dic[entity.id] = shape;
            }
            else if (queryKey == "rigidbodies") {
                let comp = entity.getComponent(Rigidbody);
                let shape = PhysicsWorld.addRigidbody(comp.entity.worldPosition, comp.radius, comp.height, comp.mass);
                this.dic[entity.id] = shape;
            }
        });
    }

    update(delta: number) {
        PhysicsWorld.update(delta);
        let pos, entity, tempt = vec3.create();
        for (let key in this.dic) {
            pos = this.dic[key].position;
            entity = Ecs.findEntityById(key);
            entity.worldPosition = vec3.set(tempt, pos.x, pos.y, pos.z);
        }
        this.queries.rigidbodies.forEach(item => {
            let comp = item.getComponent(Rigidbody);
            this.dic[item.id].velocity.x = comp.velocity[0];
            this.dic[item.id].velocity.y = comp.velocity[1];
            this.dic[item.id].velocity.z = comp.velocity[2];
        })
    }
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

    static addRigidbody(position: ArrayLike<number>, raduis: number, height: number, mass: number) {
        let body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Cylinder(raduis, raduis, height),
            type: CANNON.Body.KINEMATIC
        });
        this.world.addBody(body);
        return body;
    }

    static update(deltaTime: number) {
        this.world?.step(1.0 / 60.0, deltaTime, 3);
    }
}