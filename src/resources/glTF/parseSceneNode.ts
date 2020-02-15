import { IgltfJson } from "./loadglTF";
import { ParseNode } from "./parseNode";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { MeshInstance } from "../../scene/MeshInstance";
import { Transform } from "../../scene/Transform";

export class ParseSceneNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<{ root: Transform, meshInstances: MeshInstance[] }>
    {
        let node = gltf.scenes[index];
        let meshInstances: MeshInstance[] = [];
        let root = new Transform(node.name);
        let rootNodes = node.nodes.map(item =>
        {
            return ParseNode.parse(item, gltf, context)
        });
        return Promise.all(rootNodes).then(element =>
        {
            element.forEach(item =>
            {
                item.instances.forEach(ins =>
                {
                    meshInstances.push(ins);
                })
                root.addChild(item.sceneNode);
            });
            return { root, meshInstances }
        })
    }
}
