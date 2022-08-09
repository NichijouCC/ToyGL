import { AnimationClip, Asset, Entity, Geometry, mat4, Material, ModelComponent, quat, Skin, StaticGeometry, vec3, World, Animation } from "../../index";
import { IGltfNode } from "./gltfJsonStruct";

export class GltfAsset extends Asset {
    readonly data: GltfNode;
    constructor(data: GltfNode) {
        super();
        this.data = data;
    }
    createInstance(world: World) {
        return this.nodeToEntity(this.data, world);
    }
    private nodeToEntity(node: GltfNode, world: World) {
        let ins = new Entity(world);
        if (node.name) ins.name = node.name;
        ins.localMatrix = node.matrix;
        if (node.mesh) {
            let comp = ins.addComponent(ModelComponent);
            comp.mesh = node.mesh.mesh
            comp.materials = node.mesh.materials;
            if (node.mesh.skin) {
                comp.skin = node.mesh.skin;
            }
        }
        if (node.animations) {
            let comp = ins.addComponent(Animation);
            node.animations.forEach(el => comp.addAnimationClip(el))
        }
        node.children.forEach(child => {
            let childIns = this.nodeToEntity(child, world);
            ins.addChild(childIns);
        });
        return ins;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class GltfNode {
    index: number;
    name: string;
    raw?: IGltfNode;
    mesh?: Mesh;
    animations?: AnimationClip[];
    matrix: mat4;
    children: GltfNode[] = [];
}


export class Primitive {
    geometry: Geometry;
    material: Material;
}

export class Mesh {
    mesh: StaticGeometry;
    materials: Material[];
    skin?: Skin;
}
