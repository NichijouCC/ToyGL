
import { Mat4 } from "../../../mathD/mat4";
import { Vec3 } from "../../../mathD/vec3";
import { Quat } from "../../../mathD/quat";
import { ParseCameraNode } from "./parseCameraNode";
import { Transform } from "../../../core/transform";
import { ParseMeshNode } from "./parseMeshNode";
import { IgltfJson } from "../loadglTF";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { MeshInstance } from "../../../scene/primitive/meshInstance";
import { Entity } from "../../../core/entity";
import { ModelComponent } from "../../../components/modelComponent";
import { StaticMesh } from "../../../scene/asset/geometry/staticMesh";
import { Skin } from "../../../scene/asset/Skin";
import { ParseAccessorNode } from "./parseAccessorNode";
import { ParseSkinNode } from "./parseSkinNode";
import { GlTF } from "./util";
import { DefaultGeometry } from "../../defAssets/defaultGeometry";
import { DefaultMesh } from "../../defAssets/defaultMesh";
import { DefaultMaterial } from "../../defAssets/defaultMaterial";

export class ParseNode {
    static parse(index: number, gltf: IgltfJson, root: Entity, context: GraphicsDevice): Promise<Entity> {
        const node = gltf.nodes[index];
        const name = GlTF.getNodeName(index, gltf);
        const sceneNode = new Entity(name);
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
            const cam = ParseCameraNode.parse(node.camera, gltf);
            cam.node = sceneNode;
        }

        const allTask: Promise<void>[] = [];
        if (node.mesh != null) {
            const modelcomp = sceneNode.addComponent("ModelComponent") as ModelComponent;
            const task = ParseMeshNode.parse(node.mesh, gltf, context)
                .then(primitives => {
                    const newMesh = new StaticMesh();
                    newMesh.sbuMeshs = primitives.map(item => item.mesh);
                    modelcomp.mesh = newMesh;
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
                const nodeindex = node.children[i];
                const childTask = this.parse(nodeindex, gltf, root, context)
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
