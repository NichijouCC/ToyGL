import { Icomponent, Ientity, Ecs } from "../core/Ecs";
import { MeshInstance } from "../scene/primitive/MeshInstance";
import { Entity } from "../core/Entity";
import { AssetReferenceArray } from "../scene/AssetReferenceArray";
import { EventHandler } from "../core/Event";
import { AssetReference } from "../scene/AssetReference";
import { StaticMesh } from "../scene/asset/geometry/StaticMesh";
import { Material } from "../scene/asset/Material";
import { SkinInstance } from "../scene/primitive/SkinInstance";
import { Skin } from "../scene/asset/Skin";

@Ecs.registeComp
export class ModelComponent implements Icomponent {
    readonly entity: Entity;
    protected _mesh: AssetReference<StaticMesh> = new AssetReference();
    get mesh() { return this._mesh.asset };
    set mesh(asset: StaticMesh) { this._mesh.asset = asset };
    protected _materials: AssetReferenceArray<Material> = new AssetReferenceArray();
    set material(asset: Material) { this._materials.setValue(asset) };
    get material() { return this._materials.getValue().asset };

    get materials() { return this._materials.assets.map(item => item.asset) };
    set materials(mats: Material[]) { this._materials.setValues(mats); }

    protected _meshinstances: MeshInstance[] = [];
    get meshInstances() { return this._meshinstances }

    private _skin: AssetReference<Skin> = new AssetReference();
    set skin(skin: Skin) { this._skin.asset = skin };
    get skin() { return this._skin.asset }

    private _skinInstance: SkinInstance;
    get skinInstance() { return this._skinInstance };
    constructor() {
        this._materials.onAssetChange.addEventListener((event) => {
            let { newAsset, index } = event;
            let ins = this._meshinstances[index];
            if (ins == null && this.mesh?.sbuMeshs?.[index] && newAsset) {
                ins = this._meshinstances[index] = new MeshInstance();
                ins.node = this.entity;
                ins.geometry = this.mesh.sbuMeshs[index];
                ins.skin = this._skin.asset;
                this.onMeshinsCountChange.raiseEvent(this);
            }
            if (ins) { ins.material = newAsset; }
        });

        this._mesh.onAssetChange.addEventListener((event) => {
            let { newAsset, oldAsset } = event;
            for (let index = 0; index < this._meshinstances.length; index++) {
                let element = this._meshinstances[index];
                if (newAsset?.sbuMeshs[index] == null) {
                    element.dispose();
                    this._meshinstances[index] = null;
                } else {
                    element.geometry = newAsset?.sbuMeshs[index];
                }
            }
        });

        this._skin.onAssetChange.addEventListener((event) => {
            let { newAsset, oldAsset } = event;
            this._meshinstances.forEach(item => { item.skin = newAsset; })
        })
    }

    /**
     * meshInstance create Or Delect
     */
    onMeshinsCountChange = new EventHandler<ModelComponent>();

}