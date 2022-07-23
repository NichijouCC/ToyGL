import { GltfNode } from "./gltfAsset";
import { IGltfJson } from "./loadGltf";
import { ParseNode } from "./parseNode";

export class ParseSceneNode {
    static parse(index: number, gltf: IGltfJson): Promise<GltfNode> {
        const node = gltf.scenes[index];
        let root = new GltfNode();
        root.name = `scene[${index}]-root`
        return Promise.all(node.nodes.map(item => ParseNode.parse(item, gltf, root).then((child) => root.children.push(child)))).then(() => root);
    }
}
