import { Material } from "./material";
import { BoundingBox } from "../scene/bounds";
import { mat4 } from "../mathD";
import { Geometry } from "./geometry";
import { MemoryTexture } from "./memoryTexture";
export interface IRenderable {
    beVisible?: boolean;
    layerMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    /**
     * 用于调整绘制顺序
     */
    sortOrder?: number;
    geometry: Geometry;
    worldMat: mat4;
    boundingBox?: BoundingBox;
    skin?: {
        worldMat: mat4,
        boneMatrices: Float32Array | MemoryTexture,
    }
    zDist?: number;
}
