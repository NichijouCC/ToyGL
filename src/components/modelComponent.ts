import { Icomponent, Ientity, Ecs } from "../core/ecs";
import { Entity } from "../core/entity";
import { AssetReferenceArray } from "../scene/assetReferenceArray";
import { AssetReference } from "../scene/assetReference";
import { StaticMesh } from "../scene/asset/geometry/staticMesh";
import { Material } from "../scene/asset/material/material";
import { SkinInstance } from "../scene/primitive/skinInstance";
import { Skin } from "../scene/asset/Skin";
import { AbstractComponent } from "./abstractComponent";

@Ecs.registeComp
export class ModelComponent extends AbstractComponent {
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
        super();
        this._skin.onDataChange.addEventListener((event) => {
            const { newData: newAsset, oldData: oldAsset } = event;
            if (this._skinInstance) { this._skinInstance.destroy(); this._skinInstance = null; };
            if (newAsset) {
                this._skinInstance = new SkinInstance(newAsset, this.entity);
            }
        });
    }
}
