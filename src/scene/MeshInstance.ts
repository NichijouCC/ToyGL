import { Geometry } from "./primitive/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";
import { VertexArray } from "../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";
import { StaticMesh } from "./mesh/StaticMesh";
import { Mat4 } from "../mathD/mat4";

export class MeshInstance
{
    mesh: StaticMesh;
    node: Transform;
    material: Material;
}