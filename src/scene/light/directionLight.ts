import { Light } from "./light";
import { vec3 } from "../../mathD";

export class DirectionLight extends Light {
    direction: vec3 = vec3.create();
}
