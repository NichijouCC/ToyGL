import { CullingMask } from "./camera";
import { Material } from "./asset/material/material";
import { VertexArray } from "../webgl/vertextArray";
import { BoundingSphere, BoundingBox } from "./bounds";
import { mat4 } from '../mathD';
import { Transform } from "../core/transform";

export abstract class DrawCommand {
    bevisible: boolean = true;
    cullingMask?: CullingMask;
    // material: Material;
    // vertexArray: VertexArray;
    enableCull: boolean = true;
    zdist?: number;
    instanceCount?: number;
    // boundingSphere: BoundingSphere;
    abstract get bounding(): BoundingSphere;
    // worldMat: mat4;

    abstract get material(): Material;
    abstract get vertexArray(): VertexArray;
    abstract get worldMat(): mat4;
}
