import { ToyGL } from "../src/toygl";
import { Prefab } from "../src/scene/asset/Prefab";
export class LoadGltf
{
    static start(toy: ToyGL)
    {
        let duck = "../resources/glTF/duck/Duck.gltf";
        let tree = "../resources/glTF/apple/AppleTree.gltf";
        let uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
        toy.resource.load(tree)
            .then(asset =>
            {
                toy.scene.addChild(Prefab.instance(asset as Prefab))
            })

        let cam = toy.scene.createCamera();
        cam.node.localPosition.z = 3;
    }
}
