import { Icomponent, Ientity, Ecs } from "../core/Ecs";
import { MeshInstance } from "../scene/MeshInstance";
import { Entity } from "../core/Entity";
import { AssetReferenceArray } from "../scene/AssetReferenceArray";
import { PrimiveAsset } from "../scene/asset/PrimiveAsset";
import { EventHandler } from "../core/Event";

@Ecs.registeComp
export class ModelComponent implements Icomponent
{
    entity: Entity;
    primitives: AssetReferenceArray<PrimiveAsset> = new AssetReferenceArray();
    private meshinstances: MeshInstance[] = [];
    get meshInstances() { return this.meshinstances }
    constructor()
    {
        this.primitives.onAssetChange.addEventListener((event) =>
        {
            let { newAsset, index } = event
            let ins = this.meshinstances[index];
            if (ins == null)
            {
                ins = this.meshinstances[index] = new MeshInstance();
                this.onDirty.raiseEvent(this);
            }
            ins.geometry = newAsset.geometry;
            ins.material = newAsset.material;
        });
        this.primitives.onItemDelect.addEventListener((index) =>
        {
            this.meshinstances[index].dispose();
        })
    }
    onDirty = new EventHandler<ModelComponent>();
}