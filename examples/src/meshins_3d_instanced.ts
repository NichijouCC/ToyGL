import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, quat, TextureAsset, DefaultMaterial, mat4, vec3, InstancedGeometryAttribute, ComponentDatatypeEnum } from "TOYGL";

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);

    const { scene } = toy;
    const geometry = DefaultGeometry.cube;
    const material = DefaultMaterial.unlit_3d;

    TextureAsset.fromUrl({ image: "./images/001.jpg" })
        .then(tex => {
            material.setUniform("MainTex", tex);
        });
    let instanceCount = 10;

    let instanceData = new Float32Array(3 * instanceCount * instanceCount);
    let posArr: Float32Array[] = [];
    for (let i = 0; i < instanceCount; i++) {
        for (let j = 0; j < instanceCount; j++) {
            let ins_pos = instanceData.subarray((i + j * instanceCount) * 3, (i + j * instanceCount) * 3 + 3);
            ins_pos[0] = (i - instanceCount / 2) * 4;
            ins_pos[1] = (j - instanceCount / 2) * 4;
            posArr.push(ins_pos);
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
            count: instanceCount * instanceCount
        }
    });

    const cam = toy.scene.addNewCamera();
    cam.entity.localPosition[2] = 0;
    cam.entity.localPosition[1] = 0;

    cam.viewTargetPoint(vec3.ZERO, 25, vec3.fromValues(-45, 0, 0))

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

