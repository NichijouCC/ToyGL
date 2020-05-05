import { ToyGL } from "../src/toygl";
import { Prefab } from "../src/scene/asset/Prefab";
import { Quat } from "../src/mathD/quat";
export class LoadGltf {
    static start(toy: ToyGL) {
        let duck = "../resources/glTF/duck/Duck.gltf";
        let tree = "../resources/glTF/apple/AppleTree.gltf";
        let uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
        let cesiumMan = "../resources/glTF/CesiumMan/glTF/CesiumMan.gltf";
        let boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";


        toy.resource.load(cesiumMan)
            .then(asset => {
                let newasset = Prefab.instance(asset as Prefab);
                newasset.localRotation = Quat.FromEuler(0, -90, 0);
                toy.scene.addChild(newasset);
            })

        let cam = toy.scene.createCamera();
        cam.node.localPosition.z = 10;
    }
}
