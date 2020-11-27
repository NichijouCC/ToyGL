import { Asset } from "./asset";
import { mat4 } from "../../mathD";

export class Skin extends Asset {
    inverseBindMatrices!: mat4[];
    boneNames!: string[];
    rootBoneName!: string;
    potentialSearchRoot?: string;

    // rootModelName: string;
    destroy(): void { }
}
