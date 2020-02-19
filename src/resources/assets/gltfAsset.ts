import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { Transform } from "../../scene/Transform";

export class GltfAsset extends ToyAsset
{
    constructor(param?: ItoyAsset)
    {
        super(param);
    }

    roots: Transform[];
    destroy(): void { }
}
