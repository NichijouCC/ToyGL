import { mat4, vec3 } from "../mathD";
import { BoxCollider, SphereCollider } from "./collider";
import * as CANNON from "cannon-es";
import { Rigidbody } from "./rigidbody";
import { Entity, System } from "../scene/entity";
import { ToyGL } from "../toygl";
import { InterScene } from "../scene";

export class ColliderSystem extends System {
    caries = { boxColliders: [BoxCollider], SphereColliders: [SphereCollider], rigidbodies: [Rigidbody] };
    drawOutLine = false;
    private _scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this._scene = scene;
        PhysicsWorld.init();
        this.on("removeEntity", ({ entity, queryKey }) => {
            if (queryKey == "colliders") {
                PhysicsWorld.removeShape(entity.id);
            }
        });
        this.on("addEntity", ({ entity, queryKey }) => {
            if (queryKey == "boxColliders") {
                const comp = entity.getComponent(BoxCollider);
                const selfMat = mat4.fromTranslation(mat4.create(), comp.center);
                const worldMat = mat4.multiply(selfMat, entity.worldMatrix, selfMat);
                const worldPos = mat4.getTranslation(vec3.create(), worldMat);
                const worldScale = mat4.getScaling(vec3.create(), worldMat);
                const worldSize = vec3.multiply(vec3.create(), comp.halfSize, worldScale);
                PhysicsWorld.addBoxShape(entity.id, worldPos, worldSize);
            } else if (queryKey == "SphereColliders") {
                const comp = entity.getComponent(SphereCollider);
                const worldPos = vec3.add(vec3.create(), comp.center, entity.worldPosition);
                PhysicsWorld.addSphereShape(entity.id, worldPos, comp.radius);
            } else if (queryKey == "rigidbodies") {
                const comp = entity.getComponent(Rigidbody);
                PhysicsWorld.addRigidbody(entity.id, comp.entity.worldPosition, comp.radius, comp.height, comp.mass);
            }
        });
    }

    update(delta: number) {
        // PhysicsWorld.update(delta);
        if (this.drawOutLine) {
            this.queries.boxColliders.forEach(item => {
                const comp = item.getComponent(BoxCollider);
                this._scene.gizmos.drawAABB(comp, comp.entity.worldMatrix);
            });
        }
        // let pos, entity, tempt = vec3.create();
        // for (let key in this.dic) {
        //     pos = this.dic[key].position;
        //     entity = Ecs.findEntityById(key);
        //     entity.worldPosition = vec3.set(tempt, pos.x, pos.y, pos.z);
        // }
        // this.queries.rigidbodies.forEach(item => {
        //     let comp = item.getComponent(Rigidbody);
        //     this.dic[item.id].velocity.x = comp.velocity[0];
        //     this.dic[item.id].velocity.y = comp.velocity[1];
        //     this.dic[item.id].velocity.z = comp.velocity[2];
        // })
    }
}

export class PhysicsWorld {
    private static dic: { [id: string]: CANNON.Body } = {};
    static world: CANNON.World;
    static init() {
        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82); // m/s²
        this.world = world;
    }

    static addBoxShape(id: string, position: ArrayLike<number>, halfExtents: ArrayLike<number>) {
        const body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Box(new CANNON.Vec3(halfExtents[0], halfExtents[1], halfExtents[2]))
        });
        this.world.addBody(body);
        this.dic[id] = body;
        return body;
    }

    static addSphereShape(id: string, position: ArrayLike<number>, radius: number) {
        const body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Sphere(radius)
        });
        this.world.addBody(body);
        this.dic[id] = body;
        return body;
    }

    static removeShape(id: string) {
        this.world.removeBody(this.dic[id]);
    }

    static addRigidbody(id: string, position: ArrayLike<number>, radius: number, height: number, mass: number) {
        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Cylinder(radius, radius, height)
            // type: CANNON.Body.KINEMATIC
        });
        this.world.addBody(body);
        this.dic[id] = body;
        return body;
    }

    static update(deltaTime: number) {
        this.world?.step(1.0 / 60.0, deltaTime, 3);
    }

    static rayTest(from: vec3, to?: vec3) {
        const result = new CANNON.RaycastResult();
        this.world?.rayTest(new CANNON.Vec3(from[0], from[1], from[2]), new CANNON.Vec3(to[0], to[1], to[2]), result);
        return result;
    }
}
