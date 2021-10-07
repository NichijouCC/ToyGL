import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, quat, TextureAsset, DefaultMaterial, mat4, vec3 } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

const { scene } = toy;
const geometry = DefaultGeometry.cube;
const material = DefaultMaterial.unlit_3d;

TextureAsset.fromUrl({ image: "./images/blood.png" })
    .then(tex => {
        material.setUniformParameter("MainTex", tex);
    });

let ins = toy.scene.addRenderIns({
    geometry,
    material,
    worldMat: mat4.create()
});


const cam = toy.scene.addNewCamera();
cam.entity.localPosition[2] = 5;
cam.entity.localPosition[1] = 5;

cam.viewTargetPoint(vec3.ZERO, 50, vec3.fromValues(-45, 0, 0))

let roty = 0;
let totalTime = 0;
toy.scene.preUpdate.addEventListener((delta) => {
    roty += delta * 15;
    totalTime += delta;
    ins.worldMat = mat4.fromRotation(ins.worldMat, roty * Math.PI / 180, vec3.UP);
});
