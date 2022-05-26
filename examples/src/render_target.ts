import { Camera, Color, DefaultGeometry, DefaultMaterial, mat4, RenderTarget, TextureAsset, ToyGL, vec3 } from "../../src";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const camera = toy.world.addNewCamera();
    camera.viewTargetPoint(vec3.ZERO, 5, vec3.fromValues(-45, 0, 0))
    let renderTarget = new RenderTarget({ width: 600, height: 600 });
    const geometry = DefaultGeometry.cube;
    const material = DefaultMaterial.unlit_3d.clone();

    TextureAsset.fromUrl({ image: "./images/001.jpg" })
        .then(tex => {
            material.setUniform("MainTex", tex);
            material2.setUniform("MainTex", renderTarget.color);
            let rotAngle = 0;
            toy.world.preUpdate.addEventListener((dt) => {
                //渲染到renderTarget上
                rotAngle += dt;
                camera.renderTarget = renderTarget;
                camera.backgroundColor = new Color(1.0, 0.5, 0.5, 1.0);
                toy.render.renderList(camera, [{
                    geometry,
                    material,
                    worldMat: mat4.fromYRotation(mat4.create(), rotAngle),
                }]);
                camera.renderTarget = null;
                camera.backgroundColor = new Color(0.5, 0.5, 0.5, 1.0);
            })
        });
    const material2 = DefaultMaterial.unlit_3d.clone();
    toy.world.addRenderIns({
        geometry,
        material: material2,
        worldMat: mat4.create()
    });
}

