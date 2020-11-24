import { Prefab } from "../../src/scene/asset/prefab";
import { Quat } from "../../src/mathD/quat";
import { initToy } from "./util";

const toy = initToy();
const duck = "../resources/glTF/duck/Duck.gltf";
const tree = "../resources/glTF/apple/AppleTree.gltf";
const uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
const cesiumMan = "../resources/glTF/CesiumMan/glTF/CesiumMan.gltf";
const boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";

toy.resource.load(cesiumMan)
    .then(asset => {
        const newasset = Prefab.instance(asset as Prefab);
        newasset.localRotation = Quat.FromEuler(0, -90, 0);
        toy.scene.addChild(newasset);
    });

const cam = toy.scene.addNewCamera();
cam.node.localPosition.z = 10;