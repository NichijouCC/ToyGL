import { UUID } from "@mtgoo/ctool";
import { AbsSystem } from "../core/absSystem";
import { Camera } from "../scene/Index";
import { Collider } from "./collider";

export class ColliderSystem extends AbsSystem<[Collider<any>]> {
    careCompCtors = [Collider, Camera];

    constructor() {
        super();
        PhysicsWorld.init();
        this.on("removeEntity", ({ entity, comps }) => {
            PhysicsWorld.removeShape(entity.id);
        });
        this.on("addEntity", ({ entity, comps }) => {
            let comp = comps[0] as Collider;
            if (comp.type == "box") {
                PhysicsWorld.addBoxShape(UUID.create_v4(), entity.worldPosition, comp.parameters);
            } else {

            }
        });
    }

    update(delta: number) {
        this.comps.forEach(([comp]) => {

        })
    }
}


export class PhysicsWorld {
    static world: CANNON.World;
    private static dic: { [id: string]: CANNON.Body } = {};
    static init() {
        var world = new CANNON.World();
        world.gravity.set(0, 0, -9.82); // m/s²
        this.world = world;
    }

    static addBoxShape(id: string, position: ArrayLike<number>, halfExtents: ArrayLike<number>) {
        let body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(position[0], position[1], position[2]),
            shape: new CANNON.Box(new CANNON.Vec3(halfExtents[0], halfExtents[1], halfExtents[2])),
        });
        this.world.addBody(body);
        this.dic[id] = body;
    }

    static removeShape(id: string) {
        this.world.remove(this.dic[id]);
    }
}