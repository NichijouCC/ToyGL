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

export class ShowCull {
    static done(toy: ToyGL) {
        let geometry = DefGeometry.fromType("cube");
        let mat = DefMaterial.fromType("baseTex");
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
        let cam = toy.scene.addCamera(); //cull camera
        cam.entity.transform.localPosition = Vec3.create(0, 20, 0);
        cam.entity.transform.lookAtPoint(Vec3.ZERO);
        cam.viewport = Rect.create(0, 0, 0.5, 0.5);

        let observeCam = toy.scene.addCamera();
        observeCam.entity.beActive = false;
        observeCam.entity.transform.localPosition = Vec3.create(40, 40, 40);
        observeCam.entity.transform.lookAtPoint(Vec3.ZERO);
        observeCam.viewport = Rect.create(0.5, 0.5, 0.5, 0.5);
        observeCam.clearFlag = ClearEnum.NONE;

        cam.afterRender = (render, arr) => {
            render.drawCamera(observeCam, arr);
        };

        toy.scene.preUpdate = delta => {};
    }
}
