import { Icomponent } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { AssetReference } from "../scene/AssetReference";
import { Material } from "../scene/asset/Material";
import { GeometryAsset } from "../scene/asset/geometry/GeoemtryAsset";
import { SkinMesh } from "../scene/asset/geometry/SkinMesh";

export class SkinModelComponent implements Icomponent {
    readonly entity: Entity;
    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.asset; }
    set material(mat: Material) { this.materialRef.asset = mat; }

    private geometryRef = new AssetReference<SkinMesh>();
    get geometry() { return this.geometryRef.asset }
    set geometry(value: SkinMesh) { this.geometryRef.asset = value; }
}