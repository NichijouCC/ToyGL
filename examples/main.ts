import { ToyGL } from "../src/toygl";
import { Resource, AssetLoader } from "../src/resources/resource";
import { LoadGltf } from "./loadGltf";
import { Base } from "./bass";
import { LookAt } from "./lookat";
import { ShowCull } from "./cull";
import { RenderTextureDome } from "./renderTexture";
import { DepthTexutreDemo } from "./depthTexture";
import { SSAO } from "./ssao";

window.onload = () => {
    let toy = ToyGL.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);
    AssetLoader.addLoader().then(() => {
        // Base.done(toy);
        // LoadGltf.done(toy);
        // LookAt.done(toy);
        // ShowCull.done(toy);
        // RenderTextureDome.done(toy);
        // DepthTexutreDemo.done(toy);
        SSAO.done(toy);
    });
};
