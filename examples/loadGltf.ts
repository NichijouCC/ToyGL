import { Resource } from "../src/resources/resource";
import { ToyGL } from "../src/toygl";
import { GltfAsset } from "../src/resources/assets/gltfAsset";
import { Entity } from "../src/ec/entity";
import { Transform } from "../src/ec/components/transform";
import { CameraController } from "../src/ec/components/cameracontroller";
import { Quat } from "../src/mathD/quat";
export class LoadGltf {
    static done(toy: ToyGL) {
        let cubeUrl = "../res/glTF/Cube/Cube.gltf";
        let apple = "../res/glTF/apple/AppleTree.gltf";
        let CesiumMan = "../res/glTF/CesiumMan/glTF/CesiumMan.gltf";
        let duck = "../res/glTF/duck/Duck.gltf";
        let box = "../res/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
        let RiggedSimple = "../res/glTF/RiggedSimple/glTF/RiggedSimple.gltf";
        let Cerberus_LP="../res/glTF/Cerberus_LP/glTF/Cerberus_LP.gltf";
        let DamagedHelmet="../res/glTF/DamagedHelmet/glTF/DamagedHelmet.gltf";
        let drone="../res/glTF/drone/scene.gltf";


        Resource.loadAsync(apple).then(model => {
            let gltf = model as GltfAsset;

            let root = new Entity("rootTag");
            toy.scene.addEntity(root);
            gltf.roots.forEach(item => {
                root.transform.addChild(item.entity.transform);
                // toy.scene.addEntity();
            });

            let camobj = new Entity("cameobj", ["Camera", "CameraController"]);
            let camCtr = camobj.getCompByName("CameraController") as CameraController;
            let trans = camobj.getCompByName("Transform") as Transform;
            trans.localPosition.z = 15;
            trans.markDirty();
            toy.scene.addEntity(camobj);

            camCtr.active();

            let roty = 0;
            toy.preUpdate = delta => {
                roty += delta * 0.01;
                Quat.FromEuler(0, roty, 0, root.transform.localRotation);
                root.transform.markDirty();
            };
        });
    }
}
