
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

export class ParseNode {
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<Entity> {
        let node = gltf.nodes[index];

        let name = node.name || "node" + index;
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
            let task = ParseMeshNode.parse(node.mesh, gltf, context)
                .then(primitives => {
                    let modelcomp = sceneNode.addComponent("ModelComponent") as ModelComponent;
                    let newMesh = new StaticMesh();
                    newMesh.sbuMeshs = primitives.map(item => item.mesh);
                    modelcomp.mesh = newMesh
                    modelcomp.materials = primitives.map(item => item.material);
                });
            allTask.push(task);
        }

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                let nodeindex = node.children[i];
                let childTask = this.parse(nodeindex, gltf, context)
                    .then(child => {
                        sceneNode.addChild(child);
                    });
                allTask.push(childTask);
            }
        }
        return Promise.all(allTask).then(() => {
            return sceneNode;
        });

        // if (node.skin != null && node.mesh != null) {
        //     let nodemeshdata: PrimitiveNode[] = bundle.meshNodeCache[node.mesh];
        //     let skindata = bundle.skinNodeCache[node.skin];

        //     for (let key in nodemeshdata) {
        //         let data = nodemeshdata[key];
        //         //-----------------------------
        //         let obj = new GameObject();
        //         trans.addChild(obj.transform);
        //         let meshr = obj.addComponent<SkinMeshRender>("SkinMeshRender");
        //         // let mat=assetMgr.load("resource/mat/diff.mat.json") as Material;
        //         // meshr.material=mat;
        //         meshr.mesh = data.mesh;
        //         meshr.material = data.mat;

        //         // meshr.joints=skindata.joints;
        //         for (let i = 0; i < skindata.jointIndexs.length; i++) {
        //             let trans = bundle.nodeDic[skindata.jointIndexs[i]];
        //             if (trans == null) {
        //                 console.error("解析gltf 异常！");
        //             }
        //             meshr.joints.push(trans);
        //         }

        //         meshr.bindPoses = skindata.inverseBindMat;
        //         meshr.bindPlayer = bundle.bundleAnimator;
        //     }
        // } else
    }
}
