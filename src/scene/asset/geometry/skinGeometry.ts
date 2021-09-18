import { Entity } from "../../entity";
import { StaticGeometry } from "./staticGeometry";

export interface ISkin {
    rootBone: Entity;
    bones: Entity[];
    inverseBindMatrices: Float32Array;
}

export class SkinGeometry extends StaticGeometry {
    inverseBindMatrices!: Float32Array;
    boneIds!: number[];
    rootBone!: Entity;
}
