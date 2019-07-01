import { DefGeometry } from "../src/resources/defGeometry";
import { DefShader } from "../src/resources/defShader";
import { Resource } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";
import { Material } from "../src/resources/assets/material";
import { Color } from "../src/mathD/color";
import { Texture } from "../src/resources/assets/texture";
import { Entity } from "../src/ec/entity";
import { Mesh, ToyGL } from "../src/toygl";
import { Transform } from "../src/ec/components/transform";

export class Base {
    static done(toy: ToyGL) {
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
    }
}
