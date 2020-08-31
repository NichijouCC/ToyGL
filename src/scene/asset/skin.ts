import { Asset } from "./asset";
import { Mat4 } from "../../mathD/mat4";

export class Skin extends Asset {
    inverseBindMatrices!: Mat4[];
    boneNames!: string[];
    rootBoneName!: string;
    potentialSearchRoot?: string;

    // rootModelName: string;
    destroy(): void { }
}
