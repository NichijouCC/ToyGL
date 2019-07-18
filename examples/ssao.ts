import { ToyGL } from "../src/toygl";
import { Vec3 } from "../src/mathD/vec3";
import { random, lerp } from "../src/mathD/common";
import { Texture } from "../src/resources/assets/texture";
import { GlConstants } from "twebgl";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { Color } from "../src/mathD/color";
import { RenderTexture } from "../src/resources/assets/renderTexture";
import { Resource } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";

export class SSAO {
    static done(toy: ToyGL) {
        //----------------场景
        toy.scene.addDefMesh("cube");
        let quad = toy.scene.addDefMesh("quad");
        quad.material = new Material();
        quad.material.shader = DefShader.fromType("base");
        quad.material.setColor("MainColor", Color.create(1, 0, 0, 1));

        quad.entity.transform.localScale = Vec3.create(3, 3, 3);

        let cam = toy.scene.addCamera(Vec3.create(5, 5, 5));
        cam.entity.transform.lookAtPoint(Vec3.ZERO);

        //------------------------------------------
        //-------------------SSAO-------------------
        //------------------------------------------
        //-----------------半球采样随机点
        let kernelSize = 16;
        let kernel: Vec3[] = [];
        for (let i = 0; i < kernelSize; i++) {
            kernel[i] = Vec3.create(random(-1.0, 1.0), random(-1.0, 1.0), random(0.0, 1.0));
            Vec3.normalize(kernel[i], kernel[i]);

            //-------------半径内随机
            let sphereRandom = random(0, 1);
            //-------------采样点趋近中心点
            let scale = i / kernelSize;
            scale = lerp(0.1, 1.0, scale * scale);

            Vec3.scale(kernel[i], sphereRandom * scale, kernel[i]);
        }

        //----------------noise texture /rot sample point
        let noiseSize = 16;
        let colorArr = new Uint8Array(noiseSize * 4);
        for (let i = 0; i < noiseSize; ++i) {
            let dir = Vec3.create(random(-1.0, 1.0), random(-1.0, 1.0), 0.0);
            Vec3.normalize(dir, dir);
            let r = Math.floor(dir.x * 255);
            let g = Math.floor(dir.y * 255);
            let b = 0;
            let a = 1.0;
            colorArr[i * 4 + 0] = r;
            colorArr[i * 4 + 1] = g;
            colorArr[i * 4 + 2] = b;
            colorArr[i * 4 + 3] = a;
        }
        let tex = Texture.fromViewData(colorArr, 4, 4, {
            filterMin: GlConstants.NEAREST,
            filterMax: GlConstants.NEAREST,
            wrapS: GlConstants.REPEAT,
            wrapT: GlConstants.REPEAT,
        });

        //----------------depthTex
        cam.targetTexture = new RenderTexture({
            activeDepthAttachment: true,
            depthFormat: GlConstants.DEPTH_COMPONENT,
        });

        let customeShader = Resource.load("../res/shader/depthTex.shader.json") as Shader;
        let quadMat = new Material({ name: "quadMat" });
        quadMat.shader = customeShader;
        quadMat.setTexture("_MainTex", cam.targetTexture.depthTexture);
        // quadMat.setTexture("_MainTex", DefTextrue.GIRD);
        cam.afterRender = () => {
            toy.render.renderQuad(quadMat);
        };
    }
}
