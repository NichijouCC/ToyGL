import { Icomponent, Ientity } from "../core/Ecs";
import { MeshInstance } from "../scene/MeshInstance";
import { Entity } from "../core/Entity";
import { AssetReferenceArray } from "../scene/AssetReferenceArray";
import { PrimiveAsset } from "../scene/asset/PrimiveAsset";

export class ModelComponent implements Icomponent
{
    entity: Entity;
    primitives: AssetReferenceArray<PrimiveAsset> = new AssetReferenceArray();
    private meshinstances: MeshInstance[] = [];

    constructor()
    {
        this.primitives.onAssetChange.addEventListener((event) =>
        {
            let { newAsset, index } = event
            let ins = this.meshinstances[index];
            if (ins == null)
            {
                ins = this.meshinstances[index] = new MeshInstance();
            }
            ins.geometry = newAsset.geometry;
            ins.material = newAsset.material;
        })
    }
}