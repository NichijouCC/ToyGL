import { ToyGL } from "../src/toygl";
import { Base } from "./bass";

window.onload = () =>
{
    let toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    Base.start(toy);
    // AssetLoader.addLoader().then(()    // {
    //     // Base.done(toy);
    //     // LoadGltf.done(toy);
    //     // LookAt.done(toy);
    //     ShowCull.done(toy);
    //     // RenderTextureDome.done(toy);
    //     // DepthTexutreDemo.done(toy);
    //     // SSAO.done(toy);
    // });
};
