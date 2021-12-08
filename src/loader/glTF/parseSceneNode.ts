import { IGltfJson } from "../loadGltf";
import { ParseNode } from "./parseNode";
import { Entity } from "../../scene/entity";
import { InterScene } from "../../scene/index";

export class ParseSceneNode {
    static parse(scene: InterScene, index: number, gltf: IGltfJson): Promise<Entity> {
        const node = gltf.scenes[index];
        const root = new Entity(scene, { name: `gltf-scene[${index}]-root` });
        return Promise.all(node.nodes.map(item => {
            return ParseNode.parse(scene, item, gltf, root)
                .then(childNode => {
                    root.addChild(childNode);
                });
        })).then(() => root);
    }
}
