import { IGltfJson } from "../loadGltf";
import { ParseNode } from "./parseNode";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { Entity } from "../../../scene/entity";

export class ParseSceneNode {
    static parse(index: number, gltf: IGltfJson, context: GraphicsDevice): Promise<Entity> {
        const node = gltf.scenes[index];
        const root = new Entity({ name: `gltf-scene[${index}]-root` });
        return Promise.all(node.nodes.map(item => {
            return ParseNode.parse(item, gltf, root, context)
                .then(childNode => {
                    root.addChild(childNode);
                });
        })).then(() => root);
    }
}
