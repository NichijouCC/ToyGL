import { Icomponent, Ientity } from "../core/Ecs";
import { IgeometryAsset } from "../scene/asset/BassGeoemtryAsset";
import { Material } from "../scene/asset/Material";

export class ModelComponent implements Icomponent
{
    entity: Ientity;
    geometry: IgeometryAsset[] = [];
    material: Material[] = [];
}