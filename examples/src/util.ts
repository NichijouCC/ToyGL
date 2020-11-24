import { ToyGL } from "../../src/toygl";

export function initToy() {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const cam = toy.scene.addNewCamera();
    cam.node.localPosition.z = 10;
    return toy;
}