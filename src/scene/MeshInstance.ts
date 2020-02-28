import { Material } from "./asset/Material";
import { Transform } from "../core/Transform";
import { EventHandler } from "../core/Event";
import { DrawCommand } from "./DrawCommand";
import { RenderLayerEnum } from "./RenderLayer";
import { Shader } from "./asset/Shader";
import { IgeometryAsset, GeometryAsset } from "./primitive/GeoemtryAsset";
import { AssetReference } from "./AssetReference";
import { VertexArray } from "../webgl/VertextArray";
import { BoundingBox, BoundingSphere } from "./Bounds";
import { CullingMask } from "./Camera";

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