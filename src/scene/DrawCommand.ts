import { CullingMask } from "./Camera";
import { Material } from "./asset/Material";
import { VertexArray } from "../webgl/VertextArray";
import { BoundingSphere, BoundingBox } from "./Bounds";
import { Mat4 } from "../mathD/mat4";
import { Transform } from "../core/Transform";

export abstract class DrawCommand
{
    bevisible: boolean = true;
    cullingMask?: CullingMask;
    // material: Material;
    // vertexArray: VertexArray;
    enableCull: boolean = true;
    // boundingSphere: BoundingSphere;
    boundingBox: BoundingBox;
    // worldMat: Mat4;
    zdist?: number;
    instanceCount?: number;

    abstract get material(): Material;
    abstract get vertexArray(): VertexArray;
    abstract get worldMat(): Mat4;
}


// export interface IdrawCommand
// {
//     bevisible: boolean;
//     enableCull: boolean;
//     cullingMask?: CullingMask;
//     material: Material;
//     vertexArray: VertexArray;
//     // boundingSphere: BoundingSphere;
//     boundingBox: BoundingBox;
//     worldMat: Mat4;
//     zdist?: number;
//     instanceCount?: number;
// }