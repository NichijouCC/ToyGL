import { Icomponent, Ientity } from "../Ecs";
import { ModelAsset } from "../../resources/assets/ModelAsset";

export class ModelComponent implements Icomponent
{
    entity: Ientity;
    model: ModelAsset;
}