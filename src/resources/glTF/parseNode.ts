import { Entity } from "../../ec/entity";
import { Mat4 } from "../../mathD/mat4";
import { Vec3 } from "../../mathD/vec3";
import { Quat } from "../../mathD/quat";
import { ParseCameraNode } from "./parseCameraNode";
import { Transform } from "../../ec/components/transform";
import { ParseMeshNode } from "./parseMeshNode";
import { IgltfJson } from "./loadglTF";
import { Mesh } from "../../ec/components/mesh";

export class ParseNode {
    static parse(index: number, gltf: IgltfJson): Promise<Transform> {
        let node = gltf.nodes[index];

        let name = node.name || "node" + index;
        let trans = new Entity(name).transForm;

        if (node.matrix) {
            trans.localMatrix = Mat4.fromArray(node.matrix);
        }
        if (node.translation) {
            Vec3.copy(node.translation, trans.localPosition);
            trans.markDirty();
        }
        if (node.rotation) {
            Quat.copy(node.rotation, trans.localRotation);
            trans.markDirty();
        }
        if (node.scale) {
            Vec3.copy(node.scale, trans.localScale);
            trans.markDirty();
        }

        if (node.camera != null) {
            let cam = ParseCameraNode.parse(node.camera, gltf);
            trans.entity.addComp(cam);
        }

        let allTask: Promise<void>[] = [];
        if (node.mesh != null) {
            let task = ParseMeshNode.parse(node.mesh, gltf).then(primitives => {
                for (let item of primitives) {
                    let entity = new Entity("subPrimitive", ["Mesh"]);
                    let mesh = entity.getCompByName("Mesh") as Mesh;
                    mesh.geometry = item.geometry;
                    mesh.material = item.material;
                }
            });
            allTask.push(task);
        }

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                let nodeindex = node.children[i];
                let childTask = this.parse(nodeindex, gltf).then(child => {
                    trans.addChild(child);
                });
                allTask.push(childTask);
            }
        }
        return Promise.all(allTask).then(() => {
            return trans;
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
