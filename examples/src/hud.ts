import { ToyGL, HudSystem, Hud, Rect, vec3, vec2, loadImg, Prefab, quat } from "TOYGL";
import { initToy } from "./util";

(async function () {
    const toy = initToy();
    let { scene, canvas } = toy;
    toy.addSystem(new HudSystem(scene, canvas, { style: { position: "absolute", top: "0", right: "0" } }));

    const cesiumMan = "../resources/glTF/CesiumMan/glTF/CesiumMan.gltf";
    let asset = await toy.resource.load(cesiumMan);
    const newasset = Prefab.instance(asset as Prefab);
    newasset.localRotation = quat.fromEuler(quat.create(), 0, -90, 0);
    toy.scene.addChild(newasset);

    let child = scene.addNewChild();
    let comp = child.addComponent(Hud);
    newasset.addChild(child);
    child.localPosition[1] = 2;

    Promise.all(["./images/blood.png", "./images/girl.png"].map(item => loadImg(item)))
        .then(([bg, head]) => {
            comp.setContent(new Rect(0, 0, bg.width * 0.5, bg.height * 0.5), (context) => {
                context.drawImage(bg, 0, 0, bg.width * 0.5, bg.height * 0.5);
                context.drawImage(head, 45, 45, head.width * 2, head.height * 2);

                context.fillStyle = "white";
                context.font = "18px Georgia";
                context.fillText("瓜皮小战士", 150, 62);

                const x = 125, y = 90, w = 10, h = 15;
                context.fillStyle = '#03fde9';
                for (let i = 0; i < 20; i++) {
                    context.rect(x + i * (w + 5), y, w, h);
                }
                context.fill();
            });
        })
    scene.preUpdate.addEventListener((delta) => {
        newasset.localRotation = quat.multiply(quat.create(), newasset.localRotation, quat.fromEuler(quat.create(), 0, delta * 100, 0));
    })
})()
