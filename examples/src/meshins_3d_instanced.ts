import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, quat, TextureAsset, DefaultMaterial, mat4, vec3, InstancedGeometryAttribute, ComponentDatatypeEnum, InstanceWorldMat, InstanceColor } from "TOYGL";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

    const { scene } = toy;
    const geometry = DefaultGeometry.cube;
    const material = DefaultMaterial.unlit_3d;

    TextureAsset.fromUrl({ image: "./images/0011.jpg" })
        .then(tex => {
            material.setUniform("MainTex", tex);
        });
    let width = 20;
    let count = width * width * width;

    let instanceMatData = new Float32Array(16 * count);
    let instanceColorData = new Uint8Array(4 * count);
    let mats: Float32Array[] = []
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            for (let K = 0; K < width; K++) {
                let ins_mat = instanceMatData.subarray((i + j * width + K * width * width) * 16, (i + j * width + K * width * width) * 16 + 16);
                let worldPos = vec3.fromValues((Math.random() + i - (width + 1) / 2) * 4, (Math.random() + j - (width + 1) / 2) * 4, (Math.random() + K - (width + 1) / 2) * 4);
                let worldRot = quat.fromEuler(quat.create(), Math.random() * 360, Math.random() * 360, Math.random() * 360);
                mat4.fromRotationTranslationScale(ins_mat, worldRot, worldPos, vec3.ONE);
                mats.push(ins_mat);

                let ins_color = instanceColorData.subarray((i + j * width + K * width * width) * 4, (i + j * width + K * width * width) * 4 + 4);
                ins_color[0] = Math.floor(Math.random() * 255);
                ins_color[1] = Math.floor(Math.random() * 255);
                ins_color[2] = Math.floor(Math.random() * 255);
                ins_color[3] = 255;
            }
        }
    }
    let instanceMat = new InstanceWorldMat({ data: instanceMatData });
    let instanceColor = new InstanceColor({ data: instanceColorData });
    toy.scene.addRenderIns({
        geometry,
        material,
        worldMat: mat4.create(),
        instanceData: {
            attributes: [instanceMat, instanceColor],
            count: count
        }
    });

    const cam = toy.scene.addNewCamera();
    cam.entity.localPosition[2] = 0;
    cam.entity.localPosition[1] = 0;

    cam.viewTargetPoint(vec3.ZERO, 100, vec3.fromValues(-30, 0, 0))

    toy.scene.preRender.addEventListener((ev) => {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                for (let K = 0; K < width; K++) {
                    let base_mat = instanceMatData.subarray((i + j * width + K * width * width) * 16, (i + j * width + K * width * width) * 16 + 16);
                    let dir = vec3.fromValues(Math.random(), Math.random(), Math.random());
                    vec3.normalize(dir, dir);
                    let rotMat = mat4.fromRotation(mat4.create(), Math.PI / 180, dir);
                    mat4.multiply(base_mat, base_mat, rotMat);
                }
            }
        }
        instanceMat.data = instanceMatData;
    })
}

