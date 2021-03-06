import { Color } from "../../mathD/color";
import { Transform } from "../transform";

export class Light {
    node: Transform;
    intensity = 1;
    color = Color.create();
}
