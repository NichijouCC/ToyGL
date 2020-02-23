import { Material } from "./asset/Material";
import { Transform } from "../core/Transform";
import { EventHandler } from "../core/Event";
import { DrawCommand } from "./DrawCommand";
import { RenderLayerEnum } from "./RenderLayer";
import { Shader } from "./asset/Shader";
import { IgeometryAsset, BaseGeometryAsset } from "./asset/BassGeoemtryAsset";
import { AssetReference } from "./AssetReference";
import { VertexArray } from "../webgl/VertextArray";

namespace Private
{
    export let id: number = 0;
}

export class MeshInstance extends DrawCommand
{

    readonly id: number;
    constructor()
    {
        super();
        this.id = Private.id++;

        this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });
        this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this) });
    }
    node: Transform;
    get worldMat() { return this.node?.worldMatrix }

    private geometryRef = new AssetReference<BaseGeometryAsset>();
    get geometry() { return this.geometryRef.asset }
    set geometry(value: BaseGeometryAsset) { this.geometryRef.asset = value; }
    get vertexArray(): VertexArray { return this.geometryRef.asset.vertexArray }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.asset; }
    set material(mat: Material) { this.materialRef.asset = mat; }

    dispose() { this.ondispose.raiseEvent(); };

    onDirty = new EventHandler<MeshInstance>();
    ondispose = new EventHandler<void>();
}