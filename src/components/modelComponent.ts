import { Icomponent, Ientity, Ecs } from "../core/ecs";
import { MeshInstance } from "../scene/primitive/meshInstance";
import { Entity } from "../core/entity";
import { AssetReferenceArray } from "../scene/assetReferenceArray";
import { EventTarget } from "../core/eventTarget";
import { AssetReference } from "../scene/assetReference";
import { StaticMesh } from "../scene/asset/geometry/staticMesh";
import { Material } from "../scene/asset/material/material";
import { SkinInstance } from "../scene/primitive/skinInstance";
import { Skin } from "../scene/asset/Skin";
import { Irenderable } from "../scene/render/Irenderable";

@Ecs.registeComp
export class ModelComponent implements Icomponent {
    readonly entity: Entity;
    protected _mesh: AssetReference<StaticMesh> = new AssetReference();
    get mesh() { return this._mesh.current; };
    set mesh(asset: StaticMesh) { this._mesh.current = asset; };
    protected _materials: AssetReferenceArray<Material> = new AssetReferenceArray();
    set material(asset: Material) { this._materials.setValue(asset); };
    get material() { return this._materials.current[0]; };

    get materials() { return this._materials.current; };
    set materials(mats: Material[]) { this._materials.current = mats; }

    private _skin: AssetReference<Skin> = new AssetReference();
    set skin(skin: Skin) { this._skin.current = skin; };
    get skin() { return this._skin.current; }

    private _skinInstance: SkinInstance;
    get skinIns() { return this._skinInstance; };
    constructor() {
        // this._materials.onAssetChange.addEventListener((event) => {
        //     let { newAsset, index } = event;
        //     let ins = this._meshinstances[index];
        //     if (ins == null && this.mesh?.sbuMeshs?.[index] && newAsset) {
        //         ins = this._meshinstances[index] = new MeshInstance();
        //         ins.node = this.entity;
        //         ins.geometry = this.mesh.sbuMeshs[index];
        //         ins.skin = this._skin.asset;
        //         this.onMeshinsCountChange.raiseEvent(this);
        //     }
        //     if (ins) { ins.material = newAsset; }
        // });

        // this._mesh.onAssetChange.addEventListener((event) => {
        //     let { newAsset, oldAsset } = event;
        //     for (let index = 0; index < this._meshinstances.length; index++) {
        //         let element = this._meshinstances[index];
        //         if (newAsset?.sbuMeshs[index] == null) {
        //             element.dispose();
        //             this._meshinstances[index] = null;
        //         } else {
        //             element.geometry = newAsset?.sbuMeshs[index];
        //         }
        //     }
        // });

        this._skin.onDataChange.addEventListener((event) => {
            const { newData: newAsset, oldData: oldAsset } = event;
            if (this._skinInstance) { this._skinInstance.destroy(); this._skinInstance = null; };
            if (newAsset) {
                this._skinInstance = new SkinInstance(newAsset, this.entity);
            }
        });
    }

    /**
     * meshInstance create Or Delect
     */
    onMeshinsCountChange = new EventTarget<ModelComponent>();
}
