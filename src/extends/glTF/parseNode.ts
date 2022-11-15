
import { ParseMeshNode } from "./parseMeshNode";
import { IGltfJson } from "./loadGltf";
import { ParseSkinNode } from "./parseSkinNode";
import { mat4, quat, StaticGeometry, vec3 } from "../../index";
import { GltfNode, Mesh } from "./gltfAsset";

export class ParseNode {
    static parse(index: number, gltf: IGltfJson, root: GltfNode): Promise<GltfNode> {
        const nodeData = gltf.nodes[index];
        const sceneNode = new GltfNode();
        sceneNode.raw = nodeData;
        sceneNode.index = index;
        sceneNode.name = nodeData.name || "node" + index;

        if (nodeData.matrix) {
            sceneNode.matrix = mat4.fromArray(nodeData.matrix);
        } else {
            let translate = nodeData.translation ?? [0, 0, 0];
            let rotation = nodeData.rotation ?? [0, 0, 0];
            let scale = nodeData.scale ?? [1, 1, 1];
            sceneNode.matrix = mat4.fromRotationTranslationScale(
                mat4.create(),
                quat.fromEuler(quat.create(), rotation[0], rotation[1], rotation[2]),
                vec3.fromArray(translate),
                vec3.fromArray(scale)
            );
        }

        const allTask: Promise<void>[] = [];
        if (nodeData.mesh != null) {
            const mesh = new Mesh();
            sceneNode.mesh = mesh;
            const task = ParseMeshNode.parse(nodeData.mesh, gltf)
                .then(primitives => {
                    let subMeshes = primitives.map(item => item.geometry);
                    mesh.geometry = new StaticGeometry(subMeshes);
                    mesh.materials = primitives.map(item => item.material);
                });

            if (nodeData.skin != null) {
                ParseSkinNode.parse(nodeData.skin, root, gltf).then((skin) => {
                    mesh.skin = skin;
                });
            }
            allTask.push(task);
        }

        if (nodeData.children) {
            for (let i = 0; i < nodeData.children.length; i++) {
                const nodeIndex = nodeData.children[i];
                const childTask = this.parse(nodeIndex, gltf, root)
                    .then(child => { sceneNode.children.push(child) });
                allTask.push(childTask);
            }
        }
        return Promise.all(allTask)
            .then(() => {
                return sceneNode;
            }).catch(err => {
                console.error("ParseNode error", err);
                return Promise.reject(err);
            });
    }
}
