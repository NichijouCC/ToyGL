import { ToyGL } from "../src/toygl";
import { DefGeometry } from "../src/resources/defAssets/defGeometry";
import { Mesh } from "../src/ec/entity";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { DefTextrue } from "../src/resources/defAssets/defTexture";
import { Quat } from "../src/mathD/quat";
import { Vec3 } from "../src/mathD/vec3";

export class LookAt {
    static done(toy: ToyGL) {
        let geometry = DefGeometry.fromType("cube");

        let centerEnity = toy.scene.newEntity("center", ["Mesh"]);
        let rotEntity = toy.scene.newEntity("center", ["Mesh"]);

        let mesh = centerEnity.getCompByName("Mesh") as Mesh;
        mesh.geometry = geometry;
        mesh.material = new Material();
        mesh.material.shader = DefShader.fromType("baseTex");
        mesh.material.setTexture("_MainTex", DefTextrue.GIRD);

        let rotMesh = rotEntity.getCompByName("Mesh") as Mesh;
        rotMesh.geometry = geometry;
        rotMesh.material = mesh.material;
        rotMesh.entity.transform.localScale.z = 3;

        let cam = toy.scene.addCamera();
        cam.entity.transform.localPosition = Vec3.create(0, 20, 0);
        cam.entity.transform.lookAtPoint(Vec3.ZERO);

        let rot = 0;
        toy.scene.preUpdate = delta => {
            rot += delta * 0.1;

            // cam.entity.transform.localRotation = Quat.FromEuler(-rot * 0.1, 0, 0);

            // cam.entity.transform.markDirty();

            rotEntity.transform.localPosition = Vec3.create(
                10 * Math.cos((rot * Math.PI) / 180),
                0,
                10 * Math.sin((rot * Math.PI) / 180),
            );
            rotEntity.transform.lookAtPoint(Vec3.ZERO);

            centerEnity.transform.lookAt(rotEntity.transform);
        };
    }
}
