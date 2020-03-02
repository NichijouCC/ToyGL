import { Light } from "./Light";
import { Vec3 } from "../../mathD/vec3";

export class DirectionLight extends Light
{
    direction: Vec3 = Vec3.create();
}