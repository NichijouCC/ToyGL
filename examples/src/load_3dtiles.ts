import { DefaultGeometry, DefaultMaterial, glMatrix, Input, ManualCamera, mat4, Tiles3d, ToyGL, vec3 } from "TOYGL";
import { transformEnuToEcef, ws84ToEcef } from "../../src/extends/3dtiles/math";

window.onload = () => {
    const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    world.addSystem(new Tiles3d.TilesetSystem(world));

    const cam = world.addNewCamera();
    glMatrix.setMatrixArrayType(Float64Array as any);
    let loader = new Tiles3d.Loader();
    loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/jiugang_20220727/Production_2.json")
        .then(res => {
            let node = world.addNewChild();
            let comp = node.addComponent(Tiles3d.TilesetRender);
            comp.asset = res;
            cam.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));
            cam.entity.addComponent(ManualCamera);
        })
}