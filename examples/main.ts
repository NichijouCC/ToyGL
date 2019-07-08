import { ToyGL } from "../src/toygl";
import { Resource, AssetLoader } from "../src/resources/resource";
import { LoadGltf } from "./loadGltf";
import { Base } from "./bass";
import { LookAt } from "./lookat";
import { ShowCull } from "./cull";

window.onload = () => {
    let toy = ToyGL.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);
    AssetLoader.addLoader().then(() => {
        // Base.done(toy);
        // LoadGltf.done(toy);
        // LookAt.done(toy);
        ShowCull.done(toy);
    });
};
