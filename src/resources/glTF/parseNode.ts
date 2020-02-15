
import { Mat4 } from "../../mathD/mat4";
import { Vec3 } from "../../mathD/vec3";
import { Quat } from "../../mathD/quat";
import { ParseCameraNode } from "./parseCameraNode";
import { Transform } from "../../scene/Transform";
import { ParseMeshNode } from "./parseMeshNode";
import { IgltfJson } from "./loadglTF";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { MeshInstance } from "../../scene/MeshInstance";

export class ParseNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<{ sceneNode: Transform, instances: MeshInstance[] }>
    {
        let node = gltf.nodes[index];

        let name = node.name || "node" + index;
        let sceneNode = new Transform(name);
        let instances: MeshInstance[];

        if (node.matrix)
        {
            sceneNode.localMatrix = Mat4.fromArray(node.matrix);
        }
        if (node.translation)
        {
            Vec3.copy(node.translation, sceneNode.localPosition);
        }
        if (node.rotation)
        {
            Quat.copy(node.rotation, sceneNode.localRotation);
        }
        if (node.scale)
        {
            Vec3.copy(node.scale, sceneNode.localScale);
        }

        if (node.camera != null)
        {
            let cam = ParseCameraNode.parse(node.camera, gltf);
            cam.node = sceneNode;
        }

        let allTask: Promise<void>[] = [];
        if (node.mesh != null)
        {
            let task = ParseMeshNode.parse(node.mesh, gltf, context)
                .then(primitives =>
                {
                    instances = [];
                    for (let item of primitives)
                    {
                        let instance = new MeshInstance();
                        instance.mesh = item.mesh;
                        instance.material = item.material;
                        instance.node = sceneNode;
                        instances.push(instance);
                    }
                });
            allTask.push(task);
        }

        if (node.children)
        {
            for (let i = 0; i < node.children.length; i++)
            {
                let nodeindex = node.children[i];
                let childTask = this.parse(nodeindex, gltf, context)
                    .then(child =>
                    {
                        sceneNode.addChild(child.sceneNode);
                    });
                allTask.push(childTask);
            }
        }
        return Promise.all(allTask).then(() =>
        {
            return { sceneNode, instances };
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
