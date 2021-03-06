import { ECS } from "../core/ecs/ecs";
import { AssetReferenceArray } from "../scene/assetReferenceArray";
import { AssetReference } from "../scene/assetReference";
import { StaticMesh } from "../scene/asset/geometry/staticMesh";
import { Material } from "../scene/asset/material/material";
import { SkinInstance } from "../scene/primitive/skinInstance";
import { Skin } from "../scene/asset/Skin";
import { Component, Entity } from "../scene";

@ECS.registerComp
export class ModelComponent extends Component {

    protected _mesh = new AssetReference<StaticMesh>();
    get mesh() { return this._mesh.current; };
    set mesh(asset: StaticMesh) { this._mesh.current = asset; };
    protected _materials = new AssetReferenceArray<Material>();
    set material(asset: Material) { this._materials.setValue(asset); };
    get material() { return this._materials.current[0]; };

    get materials() { return this._materials.current; };
    set materials(mats: Material[]) { this._materials.current = mats; }

    private _skin = new AssetReference<Skin>();
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
                this._skinInstance = new SkinInstance(newAsset, () => this.entity);
            }
        });
    }

    clone(): ModelComponent {
        let comp = ModelComponent.create();
        comp.mesh = this.mesh;
        comp.materials = this.materials;
        comp.skin = this.skin;
        return comp;
    }
}
