import { IgltfJson } from "../LoadglTF";
import { ParseNode } from "./ParseNode";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { MeshInstance } from "../../../scene/primitive/MeshInstance";
import { Entity } from "../../../core/Entity";

export class ParseSceneNode {
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<Entity> {
        const node = gltf.scenes[index];
        const root = new Entity(`gltf-scene[${index}]-root`);
        return Promise.all(node.nodes.map(item => {
            return ParseNode.parse(item, gltf, root, context)
                .then(childNode => {
                    root.addChild(childNode);
                });
        })).then(() => root);
    }
}
