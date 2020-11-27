import { Input, ToyGL, KeyCodeEnum, MouseKeyEnum, DefaultMesh, DefaultGeometry, DefaultMaterial, mat4, vec3 } from "TOYGL";
import { initToy } from "./util";

const toy = initToy();
const { scene, input } = toy;
const ins = scene._addRenderIns({
    geometry: DefaultGeometry.cube,
    material: DefaultMaterial.color_3d,
    worldMat: mat4.create()
});

let rotDir = vec3.random(vec3.create());
rotDir = vec3.normalize(rotDir, rotDir);
setInterval(() => {
    rotDir = vec3.random(vec3.create());
    rotDir = vec3.normalize(rotDir, rotDir);
}, 5000);

scene.preupdate.addEventListener(() => {
    if (input.getKeyDown(KeyCodeEnum.A)) {
        ins.worldMat = mat4.fromTranslation(ins.worldMat, vec3.fromValues(-1, 0, 0));
    }

    if (input.getKeyDown(KeyCodeEnum.D)) {
        ins.worldMat = mat4.fromTranslation(ins.worldMat, vec3.fromValues(1, 0, 0));
    }

    if (input.getMouseDown(MouseKeyEnum.Left)) {
        ins.worldMat = mat4.fromRotation(ins.worldMat, 0.05, rotDir);
    }

    if (input.getKeyDown(KeyCodeEnum.R)) {
        ins.worldMat = mat4.create();
    }
});