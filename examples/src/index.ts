import { LoadGltf } from "./loadGltf";
import { ToyGL, Input } from "TOYGL";
import { InputDemo } from "./input";
import { MeshInsDemo } from "./meshIns";
import { HudDemo } from "./hud";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

    const cam = toy.scene.addNewCamera();
    cam.node.localPosition.z = 10;


    // LoadGltf.start(toy);
    // InputDemo.start(toy);
    // MeshInsDemo.start(toy);
    HudDemo.start(toy);
};
