import { GlTF, quat, ToyGL, vec3 } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();
const size = 10;
cam.entity.localPosition = vec3.fromValues(size, size, size);
cam.entity.lookAtPoint(vec3.create());
const cesiumMan = "./glTF/cesiumMan/glTF/CesiumMan.gltf";
toy.resource.load(cesiumMan)
    .then(asset => {
        let ins = (asset as GlTF.GltfAsset).createInstance(toy.world)
        ins.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
        ins.localPosition = vec3.fromValues(0, 0, 0);
        toy.world.addChild(ins);
    });
