import { Material } from "../asset/material/material";
import { BoundingSphere } from "../bounds";
import { Igeometry } from "../asset/geometry/abstractGeometryAsset";
import { mat4 } from "../../mathD";
import { SkinInstance } from "../primitive/skinInstance";
export interface Irenderable {
    bevisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Igeometry;
    worldMat: mat4;
    bounding?: BoundingSphere;
    zdist?: number;
    skinIns?: SkinInstance;
}
