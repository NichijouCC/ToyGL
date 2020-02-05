import { IgltfJson } from "./loadglTF";
import { ParseNode } from "./parseNode";
import { Entity } from "../../framework/Entity";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { MeshInstance } from "../../scene/MeshInstance";

export class ParseSceneNode
{
    static parse(index: number, gltf: IgltfJson, context: GraphicsDevice): Promise<{ root: Entity, meshInstances: MeshInstance[] }>
    {
        let node = gltf.scenes[index];
        let meshInstances: MeshInstance[] = [];
        let entity = new Entity(node.name);
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
                entity.addChild(item.entity);
            });
            return { root: entity, meshInstances }
        })
    }
}
