import { vec3 } from "../../src";
import { ToyGL } from "../../src/toygl";

export function initToy() {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const cam = toy.scene.addNewCamera();

    let size = 100;
    cam.node.localPosition = vec3.fromValues(size, size, size);
    //cam.node.lookAtPoint(vec3.create());

    cam.lookAtPoint(vec3.create());
    // cam.node.localPosition[2] = 10;
    return toy;
}