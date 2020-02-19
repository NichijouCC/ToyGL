import { CullingMask } from "./Camera";
import { Material } from "./asset/Material";
import { VertexArray } from "../webgl/VertextArray";
import { BoundingSphere, BoundingBox } from "./Bounds";
import { Mat4 } from "../mathD/mat4";
import { Transform } from "./Transform";

export class DrawCommand
{
    cullingMask?: CullingMask;
    material: Material;
    vertexArray: VertexArray;
    enableCull: boolean = true;
    // boundingSphere: BoundingSphere;
    boundingBox: BoundingBox;
    worldMat: Mat4;
    zdist?: number;
    instanceCount?: number;
    static from(vertexArray: VertexArray, material: Material, node: Transform)
    {
        let newcommnad = new DrawCommand();
        newcommnad.material = material;
        newcommnad.vertexArray = vertexArray;
        newcommnad.worldMat = node.worldMatrix;
    }
}