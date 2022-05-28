import { setInterval } from "timers";
import { Color, DefaultGeometry, DefaultMaterial, mat4, Material, RenderTarget, Shader, TextureAsset, ToyGL, vec3, vec4, VertexAttEnum } from "../../src";

function createPostEffectShader() {
    return new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: `attribute vec2 POSITION;
          attribute vec2 TEXCOORD_0;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              xlv_TEXCOORD0 = TEXCOORD_0.xy;
              gl_Position = vec4(POSITION.xy,0,1.0);
          }`,
        fsStr: `uniform highp vec4 MainColor;
          uniform lowp sampler2D MainTex;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              gl_FragData[0] = MainColor*texture2D(MainTex, xlv_TEXCOORD0);
          }`
    });
}

window.onload = () => {
    const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    const camera = toy.world.addNewCamera();
    camera.viewTargetPoint(vec3.ZERO, 5, vec3.fromValues(-45, 0, 0));
    camera.backgroundColor = new Color(1.0, 1.0, 1.0, 1.0);

    let renderTarget = new RenderTarget({ width: toy.world.screen.width, height: toy.world.screen.height });
    camera.renderTarget = renderTarget;

    const geometry = DefaultGeometry.cube;
    const material = DefaultMaterial.unlit_3d.clone();
    TextureAsset.fromUrl({ image: "./images/001.jpg" })
        .then(tex => {
            material.setUniform("MainTex", tex);
        });
    toy.world.addRenderIns({
        geometry,
        material: material,
        worldMat: mat4.create()
    });
    let mat = new Material();
    mat.shader = createPostEffectShader();

    setInterval(() => {
        //简单变个色
        mat.setUniform("MainColor", vec4.fromValues(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1.0));
    }, 1000)

    toy.world.afterRender.addEventListener(() => {
        toy.render.blit(renderTarget.color, null, mat);
    })
}
