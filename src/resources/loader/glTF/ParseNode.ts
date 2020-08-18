
import { Mat4 } from "../../../mathD/mat4";
import { Vec3 } from "../../../mathD/vec3";
import { Quat } from "../../../mathD/quat";
import { ParseCameraNode } from "./ParseCameraNode";
import { Transform } from "../../../core/Transform";
import { ParseMeshNode } from "./ParseMeshNode";
import { IgltfJson } from "../LoadglTF";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { MeshInstance } from "../../../scene/primitive/MeshInstance";
import { Entity } from "../../../core/Entity";
import { ModelComponent } from "../../../components/ModelComponent";
import { StaticMesh } from "../../../scene/asset/geometry/StaticMesh";
import { Skin } from "../../../scene/asset/Skin";
import { ParseAccessorNode } from "./ParseAccessorNode";
import { ParseSkinNode } from "./ParseSkinNode";
import { GlTF } from "./Util";
import { DefaultGeometry } from "../../defAssets/DefaultGeometry";
import { DefaultMesh } from "../../defAssets/DefaultMesh";
import { DefaultMaterial } from "../../defAssets/DefaultMaterial";

export class ParseNode {

    static parse(index: number, gltf: IgltfJson, root: Entity, context: GraphicsDevice): Promise<Entity> {
        let node = gltf.nodes[index];
        let name = GlTF.getNodeName(index, gltf);
        let sceneNode = new Entity(name);
        if (node.matrix) {
            sceneNode.localMatrix = Mat4.fromNumberArray(node.matrix);
        }
        if (node.translation) {
            Vec3.copy(node.translation, sceneNode.localPosition);
        }
        if (node.rotation) {
            Quat.copy(node.rotation, sceneNode.localRotation);
        }
        if (node.scale) {
            Vec3.copy(node.scale, sceneNode.localScale);
        }

        if (node.camera != null) {
            let cam = ParseCameraNode.parse(node.camera, gltf);
            cam.node = sceneNode;
        }

        let allTask: Promise<void>[] = [];
        if (node.mesh != null) {
            let modelcomp = sceneNode.addComponent("ModelComponent") as ModelComponent;
            let task = ParseMeshNode.parse(node.mesh, gltf, context)
                .then(primitives => {
                    let newMesh = new StaticMesh();
                    newMesh.sbuMeshs = primitives.map(item => item.mesh);
                    modelcomp.mesh = newMesh
                    modelcomp.materials = primitives.map(item => item.material);
                });

            if (node.skin != null) {
                ParseSkinNode.parse(node.skin, name, root, gltf).then((skin) => {
                    modelcomp.skin = skin;
                });
            }
            allTask.push(task);
        }

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                let nodeindex = node.children[i];
                let childTask = this.parse(nodeindex, gltf, root, context)
                    .then(child => {
                        sceneNode.addChild(child);
                    });
                allTask.push(childTask);
            }
        }

        //------------------debug skin
        // let arr: number[] = [];
        // gltf.skins.forEach(item => arr = arr.concat(item.joints));
        // if (arr.indexOf(index) >= 0) {
        //     let debugNode = new Entity(name);
        //     let comp = debugNode.addComponent("ModelComponent") as ModelComponent;
        //     comp.mesh = DefaultMesh.cube;
        //     comp.material = DefaultMaterial.color_3d;
        //     debugNode.localScale = Vec3.create(0.1, 0.1, 0.1);
        //     sceneNode.addChild(debugNode);
        // }

        return Promise.all(allTask).then(() => {
            return sceneNode;
        });
    }
}
