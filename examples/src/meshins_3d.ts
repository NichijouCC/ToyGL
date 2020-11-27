import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, Camera, MeshInstance, quat, TextureAsset, DefaultMaterial } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

let { scene } = toy;
const geometry = DefaultGeometry.cube;
const material = DefaultMaterial.color_3d;

TextureAsset.fromUrl({ image: "./resources/glTF/duck/DuckCM.png" })
    .then(tex => {
        material.setUniformParameter("_MainTex", tex);
    })

const ins = MeshInstance.create({
    geometry,
    material,
    node: scene.addNewChild()
})
toy.scene.addRenderIns(ins);

let cam = toy.scene.addNewCamera();
cam.node.localPosition[2] = 5;

let roty = 0;
let totalTime = 0;
toy.scene.preupdate.addEventListener((delta) => {
    roty += delta * 15;
    totalTime += delta;
    ins.node.localRotation = quat.fromEuler(ins.node.localRotation, 0, roty, 0);
    material.setUniformParameter("timer", totalTime);
});

