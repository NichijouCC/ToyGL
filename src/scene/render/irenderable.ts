import { Material } from "../asset/material/material";
import { BoundingBox } from "../bounds";
import { Igeometry } from "../asset/geometry/abstractGeometryAsset";
import { mat4 } from "../../mathD";
import { SkinInstance } from "../primitive/skinInstance";
export interface Irenderable {
    beVisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Igeometry;
    worldMat: mat4;
    boundingBox?: BoundingBox;
    zDist?: number;
    skinIns?: SkinInstance;
}
