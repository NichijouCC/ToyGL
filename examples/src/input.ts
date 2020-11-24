import { Input, ToyGL, KeyCodeEnum, MouseKeyEnum, DefaultMesh, DefaultGeometry, DefaultMaterial, Mat4, Vec3 } from "TOYGL";
import { initToy } from "./util";

const toy = initToy();
const { scene, input } = toy;
const ins = scene.addRenderIns({
    geometry: DefaultGeometry.cube,
    material: DefaultMaterial.color_3d,
    worldMat: Mat4.IDENTITY
});

let rotDir = Vec3.randomDir();
setInterval(() => {
    rotDir = Vec3.randomDir();
}, 5000);

scene.preupdate.addEventListener(() => {
    if (input.getKeyDown(KeyCodeEnum.A)) {
        ins.worldMat = Mat4.translate(ins.worldMat, new Vec3(-1, 0, 0));
    }

    if (input.getKeyDown(KeyCodeEnum.D)) {
        ins.worldMat = Mat4.translate(ins.worldMat, new Vec3(1, 0, 0));
    }

    if (input.getMouseDown(MouseKeyEnum.Left)) {
        ins.worldMat = Mat4.rotate(ins.worldMat, 0.05, rotDir);
    }

    if (input.getKeyDown(KeyCodeEnum.R)) {
        ins.worldMat = Mat4.IDENTITY;
    }
});