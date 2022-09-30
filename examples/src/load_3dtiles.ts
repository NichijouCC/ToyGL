import { Color, DefaultMaterial, glMatrix, Input, mat4, MouseKeyEnum, Tiles3d, ToyGL, vec3 } from "TOYGL";
import { initGisCameraController } from "./3dtiles/gisCameraController";
import { GisLineRender } from "./3dtiles/gisLineRender";
glMatrix.setMatrixArrayType(Float64Array as any);

window.onload = () => {
    const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    let system = new Tiles3d.TilesetSystem(world);
    world.addSystem(system);

    const cam = world.addNewCamera();
    cam.far = 10000;
    let loader = new Tiles3d.Loader();

    loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/jiugang_20220727/Production_2.json")
        .then(res => {
            let node = world.addNewChild();
            let comp = node.addComponent(Tiles3d.TilesetRender);
            comp.asset = res;
            cam.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));
            initGisCameraController(world, system);
            let line = new GisLineRender({ system, origin: res.boundingVolume.center, gpsArr: [], clampToGround: true });

            world.preRender.addEventListener(ev => {
                line.render(ev);
            });

            Input.mouse.on("mousedown", (ev) => {
                if (ev.keyType == MouseKeyEnum.Left) {
                    let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
                    let pickPoint = system.rayTest(ray);
                    if (pickPoint) {
                        let first = pickPoint[0];
                        first.render.material.setUniform("MainColor", Color.random());
                        line.addPoint(pickPoint[0].point);
                    }
                }
            })
        })
}

