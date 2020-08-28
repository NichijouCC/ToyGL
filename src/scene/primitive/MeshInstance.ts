import { CullingMask } from "../Camera";
import { AssetReference } from "../AssetReference";
import { Igeometry } from "../asset/geometry/BaseGeometry";
import { Material } from "../asset/material/Material";
import { EventTarget } from "../../core/EventTarget";
import { Skin } from "../asset/Skin";
import { SkinInstance } from "./SkinInstance";
import { Entity } from "../../core/Entity";
import { Irenderable } from "../render/Irenderable";

// instance ondirty 触发 layercomposition 对instance 重新分层，重新sort

export class MeshInstance implements Irenderable {
    static meshInstanceId: number = 0;

    readonly id: number;
    bevisible: boolean = true;
    enableCull: boolean = false;
    cullingMask?: CullingMask;
    zdist?: number;
    instanceCount?: number;
    constructor() {
        this.id = MeshInstance.meshInstanceId++;

        this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });
        this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });

        this.skinRef.onDataChange.addEventListener((event) => {
            const { newData: newAsset, oldData: oldAsset } = event;
            if (this._skinInstance) { this._skinInstance.destroy(); this._skinInstance = null; };
            if (newAsset) {
                this._skinInstance = new SkinInstance(newAsset, this.node);
            }
        });
    }

    node: Entity;
    get worldMat() { return this.node?.worldMatrix; }

    private geometryRef = new AssetReference<Igeometry>();
    get geometry() { return this.geometryRef.current; }
    set geometry(value: Igeometry) { this.geometryRef.current = value; this.onDirty.raiseEvent(this); }
    get bounding() { return this.geometryRef.current.bounding; }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.current; }
    set material(mat: Material) { this.materialRef.current = mat; this.onDirty.raiseEvent(this); }

    private skinRef = new AssetReference<Skin>();
    set skin(skin: Skin) { this.skinRef.current = skin; };
    get skin() { return this.skinRef.current; }

    private _skinInstance: SkinInstance;
    get skinInstance() { return this._skinInstance; };

    dispose() { this.ondispose.raiseEvent(this); };

    onDirty = new EventTarget<MeshInstance>();
    ondispose = new EventTarget<MeshInstance>();
    beforeRender = new EventTarget<MeshInstance>();
}
