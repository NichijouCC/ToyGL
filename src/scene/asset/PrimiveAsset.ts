import { AssetReference } from "../AssetReference";
import { BaseGeometryAsset } from "./BassGeoemtryAsset";
import { Material } from "./Material";
import { Asset } from "./Asset";

export class PrimiveAsset extends Asset
{
    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.asset; }
    set material(mat: Material) { this.materialRef.asset = mat; }

    private geometryRef = new AssetReference<BaseGeometryAsset>();
    get geometry() { return this.geometryRef.asset }
    set geometry(value: BaseGeometryAsset) { this.geometryRef.asset = value; }

    constructor(material: Material, gemometry: BaseGeometryAsset)
    {
        super();
        this.material = material;
        this.geometry = gemometry;
    }
}