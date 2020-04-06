import { Asset } from "./Asset";

export class Skin extends Asset {
    inverseBindMatrices!: Float32Array;
    boneNames!: string[];
    rootBoneName!: string;

    rootModelName: string;
    destroy(): void { }
}