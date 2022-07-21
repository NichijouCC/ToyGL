import { Prefab, quat, vec3, Animation, ToyGL, ModelComponent, Texture2D, TextureAsset, AnimationClip } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();

cam.entity.localPosition = vec3.fromValues(0, 100, 200);
// cam.node.lookAtPoint(vec3.create());
cam.entity.lookAtPoint(vec3.fromValues(0, 80, 0));
const parts: { [part: string]: string } = {
    "button": "body_01.png",
    "cheek": "cheek_00.png",
    "hair_accce": "body_01.png",
    "hair_front": "hair_01.png",
    "hair_frontside": "hair_01.png",
    "hairband": "body_01.png",
    "Leg": "body_01.png",
    "Shirts": "body_01.png",
    "shirts_sode": "body_01.png",
    "shirts_sode_BK": "body_01.png",
    "skin": "skin_01.png",
    "tail": "hair_01.png",
    "tail_bottom": "hair_01.png",
    "uwagi": "body_01.png",
    "uwagi_BK": "body_01.png",

    "BLW_DEF": "eyeline_00.png",
    "eye_base_old": "eyeline_00.png",
    "EYE_DEF": "face_00.png",
    "EL_DEF": "eyeline_00.png",
    "eye_L_old": "eye_iris_L_00.png",
    "eye_R_old": "eye_iris_R_00.png",
    "head_back": "face_00.png",
    "MTH_DEF": "face_00.png",
}

let loadAsset = async () => {
    let root = await toy.resource.load("./glTF/unitychan/unitychan.glb")
        .then(asset => {
            const newAsset = Prefab.instance(asset as Prefab);
            newAsset.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
            newAsset.localPosition = vec3.fromValues(0, 0, 0);
            toy.world.addChild(newAsset);
            newAsset.findComponents(Animation).forEach(el => el.entity.removeComponent(Animation))
            return newAsset;
        });

    await toy.resource.load("./glTF/unitychan/unitychan.gltf")
        .then(asset => {

        })

    // await Promise.all(Object.keys(parts).map(key => TextureAsset.fromUrl({ image: `./glTf/unitychan/textures/${parts[key]}`, flipY: false })
    //     .then(res => {
    //         let tex = res as Texture2D;
    //         let node = root.find(el => el.name == key);
    //         if (node) {
    //             node.getComponent(ModelComponent).material.setUniform("MainTex", tex)
    //         } else {
    //             console.warn("无法找到节点", key);
    //         }
    //     })))
    return toy.resource.load("./glTF/unitychan/pos1.glb")
        .then(asset => {
            let a = asset as Prefab;
            root.localRotation = quat.fromEuler(quat.create(), 90, 0, 0);
            let comp = a.root.findComponents(Animation)?.[0]?.clone();
            comp.timeScale = 0.01;
            root.addComponentDirect(comp);
            return comp;
        });
}

loadAsset().then(comp => {
    //UI
    let container = createUIContainer();
    let posData = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
    createRowSelect(container, {
        title: "摆POSE",
        options: posData.map((el, index) => { return { name: `Pos${index + 1}`, data: el } }),
        onchange: (el) => {
            console.info(el.name);
            comp.frameIndex = el.data
        }
    });
})

function createUIContainer() {
    let container = document.createElement("div");
    document.body.appendChild(container);
    container.style.position = "absolute";
    container.style.right = "0px";
    container.style.top = "0px";
    container.style.backgroundColor = "rgb(26,115,232)";
    container.style.padding = "10px";
    return container;
}

function createRowSelect<T = any>(parent: HTMLDivElement, info: { title: string, options: { name: string, data?: T }[], onchange?: (el: { name: string, data?: T }) => void }) {
    let row = document.createElement("div");
    row.style.display = "flex"
    row.style.flexDirection = "row"
    row.style.minWidth = "200px"
    let title = document.createElement("div");
    title.innerText = info.title;
    title.style.marginRight = "20px"
    let select = document.createElement("select");
    select.style.minWidth = "150px"
    info.options.map(el => {
        let opt = document.createElement("option");
        opt.text = el.name;
        select.add(opt);
    })
    select.onchange = (ev) => {
        info.onchange?.(info.options[(ev.target as HTMLSelectElement).selectedIndex])
    }
    row.appendChild(title);
    row.appendChild(select);
    parent.appendChild(row);
}