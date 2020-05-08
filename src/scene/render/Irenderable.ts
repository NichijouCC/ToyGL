import { Material } from "../asset/material/Material";
import { BoundingSphere } from "../Bounds";
import { Igeometry } from "../asset/geometry/BaseGeometry";
import { Mat4 } from "../../mathD/mat4";
import { SkinInstance } from "../primitive/SkinInstance";
export interface Irenderable {
    bevisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Igeometry;
    worldMat: Mat4;
    bounding: BoundingSphere;
    zdist?: number;
    skinIns?: SkinInstance;
}
