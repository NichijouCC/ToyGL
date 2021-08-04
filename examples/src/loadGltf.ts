import { quat, vec3 } from "TOYGL";
import { Prefab } from "../../src/scene/asset/prefab";
import { initToy } from "./util";

const toy = initToy();
const building = "../resources/A1_003.glb";
const duck = "../resources/glTF/duck/Duck.gltf";
const tree = "../resources/glTF/apple/AppleTree.gltf";
const uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
const cesiumMan = "../resources/glTF/CesiumMan/glTF/CesiumMan.gltf";
const boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
const Monster = "../resources/glTF/Monster/glTF/Monster.gltf";

toy.resource.load(building)
    .then(asset => {
        const newAsset = Prefab.instance(asset as Prefab);
        newAsset.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
        newAsset.localPosition = vec3.fromValues(0, -10, 0);

        toy.scene.addChild(newAsset);
    });
