import { Geometry } from "../core/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";
import { VertexArray } from "../webgl/VertextArray";
import { ModeTypeEnum } from "../webgl/GraphicsDevice";

export class MeshInstance
{
    mesh: Mesh;
    node: Transform;
    material: Material;
}

export class Mesh implements IDrawData
{
    vertexArray: VertexArray;
    mode: ModeTypeEnum;
    count: number;
    offset: number;
}

export interface IDrawData
{
    mode: ModeTypeEnum;
    count: number;
    offset: number;
}