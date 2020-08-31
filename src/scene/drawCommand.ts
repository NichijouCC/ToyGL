import { CullingMask } from "./camera";
import { Material } from "./asset/material/material";
import { VertexArray } from "../webgl/vertextArray";
import { BoundingSphere, BoundingBox } from "./bounds";
import { Mat4 } from "../mathD/mat4";
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
    // worldMat: Mat4;

    abstract get material(): Material;
    abstract get vertexArray(): VertexArray;
    abstract get worldMat(): Mat4;
}
