import { CullingMask } from "./camera";
import { Material } from "./asset/material/material";
import { VertexArray } from "../webgl/vertexArray";
import { BoundingSphere, BoundingBox } from "./bounds";
import { mat4 } from '../mathD';
import { Transform } from "../core/transform";

export abstract class DrawCommand {
    beVisible: boolean = true;
    cullingMask?: CullingMask;
    // material: Material;
    // vertexArray: VertexArray;
    enableCull: boolean = true;
    zDist?: number;
    instanceCount?: number;
    // boundingSphere: BoundingSphere;
    abstract get bounding(): BoundingSphere;
    // worldMat: mat4;

    abstract get material(): Material;
    abstract get vertexArray(): VertexArray;
    abstract get worldMat(): mat4;
}
