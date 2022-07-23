import { ToyGL, HudSystem, Hud, Rect, vec3, vec2, loadImg, Prefab, quat } from "TOYGL";
import { GltfAsset } from "../../src/extends/glTF";

const { world, resource } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
let cam = world.addNewCamera();
const size = 5;
cam.entity.localPosition = vec3.fromValues(size, size, size);
cam.entity.lookAtPoint(vec3.create());

world.addSystem(new HudSystem(world, world.render.device.canvas, { style: { position: "absolute", top: "0", right: "0" } }));

const cesiumMan = "./glTF/CesiumMan/glTF/CesiumMan.gltf";
resource.load(cesiumMan)
    .then(asset => {
        const ins = (asset as GltfAsset).createInstance(world);
        ins.localRotation = quat.fromEuler(quat.create(), 0, -90, 0);
        world.addChild(ins);

        const child = world.addNewChild();
        const comp = child.addComponent(Hud);
        ins.addChild(child);
        child.localPosition[1] = 2;

        Promise.all(["./images/blood.png", "./images/girl.png"].map(item => loadImg(item)))
            .then(([bg, head]) => {
                comp.setContent(new Rect(0, 0, bg.width * 0.5, bg.height * 0.5), (context) => {
                    context.drawImage(bg, 0, 0, bg.width * 0.5, bg.height * 0.5);
                    context.drawImage(head, 45, 45, head.width * 2, head.height * 2);

                    context.fillStyle = "white";
                    context.font = "18px Georgia";
                    context.fillText("瓜皮小战士", 150, 62);

                    const x = 125; const y = 90; const w = 10; const h = 15;
                    context.fillStyle = "#03fde9";
                    for (let i = 0; i < 20; i++) {
                        context.rect(x + i * (w + 5), y, w, h);
                    }
                    context.fill();
                });
            });
        world.preUpdate.addEventListener((delta) => {
            ins.localRotation = quat.multiply(quat.create(), ins.localRotation, quat.fromEuler(quat.create(), 0, delta * 100, 0));
        });
    })
