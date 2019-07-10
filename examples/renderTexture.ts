import { ToyGL } from "../src/toygl";
import { DefGeometry } from "../src/resources/defAssets/defGeometry";
import { DefMaterial } from "../src/resources/defAssets/defMaterial";
import { Mesh } from "../src/ec/entity";
import { Quat } from "../src/mathD/quat";
import { Vec3 } from "../src/mathD/vec3";
import { Scene } from "../src/scene/scene";
import { RenderTexture } from "../src/resources/assets/renderTexture";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { DefTextrue } from "../src/resources/defAssets/defTexture";
import { Color } from "../src/mathD/color";

export class RenderTextureDome {
    static done(toy: ToyGL) {
        //---------------------------rendertexture scene
        let scene = toy.createScene(-1);
        let showCam = scene.addCamera();
        showCam.backgroundColor = Color.create(1, 0.5, 1, 1);
        let geometry = DefGeometry.fromType("cube");
        let mat = DefMaterial.fromType("baseTex");

        let rotObj = scene.newEntity("rotObj", ["Mesh"]);
        let meshcomp = rotObj.getCompByName("Mesh") as Mesh;
        meshcomp.geometry = geometry;
        meshcomp.material = mat;

        rotObj.transform.localRotation = Quat.fromToRotation(Vec3.create(1, 1, 1), Vec3.UP);
        showCam.entity.transform.localPosition = Vec3.create(0, 0, 4);
        showCam.targetTexture = new RenderTexture();

        scene.preUpdate = delta => {
            rotObj.transform.worldRotation = Quat.multiply(
                Quat.AxisAngle(Vec3.UP, delta * 0.01),
                rotObj.transform.worldRotation,
                rotObj.transform.worldRotation,
            );
        };
        //----------------------------show scene
        let showObj = toy.scene.newEntity("showObj", ["Mesh"]);
        let showMesh = showObj.getCompByName("Mesh") as Mesh;
        showMesh.geometry = geometry;
        showMesh.material = new Material();
        showMesh.material.shader = DefShader.fromType("baseTex");
        showMesh.material.setTexture("_MainTex", showCam.targetTexture);

        let cam = toy.scene.addCamera();

        cam.entity.transform.localPosition = Vec3.create(0, 0, 3);

        toy.scene.preUpdate = delta => {
            showObj.transform.localRotation = Quat.multiply(
                Quat.AxisAngle(Vec3.UP, delta * 0.001),
                showObj.transform.localRotation,
                showObj.transform.localRotation,
            );
        };
    }
}
