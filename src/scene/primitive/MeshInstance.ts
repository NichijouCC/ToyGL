import { CullingMask } from "../Camera";
import { AssetReference } from "../AssetReference";
import { GeometryAsset } from "../asset/geometry/GeoemtryAsset";
import { Material } from "../asset/Material";
import { EventHandler } from "../../core/Event";
import { Transform } from "../../core/Transform";

// instance ondirty 触发 layercomposition 对instance 重新分层，重新sort

namespace Private
{
    export let id: number = 0;
}

export class MeshInstance
{
    readonly id: number;
    bevisible: boolean = true;
    enableCull: boolean = false;
    cullingMask?: CullingMask;
    zdist?: number;
    instanceCount?: number;
    constructor()
    {
        this.id = Private.id++;

        this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });
        this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });
    }
    node: Transform;
    get worldMat() { return this.node?.worldMatrix }

    private geometryRef = new AssetReference<GeometryAsset>();
    get geometry() { return this.geometryRef.asset }
    set geometry(value: GeometryAsset) { this.geometryRef.asset = value; this.onDirty.raiseEvent(this); }
    get bounding() { return this.geometryRef.asset.bounding; }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.asset; }
    set material(mat: Material) { this.materialRef.asset = mat; this.onDirty.raiseEvent(this); }

    dispose() { this.ondispose.raiseEvent(this); };

    onDirty = new EventHandler<MeshInstance>();
    ondispose = new EventHandler<MeshInstance>();
}