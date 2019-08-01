import { ToyGL } from "../src/toygl";
import { Vec3 } from "../src/mathD/vec3";
import { random, lerp } from "../src/mathD/common";
import { Texture } from "../src/resources/assets/texture";
import { Material } from "../src/resources/assets/material";
import { DefShader } from "../src/resources/defAssets/defShader";
import { Color } from "../src/mathD/color";
import { RenderTexture } from "../src/resources/assets/renderTexture";
import { Resource } from "../src/resources/resource";
import { Shader } from "../src/resources/assets/shader";
import { GltfAsset } from "../src/resources/assets/gltfAsset";
import { Entity } from "../src/ec/entity";

import { GlConstants } from "../src/render/GlConstant";
import { Vec2 } from "../src/mathD/vec2";
import { GameScreen } from "../src/gameScreen";

import * as dat from "dat.gui";
import { Quat } from "../src/mathD/quat";
import { Camera } from "../src/ec/components/camera";
import { DefMaterial } from "../src/resources/defAssets/defMaterial";

export class SSAO {
    static done(toy: ToyGL) {
        let cam = toy.scene.addCamera(Vec3.create(0, 0, 15));
        // cam.entity.transform.lookAtPoint(Vec3.ZERO);
        cam.beActiveFrustum = false;
        let DamagedHelmet = "./res/glTF/DamagedHelmet/glTF/DamagedHelmet.gltf";
        let cubeUrl = "../res/glTF/Cube/Cube.gltf";
        let sphereUrl = "../res/glTF/Sphere/Sphere.gltf";

        let modelRoot: Entity = toy.scene.newEntity();
        // Resource.loadAsync(sphereUrl).then(model => {
        //     let gltf = model as GltfAsset;

        //     gltf.roots.forEach(item => {
        //         modelRoot.transform.addChild(item.entity.transform);
        //         // toy.scene.addEntity();
        //     });
        // });

        toy.scene.preUpdate = delta => {
            if (modelRoot != null) {
                let deltarot = delta * 0.0001;
                let rot = Quat.AxisAngle(Vec3.UP, deltarot);
                modelRoot.transform.localRotation = Quat.multiply(rot, modelRoot.transform.localRotation);
            }
        };
        for (let i = 0; i < 100; i++) {
            let mat = new Material();
            mat.shader = DefShader.fromType("base");
            mat.setColor("MainColor", Color.random());

            let mesh = toy.scene.addDefMesh("cube", mat);
            mesh.entity.transform.localPosition.x = Math.random() * 10 - 5;
            mesh.entity.transform.localPosition.y = Math.random() * 10 - 5;
            mesh.entity.transform.localPosition.z = Math.random() * 10 - 5;
            let scale = Math.random() * 5 + 0.1;
            mesh.entity.transform.localScale = Vec3.create(scale, scale, scale);
            let quat = Quat.create();
            quat.x = Math.random();
            quat.y = Math.random();
            quat.z = Math.random();
            mesh.entity.transform.localRotation = Quat.normalize(quat, quat);
        }
        this.ssao(toy, cam);
    }

    static ssao(toy: ToyGL, cam: Camera) {
        //------------------------------------------
        //-------------------SSAO-------------------
        //------------------------------------------
        //-----------------半球采样随机点--------
        let kernelSize = 16.0;
        let kernelArr: Float32Array = new Float32Array(kernelSize * 3);
        for (let i = 0; i < kernelSize; i++) {
            //----------------半球随机
            let kernel = Vec3.create(random(-1.0, 1.0), random(-1.0, 1.0), random(0.0, 1.0));
            Vec3.normalize(kernel, kernel);

            //-------------半径内随机
            let sphereRandom = random(0, 1);
            //-------------采样点趋近中心点
            let scale = i / kernelSize;
            scale = lerp(0.1, 1.0, scale * scale);

            Vec3.scale(kernel, sphereRandom * scale, kernel);
            kernelArr[i * 3 + 0] = kernel.x;
            kernelArr[i * 3 + 1] = kernel.y;
            kernelArr[i * 3 + 2] = kernel.z;
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
            let a = 255;
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

        //----------------depthTex  normal tex
        let bMat = new Material({ name: "beforeSSAO" });
        let beforeSSAO = Resource.load("../res/shader/beforeSSAO.shader.json") as Shader;
        bMat.shader = beforeSSAO;

        cam.backgroundColor = Color.create(0, 0, 0, 1);
        cam.targetTexture = new RenderTexture(
            {
                activeDepthAttachment: true,
                depthFormat: GlConstants.DEPTH_COMPONENT,
            },
            bMat,
        );

        let customeShader = Resource.load("../res/shader/ssao.shader.json") as Shader;
        let quadMat = new Material({ name: "quadMat" });
        quadMat.shader = customeShader;
        quadMat.setTexture("uTexLinearDepth", cam.targetTexture.depthTexture);
        quadMat.setTexture("uTexNormals", cam.targetTexture.colorTexture);
        quadMat.setTexture("uTexRandom", tex);
        quadMat.setVector2("uNoiseScale", Vec2.create(GameScreen.Width / 4, GameScreen.Height / 4));
        quadMat.setFloat("uSampleKernelSize", 48);
        quadMat.setVector3Array("uSampleKernel", kernelArr);
        quadMat.setFloat("uRadius", 1.0);

        // quadMat.setTexture("_MainTex", DefTextrue.GIRD);

        // let quadShader = Resource.load("../res/shader/quad.shader.json") as Shader;
        // quadMat.shader = quadShader;
        // quadMat.setTexture("_MainTex", cam.targetTexture.colorTexture);

        const gui = new dat.GUI();
        let ssaoOp = {
            uRadius: 1.0,
        };
        gui.add(ssaoOp, "uRadius", 0.001, 10.0, 0.001);

        cam.afterRender = () => {
            quadMat.setFloat("uRadius", ssaoOp.uRadius);
            toy.render.renderQuad(quadMat);
        };
    }
}
