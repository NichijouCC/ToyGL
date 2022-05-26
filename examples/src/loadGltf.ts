import { Prefab, quat, vec3 } from "TOYGL";
import { initToy } from "./util";

const toy = initToy();
const building = "./A1_003.glb";
const duck = "../resources/glTF/duck/Duck.gltf";
const tree = "../resources/glTF/apple/AppleTree.gltf";
const uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
const cesiumMan = "./glTF/cesiumMan/glTF/CesiumMan.gltf";
const boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
const Monster = "../resources/glTF/Monster/glTF/Monster.gltf";

toy.resource.load(cesiumMan)
    .then(asset => {
        const newAsset = Prefab.instance(asset as Prefab);
        newAsset.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
        newAsset.localPosition = vec3.fromValues(0, 0, 0);
        toy.world.addChild(newAsset);
    });
