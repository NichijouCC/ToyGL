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

window.onload = () => {
    let toy = new ToyGL();
    toy.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);
    AssetLoader.addLoader().then(() => {
        let geometry = DefGeometry.fromType("quad");

        ///------------def shader
        let shader = DefShader.fromType("color");
        //-------------custom shader
        let customeShader = Resource.load("../res/shader/base.shader.json") as Shader;

        let material = new Material();
        material.shader = customeShader;
        material.setColor("_MainColor", Color.create(1, 0, 0, 1));

        //-----------load tex
        let tex = Resource.load("../res/imgs/tes.png") as Texture;
        material.setTexture("_MainTex", tex);

        let obj = new Entity();
        let mesh = obj.addCompByName("Mesh") as Mesh;
        mesh.geometry = geometry;
        mesh.material = material;

        toy.scene.addEntity(obj);

        let camobj = new Entity("", ["Camera"]);
        let trans = camobj.getCompByName("Transform") as Transform;
        trans.localPosition.z = 5;
        trans.markDirty();
        toy.scene.addEntity(camobj);
    });
};
