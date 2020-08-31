import { LoadGltf } from "./loadGltf";
import { ToyGL, Input } from "TOYGL";
import { InputTest } from "./input";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    // Base.start(toy);
    LoadGltf.start(toy);
    // AssetLoader.addLoader().then(()    // {
    //     // Base.done(toy);
    //     // LoadGltf.done(toy);
    //     // LookAt.done(toy);
    //     ShowCull.done(toy);
    //     // RenderTextureDome.done(toy);
    //     // DepthTexutreDemo.done(toy);
    //     // SSAO.done(toy);
    // });

    InputTest.start(toy);
};
