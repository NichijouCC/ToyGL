import { Input, ToyGL, KeyCodeEnum, MouseKeyEnum, DefaultMesh, DefaultGeometry, DefaultMaterial, mat4, vec3 } from "TOYGL";
import { initToy } from "./util";
const toy = initToy();
Input.mouse.on("mouseup", (ev) => {
    toy.scene.pick(Input.mouse.position);
    console.log(Input.mouse.position);
});
const node = toy.scene.mainCamera.node;
toy.scene.preUpdate.addEventListener(() => {
    if (Input.getKeyDown(KeyCodeEnum.A)) {
        node.localPosition[0] -= 0.01;
    }

    if (Input.getKeyDown(KeyCodeEnum.D)) {
        node.localPosition[0] += 0.01;
    }
});
