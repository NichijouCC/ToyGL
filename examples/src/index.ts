import { LoadGltf } from "./loadGltf";
import { ToyGL, Input } from "TOYGL";
import { InputDemo } from "./input";
import { meshInsDemo } from "./meshIns";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    // LoadGltf.start(toy);
    // InputDemo.start(toy);

    meshInsDemo.start(toy);
};
