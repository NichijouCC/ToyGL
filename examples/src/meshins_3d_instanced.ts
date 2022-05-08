import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, quat, TextureAsset, DefaultMaterial, mat4, vec3, InstancedGeometryAttribute, ComponentDatatypeEnum } from "TOYGL";

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

    let instanceData = new Float32Array(3 * count);
    let posArr: Float32Array[] = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            for (let K = 0; K < width; K++) {
                let ins_pos = instanceData.subarray((i + j * width + K * width * width) * 3, (i + j * width + K * width * width) * 3 + 3);
                ins_pos[0] = (i - width / 2) * 5;
                ins_pos[1] = (j - width / 2) * 5;
                ins_pos[2] = (K - width / 2) * 5;
                posArr.push(ins_pos);
            }
        }
    }

    let instanceAtt = new InstancedGeometryAttribute({
        type: VertexAttEnum.INS_POS,
        componentSize: 3,
        componentDatatype: ComponentDatatypeEnum.FLOAT,
        data: instanceData,
    });
    let ins = toy.scene.addRenderIns({
        geometry,
        material,
        worldMat: mat4.create(),
        instanceData: {
            attribute: instanceAtt,
            count: count
        }
    });

    const cam = toy.scene.addNewCamera();
    cam.entity.localPosition[2] = 0;
    cam.entity.localPosition[1] = 0;

    cam.viewTargetPoint(vec3.ZERO, 100, vec3.fromValues(-30, 0, 0))

    let roty = 0;
    toy.scene.preUpdate.addEventListener((delta) => {
        roty += delta * 15;
        ins.worldMat = mat4.fromRotation(ins.worldMat, roty * Math.PI / 180, vec3.UP);
    });

    // toy.scene.preRender.addEventListener((ev) => {
    //     roty += ev.deltaTime * 15;
    //     for (let i = 0; i < instanceCount; i++) {
    //         let rot = roty + i * 10;
    //         mat4.fromRotation(mats[i], roty * Math.PI / 180, vec3.UP);
    //     }
    //     instanceAtt.data = instanceData;
    // })
}

