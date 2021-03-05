import { Material } from "../asset/material/material";
import { BoundingBox } from "../bounds";
import { IGeometry } from "../asset/geometry/abstractGeometryAsset";
import { mat4 } from "../../mathD";
import { SkinInstance } from "../primitive/skinInstance";
export interface IRenderable {
    beVisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: IGeometry;
    worldMat: mat4;
    boundingBox?: BoundingBox;
    zDist?: number;
    skinIns?: SkinInstance;
}
