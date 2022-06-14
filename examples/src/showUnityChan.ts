import { Prefab, quat, vec3, Animation, ToyGL, ModelComponent, Texture2D, TextureAsset } from "TOYGL";
import { initToy } from "./util";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();

const size = 250;
cam.entity.localPosition = vec3.fromValues(size, size, size);
// cam.node.lookAtPoint(vec3.create());

cam.entity.lookAtPoint(vec3.fromValues(0, 100, 0));

const building = "./A1_003.glb";
const duck = "../resources/glTF/duck/Duck.gltf";
const tree = "../resources/glTF/apple/AppleTree.gltf";
const uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
const cesiumMan = "./glTF/cesiumMan/glTF/CesiumMan.gltf";
const boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
const Monster = "../resources/glTF/Monster/glTF/Monster.gltf";


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

toy.resource.load("./glTF/unitychan/unitychan.glb")
    .then(asset => {
        const newAsset = Prefab.instance(asset as Prefab);
        newAsset.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
        newAsset.localPosition = vec3.fromValues(0, 0, 0);
        toy.world.addChild(newAsset);

        for (let key in parts) {
            TextureAsset.fromUrl({ image: `./glTf/unitychan/textures/${parts[key]}` }).then(res => {
                let tex = res as Texture2D;
                let node = newAsset.find(el => el.name == key);
                if (node) {
                    node.getComponent(ModelComponent).material.setUniform("MainTex", tex)
                } else {
                    console.warn("无法找到节点", key);
                }
            })
        }

        toy.resource.load("./glTF/unitychan/pos1.glb")
            .then(asset => {
                let a = asset as Prefab;
                newAsset.localRotation = quat.fromEuler(quat.create(), 90, 0, 0);
                let comp = a.root.findComponents(Animation)?.[0]?.clone();
                comp.timeScale = 0.01;
                newAsset.addComponentDirect(comp);
            });
    });