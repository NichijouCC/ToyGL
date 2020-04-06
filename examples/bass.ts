import { ToyGL } from "../src/toygl";
import { MeshInstance } from "../src/scene/primitive/MeshInstance";
import { Material } from "../src/scene/asset/Material";
import { DefaultGeometry } from '../src/resources/defAssets/DefaultGeometry';
import { DefaultTexture } from '../src/resources/defAssets/DefaultTexture';

import { VertexAttEnum } from "../src/webgl/VertexAttEnum";
import { Color } from "../src/mathD/color";
import { Camera } from "../src/scene/Camera";
import { Quat } from "../src/mathD/quat";
import { Texture2D } from "../src/scene/asset/texture/Texture2d";
export class Base {
    static start(toy: ToyGL) {
        let geometry = DefaultGeometry.ins.quad2d;
        let mat = new Material({
            uniformParameters: {
                MainColor: Color.create(0, 1.0, 0.0, 1.0)
            },
            shaderOption: {
                vsStr: `attribute vec3 POSITION;
                void main()
                {
                    gl_Position = vec4(POSITION.xy*0.5,1.0,1.0);
                }`,
                fsStr: `uniform highp vec4 MainColor;
                void main()
                {
                    gl_FragData[0] = MainColor;
                }`,
                attributes: {
                    POSITION: VertexAttEnum.POSITION,
                }
            }
        });
        mat.setUniformParameter("_MainTex", DefaultTexture.grid);
        // mat.setUniformParameter("_MainTex", DefaultTexture.grid);
        let tex = new Texture2D();
        let image = new Image();
        image.src = "../resources/glTF/duck/DuckCM.png";
        image.onload = () => {
            tex.textureSource = image;
            mat.setUniformParameter("_MainTex", tex);
            console.log("tex loded!")
        }

        let ins = new MeshInstance();
        ins.geometry = geometry;
        ins.material = mat;

        let node = toy.scene.createChild();
        ins.node = node;
        toy.scene.tryAddMeshInstance(ins);


        let camNode = toy.scene.createChild();
        camNode.localPosition.z = 5;
        let cam = new Camera();
        cam.node = camNode;
        toy.scene.tryAddCamera(cam);

        let roty = 0;
        let totalTime = 0;
        toy.scene.preUpdate.addEventListener((delta) => {
            roty += delta * 15;
            totalTime += delta;
            // node.localRotation = Quat.FromEuler(0, roty, 0, node.localRotation);
            // mat.setUniformParameter("timer", totalTime);
        })

        // let geometry = DefGeometry.fromType("quad");

        // ///------------def shader
        // let shader = DefShader.fromType("3dTex");
        // //-------------custom shader
        // let customeShader = Resource.load("../res/shader/base.shader.json") as Shader;

        // let material = new Material();
        // material.shader = customeShader;
        // material.setColor("_MainColor", Color.create(1, 0, 0, 1));

        // //-----------def tex
        // let defTex = DefTextrue.GIRD;
        // //-----------load tex
        // let tex = Resource.load("../res/imgs/tes.png") as Texture;

        // material.setTexture("_MainTex", tex);

        // let obj = new Entity();
        // let mesh = obj.addCompByName("Mesh") as Mesh;
        // mesh.geometry = geometry;
        // mesh.material = material;

        // toy.scene.addEntity(obj);

        // let camobj = new Entity("", ["Camera"]);
        // let trans = camobj.transform;
        // trans.localPosition = Vec3.create(0, 0, 5);
        // // trans.localRotation = Quat.FromEuler(-90, 0, 0);
        // toy.scene.addEntity(camobj);

        // let roty = 0;
        // toy.scene.preUpdate = delta =>
        // {
        //     roty += delta * 0.01;
        //     obj.transform.localRotation = Quat.FromEuler(0, roty, 0, obj.transform.localRotation);
        // };
    }
}
