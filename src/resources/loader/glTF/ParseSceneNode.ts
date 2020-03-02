import { IgltfJson } from "../LoadglTF";
import { ParseNode } from "./ParseNode";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { MeshInstance } from "../../../scene/primitive/MeshInstance";
import { Entity } from "../../../core/Entity";

export class ParseSceneNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<Entity>
    {
        let node = gltf.scenes[index];
        let root = new Entity(node.name);
        let rootNodes = node.nodes.map(item =>
        {
            return ParseNode.parse(item, gltf, context)
        });
        return Promise.all(rootNodes).then(element =>
        {
            element.forEach(item =>
            {
                root.addChild(item);
            });
            return root
        })
    }
}
