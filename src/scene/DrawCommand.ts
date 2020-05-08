import { CullingMask } from "./Camera";
import { Material } from "./asset/material/Material";
import { VertexArray } from "../webgl/VertextArray";
import { BoundingSphere, BoundingBox } from "./Bounds";
import { Mat4 } from "../mathD/mat4";
import { Transform } from "../core/Transform";

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
