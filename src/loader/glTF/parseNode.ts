
import { ParseMeshNode } from "./parseMeshNode";
import { IGltfJson } from "./loadGltf";
import { ParseSkinNode } from "./parseSkinNode";
import { StaticGeometry } from "../../index";
import { GltfNode, Mesh } from "./gltfAsset";

export class ParseNode {
    static parse(index: number, gltf: IGltfJson, root: GltfNode): Promise<GltfNode> {
        const node = gltf.nodes[index];
        const sceneNode = new GltfNode();
        sceneNode.raw = node;
        sceneNode.index = index;
        sceneNode.name = node.name || "node" + index;

        const allTask: Promise<void>[] = [];
        if (node.mesh != null) {
            const mesh = new Mesh();
            sceneNode.mesh = mesh;
            const task = ParseMeshNode.parse(node.mesh, gltf)
                .then(primitives => {
                    let subMeshes = primitives.map(item => item.geometry);
                    mesh.mesh = new StaticGeometry(subMeshes);
                    mesh.materials = primitives.map(item => item.material);
                });

            if (node.skin != null) {
                ParseSkinNode.parse(node.skin, root, gltf).then((skin) => {
                    mesh.skin = skin;
                });
            }
            allTask.push(task);
        }

        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const nodeIndex = node.children[i];
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
