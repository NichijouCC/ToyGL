import { Color } from "../../mathD/color";
import { Transform } from "../../core/transform";

export class Light {
    node: Transform;
    intensity = 1;
    color = Color.create();
}
