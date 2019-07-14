import { ToyGL } from "../src/toygl";
import { Color } from "../src/mathD/color";
import { DefGeometry } from "../src/resources/defAssets/defGeometry";
import { DefMaterial } from "../src/resources/defAssets/defMaterial";
import { Mesh } from "../src/ec/entity";
import { Quat } from "../src/mathD/quat";
import { Vec3 } from "../src/mathD/vec3";
import { RenderTexture } from "../src/resources/assets/renderTexture";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { GlConstants } from "twebgl";
import { DefTextrue } from "../src/resources/defAssets/defTexture";
import { Resource } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";

export class DepthTexutreDemo {
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
        showCam.targetTexture = new RenderTexture({
            activeDepthAttachment: true,
            depthFormat: GlConstants.DEPTH_COMPONENT,
        });

        scene.preUpdate = delta => {
            rotObj.transform.worldRotation = Quat.multiply(
                Quat.AxisAngle(Vec3.UP, delta * 0.001),
                rotObj.transform.worldRotation,
                rotObj.transform.worldRotation,
            );
        };
        //----------------------------show scene
        let customeShader = Resource.load("../res/shader/depthTex.shader.json") as Shader;
        let quadMat = new Material({ name: "quadMat" });
        quadMat.shader = customeShader;
        quadMat.setTexture("_MainTex", showCam.targetTexture.depthTexture);
        // quadMat.setTexture("_MainTex", DefTextrue.GIRD);
        showCam.afterRender = () => {
            toy.render.renderQuad(quadMat);
        };
    }
}
