import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { Transform } from "../../core/Transform";

export class GltfAsset extends ToyAsset {
    constructor(param?: ItoyAsset) {
        super(param);
    }

    roots: Transform[];
    dispose(): void {}
}
