import { ToyGL, Material, DefaultGeometry, DefaultTexture, Color, VertexAttEnum, Texture2D, IViewer, MeshInstance, quat, TextureAsset } from "TOYGL";
import { initToy } from "./util";

const toy = initToy();
const { scene } = toy;
const geometry = DefaultGeometry.quad2d;
const material = new Material({
    uniformParameters: {
        MainColor: Color.create(0, 1.0, 0.0, 1.0),
        _MainTex: DefaultTexture.grid
    },
    shaderOption: {
        vsStr: `attribute vec3 POSITION;
                attribute vec3 TEXCOORD_0;
                varying mediump vec2 xlv_TEXCOORD0;
                void main()
                {
                    xlv_TEXCOORD0 = TEXCOORD_0.xy;
                    gl_Position = vec4(POSITION.xy*0.5,1.0,1.0);
                }`,
        fsStr: `uniform highp vec4 MainColor;
                varying mediump vec2 xlv_TEXCOORD0;
                uniform lowp sampler2D _MainTex;
                void main()
                {
                    gl_FragData[0] =xlv_TEXCOORD0.y*texture2D(_MainTex, xlv_TEXCOORD0)*MainColor;
                }`,
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        }
    }
});

TextureAsset.fromUrl({ image: "./resources/glTF/duck/DuckCM.png" })
    .then(tex => {
        material.setUniformParameter("_MainTex", tex);
    });

const ins = MeshInstance.create({
    geometry,
    material,
    node: scene.addNewChild()
});
toy.scene.addRenderIns(ins);

const cam = toy.scene.addNewCamera();
cam.node.localPosition[2] = 5;

let roty = 0;
let totalTime = 0;
toy.scene.preUpdate.addEventListener((delta) => {
    roty += delta * 15;
    totalTime += delta;
    ins.node.localRotation = quat.fromEuler(ins.node.localRotation, 0, roty, 0);
    material.setUniformParameter("timer", totalTime);
});
