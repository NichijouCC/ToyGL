import { Asset } from "./asset/Asset";
import { Entity } from "../core/Entity";
import { LayerComposition } from "./LayerComposition";
import { MeshInstance } from "./MeshInstance";

export class Scene extends Asset
{
    root: Entity;
    layers: LayerComposition = new LayerComposition();

    addMeshInstance(ins: MeshInstance)
    {
        this.layers.addMeshInstance(ins);
    }
    removeMeshInstance(ins: MeshInstance)
    {
        this.layers.removeMeshInstance(ins);
    }
}