import { IgltfJson } from "./loadglTF";
import { ParseNode } from "./parseNode";
import { Transform } from "../../ec/transform";

export class ParseSceneNode {
    static parse(index: number, gltf: IgltfJson): Promise<Transform[]> {
        let node = gltf.scenes[index];
        let rootNodes = node.nodes.map(item => {
            return ParseNode.parse(item, gltf);
        });
        return Promise.all(rootNodes);
    }
}
