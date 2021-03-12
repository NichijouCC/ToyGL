import { Entity } from "../../entity";
import { StaticMesh } from "./staticMesh";

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
