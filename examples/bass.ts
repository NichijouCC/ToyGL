import { DefGeometry } from "./../src/resources/defAssets/defGeometry";
import { DefTextrue } from "./../src/resources/defAssets/defTexture";

import { Resource } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";
import { Material } from "../src/resources/assets/material";
import { Color } from "../src/mathD/color";
import { Texture } from "../src/resources/assets/texture";
import { Entity, Mesh } from "../src/ec/entity";
import { ToyGL } from "../src/toygl";
import { DefShader } from "../src/resources/defAssets/defShader";
import { Quat } from "../src/mathD/quat";

export class Base {
    static done(toy: ToyGL) {
        let geometry = DefGeometry.fromType("quad");

        ///------------def shader
        let shader = DefShader.fromType("baseTex");
        //-------------custom shader
        let customeShader = Resource.load("../res/shader/base.shader.json") as Shader;

        let material = new Material();
        material.shader = shader;
        material.setColor("_MainColor", Color.create(1, 0, 0, 1));

        //-----------def tex
        let defTex = DefTextrue.GIRD;
        //-----------load tex
        let tex = Resource.load("../res/imgs/tes.png") as Texture;

        material.setTexture("_MainTex", tex);

        let obj = new Entity();
        let mesh = obj.addCompByName("Mesh") as Mesh;
        mesh.geometry = geometry;
        mesh.material = material;

        toy.scene.addEntity(obj);

        let camobj = new Entity("", ["Camera"]);
        let trans = camobj.transform;
        trans.localPosition.z = 5;
        // trans.localRotation = Quat.FromEuler(-90, 0, 0);
        trans.markDirty();
        toy.scene.addEntity(camobj);

        let roty = 0;
        toy.scene.preUpdate = delta => {
            roty += delta * 0.01;
            Quat.FromEuler(0, roty, 0, obj.transform.localRotation);
            obj.transform.markDirty();
        };
    }
}
