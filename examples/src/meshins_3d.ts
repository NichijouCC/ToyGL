import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, quat, TextureAsset, DefaultMaterial, mat4, vec3 } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

const { world: scene } = toy;
const geometry = DefaultGeometry.cube;
const material = DefaultMaterial.unlit_3d;

TextureAsset.fromUrl({ image: "./images/001.jpg" })
    .then(tex => {
        material.setUniform("MainTex", tex);
    });

let ins = toy.world.addRenderIns({
    geometry,
    material,
    worldMat: mat4.create()
});


const cam = toy.world.addNewCamera();
cam.entity.localPosition[2] = 0;
cam.entity.localPosition[1] = 0;

cam.viewTargetPoint(vec3.ZERO, 5, vec3.fromValues(-45, 0, 0))

let roty = 0;
let totalTime = 0;
toy.world.preUpdate.addEventListener((delta) => {
    roty += delta * 15;
    totalTime += delta;
    ins.worldMat = mat4.fromRotation(ins.worldMat, roty * Math.PI / 180, vec3.UP);
});
