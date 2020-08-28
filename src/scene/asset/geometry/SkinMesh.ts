import { Entity } from "../../../core/Entity";
import { StaticMesh } from "./StaticMesh";

export interface Iskin {
    rootBone: Entity;
    bones: Entity[];
    inverseBindMatrices: Float32Array;
}

export class SkinMesh extends StaticMesh {
    inverseBindMatrices!: Float32Array;
    boneIds!: number[];
    rootBone!: Entity;
}
