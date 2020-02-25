import { ToyGL } from "../src/toygl";
import { MeshInstance } from "../src/scene/MeshInstance";
import { Material } from "../src/scene/asset/Material";
import { DefaultGeometry } from '../src/resources/defAssets/DefaultGeometry'
import { VertexAttEnum } from "../src/webgl/VertexAttEnum";
import { Color } from "../src/mathD/color";
import { Camera } from "../src/scene/Camera";
export class Base
{
    static start(toy: ToyGL)
    {
        let geometry = DefaultGeometry.ins.cube;
        let mat = new Material({
            uniformParameters: {
                MainColor: Color.create(1, 0.5, 0.5, 1.0)
            },
            shaderOption: {
                vsStr: `attribute vec3 POSITION;
                void main()
                {
                    highp vec4 tmplet_1=vec4(POSITION.xy*0.5,1.0,1.0);
                    gl_Position = tmplet_1;
                }`,
                fsStr: `uniform highp vec4 MainColor;
                void main()
                {
                    gl_FragData[0] = MainColor;
                }`,
                attributes: {
                    POSITION: VertexAttEnum.POSITION,
                    MainColor: VertexAttEnum.COLOR_0,
                }

            }
        });
        let ins = new MeshInstance();
        ins.geometry = geometry;
        ins.material = mat;

        let node = toy.scene.createChild();
        ins.node = node;
        toy.scene.tryAddMeshInstance(ins);


        let cam = new Camera();
        cam.node = node;
        toy.scene.tryAddCamera(cam);

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
