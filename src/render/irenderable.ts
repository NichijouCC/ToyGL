import { Material } from "./material";
import { BoundingBox } from "../scene/bounds";
import { mat4 } from "../mathD";
import { Geometry } from "./geometry";
import { MemoryTexture } from "./memoryTexture";
import { InstancedGeometryAttribute } from "./instancedGeometryAttribute";
export interface IRenderable {
    beVisible?: boolean;
    /**
     * 和相机cullMask配合剔除元素
     */
    layerMask?: number;
    /**
     * 用于调整绘制顺序
     */
    sortOrder?: number;
    /**
     * 是否裁剪,默认false
     */
    enableCull?: boolean;
    instanceCount?: number;
    geometry: Geometry;
    material: Material;
    worldMat: mat4;
    boundingBox?: BoundingBox;
    skin?: {
        worldMat: mat4,
        boneMatrices: Float32Array | MemoryTexture,
    };
    instanceData?: {
        count: number,
        attributes: InstancedGeometryAttribute[],
    }
    children?: Omit<IRenderable, "beVisible" | "enableCull" | "sortOrder" | "boundingBox" | "layerMask">[];
}
