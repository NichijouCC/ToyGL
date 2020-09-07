import { ToyGL, HudSystem, Hud, Rect, Vec3, Vec2, loadImg, Prefab, Quat } from "TOYGL";

export class HudDemo {
    static async start(toy: ToyGL) {
        let { scene, canvas } = toy;
        toy.addSystem(new HudSystem(scene, canvas, { style: { position: "absolute", top: "0", right: "0" } }));

        const cesiumMan = "../resources/glTF/CesiumMan/glTF/CesiumMan.gltf";
        let asset = await toy.resource.load(cesiumMan);
        const newasset = Prefab.instance(asset as Prefab);
        newasset.localRotation = Quat.FromEuler(0, -90, 0);
        toy.scene.addChild(newasset);

        let child = scene.addNewChild();
        let comp = child.addComponent<Hud>(Hud.name);
        newasset.addChild(child);
        child.localPosition.y = 2;

        Promise.all(["./images/blood.png", "./images/girl.png"].map(item => loadImg(item)))
            .then(([bg, head]) => {
                comp.setcontent(new Rect(0, 0, bg.width * 0.5, bg.height * 0.5), (context) => {
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
        scene.preupdate.addEventListener((delta) => {
            newasset.localRotation = Quat.multiply(newasset.localRotation, Quat.FromEuler(0, delta * 100, 0));
        })
    }
}