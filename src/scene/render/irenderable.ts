import { Material } from "../asset/material/material";
import { BoundingBox } from "../bounds";
import { mat4 } from "../../mathD";
import { Geometry } from "./geometry";
import { MemoryTexture } from "./memoryTexture";
export interface IRenderable {
    beVisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Geometry;
    worldMat: mat4;
    boundingBox?: BoundingBox;
    skin?: {
        worldMat: mat4,
        boneMatrices: Float32Array | MemoryTexture,
    }
    zDist?: number;
}
