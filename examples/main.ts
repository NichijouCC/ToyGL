import { Texture } from "./../src/resources/assets/texture";
import { Transform } from "./../src/ec/components/transform";
import { ToyGL } from "../src/toygl";
import { DefGeometry } from "../src/resources/defGeometry";
import { DefShader } from "../src/resources/defShader";
import { Material } from "../src/resources/assets/material";
import { Entity } from "../src/ec/entity";
import { Mesh } from "../src/ec/components/mesh";
import { Color } from "../src/mathD/color";
import { Resource, AssetLoader } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";
import { Base } from "./bass";
import { LoadGltf } from "./loadGltf";

window.onload = () => {
    let toy = new ToyGL();
    toy.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);
    AssetLoader.addLoader().then(() => {
        // Base.done(toy);
        LoadGltf.done(toy);
    });
};
