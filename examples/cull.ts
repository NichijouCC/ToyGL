import { ToyGL } from "../src/toygl";
import { DefGeometry } from "../src/resources/defAssets/defGeometry";
import { Mesh, Entity } from "../src/ec/entity";
import { DefTextrue } from "../src/resources/defAssets/defTexture";
import { Vec3 } from "../src/mathD/vec3";
import { DefMaterial } from "../src/resources/defAssets/defMaterial";
import { Rect } from "../src/mathD/rect";
import { RenderMachine } from "../src/render/renderMachine";
import { ClearEnum } from "../src/ec/components/camera";
import { Debug } from "../src/debug/debug";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { Color } from "../src/mathD/color";

export class ShowCull {
    static done(toy: ToyGL) {
        let cam = toy.scene.addCamera(); //cull camera
        cam.entity.transform.localPosition = Vec3.create(0, 20, 0);
        cam.entity.transform.lookAtPoint(Vec3.ZERO);
        cam.viewport = Rect.create(0, 0, 0.5, 0.5);

        let observeCam = toy.scene.addCamera();
        observeCam.entity.beActive = false;
        observeCam.entity.transform.localPosition = Vec3.create(150, 150, 150);
        observeCam.entity.transform.lookAtPoint(Vec3.ZERO);
        observeCam.viewport = Rect.create(0, 0, 1.0, 1.0);
        observeCam.clearFlag = ClearEnum.COLOR | ClearEnum.DEPTH;

        cam.afterRender = (render, arr) => {
            arr.push(Debug.drawCameraWireframe(cam));
            render.drawCamera(observeCam, arr);
        };

        let geometry = DefGeometry.fromType("cube");
        let mat = DefMaterial.fromType("3dTex");
        mat.setTexture("_MainTex", DefTextrue.GIRD);

        let sideCount = 100 / 2;
        for (let i = -sideCount; i < sideCount; i++) {
            for (let j = -sideCount; j < sideCount; j++) {
                let obj = new Entity();
                let mesh = obj.addCompByName("Mesh") as Mesh;
                mesh.geometry = geometry;
                mesh.material = mat;
                obj.transform.localPosition = Vec3.create(i * 1.5, 0, j * 1.5);
                toy.scene.addEntity(obj);
            }
        }
        let obj = new Entity();
        let mesh = obj.addCompByName("Mesh") as Mesh;
        mesh.geometry = geometry;
        let whiteMat = new Material();
        whiteMat.shader = DefShader.fromType("3dTex");
        whiteMat.setTexture("_MainTex", DefTextrue.GIRD);
        whiteMat.setColor("MainColor", Color.create(1, 0, 0, 1));

        mesh.material = whiteMat;
        obj.transform.localPosition = Vec3.create(0, 0, 0);
        obj.transform.localScale = Vec3.create(150, 0.1, 150);
        toy.scene.addEntity(obj);

        let totalTime = 0;
        toy.scene.preUpdate = delta => {
            totalTime += delta * 0.01;
            cam.entity.transform.localPosition = Vec3.create(
                sideCount * 1.5 * Math.sin(totalTime / (sideCount * 1.5)),
                20,
                sideCount * 1.5 * Math.cos(totalTime / (sideCount * 1.5)),
            );
        };
    }
}
