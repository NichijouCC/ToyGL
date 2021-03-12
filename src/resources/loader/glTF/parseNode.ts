
import { mat4, vec3, quat } from "../../../mathD/index";
import { ParseCameraNode } from "./parseCameraNode";
import { ParseMeshNode } from "./parseMeshNode";
import { IGltfJson } from "../loadGltf";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { Entity } from "../../../scene/entity";
import { ModelComponent } from "../../../components/modelComponent";
import { StaticMesh } from "../../../scene/asset/geometry/staticMesh";
import { ParseSkinNode } from "./parseSkinNode";
import { GlTF } from "./util";

export class ParseNode {
    static parse(index: number, gltf: IGltfJson, root: Entity, context: GraphicsDevice): Promise<Entity> {
        const node = gltf.nodes[index];
        const name = GlTF.getNodeName(index, gltf);
        const sceneNode = new Entity({ name });
        if (node.matrix) {
            sceneNode.localMatrix = mat4.fromNumberArray(node.matrix);
        }
        if (node.translation) {
            vec3.copy(sceneNode.localPosition, node.translation as any);
        }
        if (node.rotation) {
            quat.copy(sceneNode.localRotation, node.rotation as any);
        }
        if (node.scale) {
            vec3.copy(sceneNode.localScale, node.scale as any);
        }

        if (node.camera != null) {
            const cam = ParseCameraNode.parse(node.camera, gltf);
            cam.node = sceneNode;
        }

        const allTask: Promise<void>[] = [];
        if (node.mesh != null) {
            const comp = sceneNode.addComponent(ModelComponent);
            const task = ParseMeshNode.parse(node.mesh, gltf, context)
                .then(primitives => {
                    const newMesh = new StaticMesh();
                    newMesh.subMeshes = primitives.map(item => item.mesh);
                    comp.mesh = newMesh;
                    comp.materials = primitives.map(item => item.material);
                });

            if (node.skin != null) {
                ParseSkinNode.parse(node.skin, name, root, gltf).then((skin) => {
                    comp.skin = skin;
                });
            }
            allTask.push(task);
        }

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const nodeIndex = node.children[i];
                const childTask = this.parse(nodeIndex, gltf, root, context)
                    .then(child => {
                        sceneNode.addChild(child);
                    });
                allTask.push(childTask);
            }
        }

        // ------------------debug skin
        // let arr: number[] = [];
        // gltf.skins.forEach(item => arr = arr.concat(item.joints));
        // if (arr.indexOf(index) >= 0) {
        //     let debugNode = Entity.create(name);
        //     let comp = debugNode.addComponent("ModelComponent") as ModelComponent;
        //     comp.mesh = DefaultMesh.cube;
        //     comp.material = DefaultMaterial.color_3d;
        //     debugNode.localScale = vec3.create(0.1, 0.1, 0.1);
        //     sceneNode.addChild(debugNode);
        // }

        return Promise.all(allTask).then(() => {
            return sceneNode;
        }).catch(err => {
            console.error("ParseNode error", err);
            return Promise.reject(err);
        })
    }
}
