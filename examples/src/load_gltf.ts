import { Gltf, Prefab, quat, ToyGL, vec3 } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();
const size = 10;
cam.entity.localPosition = vec3.fromValues(size, size, size);
cam.entity.lookAtPoint(vec3.create());

const building = "./A1_003.glb";
const duck = "../resources/glTF/duck/Duck.gltf";
const tree = "../resources/glTF/apple/AppleTree.gltf";
const uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
const boxanimation = "../resources/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
const Monster = "../resources/glTF/Monster/glTF/Monster.gltf";
const cesiumMan = "./glTF/cesiumMan/glTF/CesiumMan.gltf";

toy.resource.load(cesiumMan)
    .then(asset => {
        let ins = (asset as Gltf.GltfAsset).createInstance(toy.world)
        ins.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
        ins.localPosition = vec3.fromValues(0, 0, 0);
        toy.world.addChild(ins);
    });
