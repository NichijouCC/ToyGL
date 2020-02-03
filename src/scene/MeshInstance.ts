import { Geometry } from "../core/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";

export class MeshInstance
{
    geometry: Geometry;
    material: Material;
    tranform: Transform;

}