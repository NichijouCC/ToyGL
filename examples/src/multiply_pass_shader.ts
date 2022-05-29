import { Color, DefaultGeometry, DefaultMaterial, mat4, Material, RenderTarget, Shader, TextureAsset, ToyGL, vec3, vec4, VertexAttEnum } from "../../src";

function createMultiplyPassShader() {
    return new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        subPasses: [
            {
                vs: `attribute vec2 POSITION;
                    attribute vec2 TEXCOORD_0;
                    varying mediump vec2 xlv_TEXCOORD0;
                    void main()
                    {
                        xlv_TEXCOORD0 = TEXCOORD_0.xy;
                        gl_Position = vec4(POSITION.xy*0.5-vec2(0.5),0,1.0);
                    }`,
                fs: `uniform highp vec4 MainColor1;
                    uniform lowp sampler2D MainTex;
                    varying mediump vec2 xlv_TEXCOORD0;
                    void main()
                    {
                        gl_FragData[0] = MainColor1*texture2D(MainTex, xlv_TEXCOORD0);
                    }`
            },
            {
                vs: `attribute vec2 POSITION;
                attribute vec2 TEXCOORD_0;
                varying mediump vec2 xlv_TEXCOORD0;
                void main()
                {
                    xlv_TEXCOORD0 = TEXCOORD_0.xy;
                    gl_Position = vec4(POSITION.xy*0.5+vec2(0.5),0,1.0);
                }`,
                fs: `uniform highp vec4 MainColor2;
                uniform lowp sampler2D MainTex;
                varying mediump vec2 xlv_TEXCOORD0;
                void main()
                {
                    gl_FragData[0] = MainColor2*texture2D(MainTex, xlv_TEXCOORD0);
                }`
            }
        ]

    });
}

//一个pass绘制一个红色图像
//一个pass绘制一个蓝色图像
window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const camera = toy.world.addNewCamera();
    camera.viewTargetPoint(vec3.ZERO, 5, vec3.fromValues(-45, 0, 0));
    camera.backgroundColor = new Color(1.0, 1.0, 1.0, 1.0);
    const geometry = DefaultGeometry.quad2d;
    let material = new Material();
    material.shader = createMultiplyPassShader();
    material.setUniform("MainColor1", vec4.fromValues(1.0, 0, 0, 1.0));
    material.setUniform("MainColor2", vec4.fromValues(0.0, 0, 1.0, 1.0));
    TextureAsset.fromUrl({ image: "./images/001.jpg" })
        .then(tex => {
            material.setUniform("MainTex", tex);
        });
    toy.world.addRenderIns({
        geometry,
        material: material,
        worldMat: mat4.create()
    });
}
