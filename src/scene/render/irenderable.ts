import { Material } from "../asset/material/material";
import { BoundingSphere } from "../bounds";
import { Igeometry } from "../asset/geometry/abstractGeometryAsset";
import { Mat4 } from "../../mathD/mat4";
import { SkinInstance } from "../primitive/skinInstance";
export interface Irenderable {
    bevisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Igeometry;
    worldMat: Mat4;
    bounding?: BoundingSphere;
    zdist?: number;
    skinIns?: SkinInstance;
}
