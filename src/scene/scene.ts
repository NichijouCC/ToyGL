import { LayerComposition } from "./LayerComposition";
import { MeshInstance } from "./MeshInstance";
import { Render } from "./Render";
import { Camera } from "./Camera";
import { Entity } from "../core/Entity";
import { EventHandler } from "../core/Event";

export class InterScene
{
    layers: LayerComposition = new LayerComposition();

    tryAddMeshInstance(ins: MeshInstance)
    {
        this.layers.tryAddMeshInstance(ins);
    }
    removeMeshInstance(ins: MeshInstance)
    {
        this.layers.removeMeshInstance(ins);
    }
    private cameras: Map<string, Camera> = new Map();
    tryAddCamera(cam: Camera)
    {
        if (!this.cameras.has(cam.id))
        {
            this.cameras.set(cam.id, cam)
        }
    }
    preUpdate = new EventHandler<void>();
    frameUpdate()
    {
        this.preUpdate.raiseEvent();
        this.cameras.forEach(cam =>
        {
            this.layers.getlayers().forEach(layer =>
            {
                this.render.renderLayers(cam, layer)
            })
        })
    }

    private render: Render;
    constructor(render: Render)
    {
        this.render = render;
    }
    private root: Entity = new Entity();
    createChild(): Entity
    {
        let trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }
}