import { Color, DefaultMaterial, glMatrix, Input, mat4, MouseKeyEnum, Tiles3d, ToyGL, vec3 } from "TOYGL";
import { Billboard } from "./3dtiles/gisBillboard";
import { gisCameraController } from "./3dtiles/gisCameraController";
import { clampToGround, GisLineRender } from "./3dtiles/gisLineRender";
glMatrix.setMatrixArrayType(Float64Array as any);

window.onload = () => {
    const { world, timer } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    let system = new Tiles3d.TilesetSystem(world);
    world.addSystem(system);
    // timer.FPS = 30;
    const cam = world.addNewCamera();
    cam.far = 10000;
    let loader = new Tiles3d.Loader();

    loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/jiugang_20220727/Production_2.json")
        .then(res => {
            let node = world.addNewChild();
            let comp = node.addComponent(Tiles3d.TilesetRender);
            comp.asset = res;
            // cam.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));

            let camController = new gisCameraController(world, system);
            camController.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));

            let line = new GisLineRender({ origin: res.boundingVolume.center, gpsArr: [] });
            world.preRender.addEventListener(ev => {
                line.render(ev);
            });

            fetch("./2022_11_09_14_09_21.json").then(data => data.json()).then((data => {
                let gpsArr = data.waypoints.map((el: any) => {
                    let gps = vec3.fromValues(el.longitude, el.latitude, el.altitude);
                    let worldPos = Tiles3d.ws84ToEcef(gps, vec3.create()) as vec3;
                    return clampToGround(system, worldPos).then(pos => Tiles3d.ecefToWs84(pos, vec3.create()) as vec3)
                });

                Promise.all(gpsArr)
                    .then(result => {
                        let line = new GisLineRender({ origin: res.boundingVolume.center, gpsArr: result });
                        world.preRender.addEventListener(ev => {
                            line.render(ev);
                        });
                    })
            }));

            clampToGround(system, Tiles3d.ws84ToEcef([97.83289269, 39.62254737, 3410.641], vec3.create()) as any).then(pos => {
                let mark = new Billboard("./images/girl.png", pos);
                world.preRender.addEventListener(ev => {
                    mark.render(ev, world.mainCamera.entity);
                });
            })

            Input.mouse.on("mousedown", (ev) => {
                if (ev.keyType == MouseKeyEnum.Left) {
                    let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
                    let pickPoint = system.rayTest(ray);
                    if (pickPoint) {
                        let first = pickPoint[0];
                        console.log(pickPoint, first);
                        first.render.material.setUniform("MainColor", Color.random());
                        let gps = Tiles3d.ecefToWs84(first.point, vec3.create()) as vec3;
                        line.addGpsPoint(gps);
                    }
                }
            })
        })
}

