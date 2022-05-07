import { vec3 } from "../../src";
import { ToyGL } from "../../src/toygl";

export function initToy() {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const cam = toy.scene.addNewCamera();

    const size = 10;
    cam.entity.localPosition = vec3.fromValues(size, size, size);
    // cam.node.lookAtPoint(vec3.create());

    cam.entity.lookAtPoint(vec3.create());
    // cam.node.localPosition[2] = 10;
    return toy;
}
