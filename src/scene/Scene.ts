import { Camera } from "./Camera";
import { MeshInstance, Mesh } from "./MeshInstance";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { Entity } from "../framework/Entity";

export class Scene
{
    private root: Entity = new Entity();

    private mesh: Mesh[] = [];
    addEntity(entity: Entity)
    {
        entity.refScene = this;
        this.root.addChild(entity);
    }

    render(context: GraphicsDevice, camera: Camera)
    {

    }
}