import { ToyGL } from "../src/toygl";
import { Resource, AssetLoader } from "../src/resources/resource";
import { LoadGltf } from "./loadGltf";
import { Base } from "./bass";

window.onload = () => {
    let toy = new ToyGL();
    toy.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);
    AssetLoader.addLoader().then(() => {
        // Base.done(toy);
        LoadGltf.done(toy);
    });
};
