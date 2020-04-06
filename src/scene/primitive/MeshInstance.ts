import { CullingMask } from "../Camera";
import { AssetReference } from "../AssetReference";
import { Igeometry } from "../asset/geometry/BaseGeometry";
import { Material } from "../asset/Material";
import { EventHandler } from "../../core/Event";
import { Skin } from "../asset/Skin";
import { SkinInstance } from "./SkinInstance";
import { Entity } from "../../core/Entity";

// instance ondirty 触发 layercomposition 对instance 重新分层，重新sort

namespace Private {
    export let id: number = 0;
}

export class MeshInstance {
    readonly id: number;
    bevisible: boolean = true;
    enableCull: boolean = false;
    cullingMask?: CullingMask;
    zdist?: number;
    instanceCount?: number;
    constructor() {
        this.id = Private.id++;

        this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });
        this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });

        this.skinRef.onAssetChange.addEventListener((event) => {
            let { newAsset, oldAsset } = event;
            if (this._skinInstance) { this._skinInstance.destroy(); this._skinInstance = null; };
            if (newAsset) {
                this._skinInstance = new SkinInstance(newAsset, this.node);
            }
        })
    }
    node: Entity;
    get worldMat() { return this.node?.worldMatrix }

    private geometryRef = new AssetReference<Igeometry>();
    get geometry() { return this.geometryRef.asset }
    set geometry(value: Igeometry) { this.geometryRef.asset = value; this.onDirty.raiseEvent(this); }
    get bounding() { return this.geometryRef.asset.bounding; }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.asset; }
    set material(mat: Material) { this.materialRef.asset = mat; this.onDirty.raiseEvent(this); }

    private skinRef = new AssetReference<Skin>();
    set skin(skin: Skin) { this.skinRef.asset = skin; };
    get skin() { return this.skinRef.asset }

    private _skinInstance: SkinInstance;
    get skinInstance() { return this._skinInstance };

    dispose() { this.ondispose.raiseEvent(this); };

    onDirty = new EventHandler<MeshInstance>();
    ondispose = new EventHandler<MeshInstance>();
    beforeRender = new EventHandler<MeshInstance>();
}