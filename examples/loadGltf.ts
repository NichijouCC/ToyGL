import { Resource } from "../src/resources/resource";
import { ToyGL } from "../src/toygl";
import { GltfAsset } from "../src/resources/assets/gltfAsset";
import { Entity } from "../src/ec/entity";
import { CameraController } from "../src/ec/components/cameracontroller";
import { Quat } from "../src/mathD/quat";
import { Vec3 } from "../src/mathD/vec3";
export class LoadGltf {
    static done(toy: ToyGL) {
        let cubeUrl = "../res/glTF/Cube/Cube.gltf";
        let apple = "../res/glTF/apple/AppleTree.gltf";
        let CesiumMan = "../res/glTF/CesiumMan/glTF/CesiumMan.gltf";
        let duck = "../res/glTF/duck/Duck.gltf";
        let box = "../res/glTF/BoxAnimated/glTF/BoxAnimated.gltf";
        let RiggedSimple = "../res/glTF/RiggedSimple/glTF/RiggedSimple.gltf";
        let cerberusLP = "../res/glTF/Cerberus_LP/glTF/Cerberus_LP.gltf";
        let DamagedHelmet = "../res/glTF/DamagedHelmet/glTF/DamagedHelmet.gltf";
        let drone = "../res/glTF/drone/scene.gltf";

        Resource.loadAsync(DamagedHelmet).then(model => {
            let gltf = model as GltfAsset;

            let root = new Entity("rootTag");
            toy.scene.addEntity(root);
            gltf.roots.forEach(item => {
                root.transform.addChild(item.entity.transform);
                // toy.scene.addEntity();
            });

            let camobj = new Entity("cameobj", ["Camera", "CameraController"]);
            let camCtr = camobj.getCompByName("CameraController") as CameraController;
            let trans = camobj.transform;
            trans.localPosition = Vec3.create(0, 0, 15);

            toy.scene.addEntity(camobj);

            camCtr.active();

            let roty = 0;
            toy.scene.preUpdate = delta => {
                roty += delta * 0.01;
                root.transform.localRotation = Quat.FromEuler(0, roty, 0, root.transform.localRotation);
            };
        });
    }
}
