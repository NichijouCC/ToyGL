import { ToyGL } from "../src/toygl";
import { MeshInstance } from "../src/scene/MeshInstance";
import { Material } from "../src/scene/asset/Material";
import { DefaultGeometry } from '../src/resources/defAssets/DefaultGeometry';
import { DefaultTexture } from '../src/resources/defAssets/DefaultTexture';

import { VertexAttEnum } from "../src/webgl/VertexAttEnum";
import { Color } from "../src/mathD/color";
import { Camera } from "../src/scene/Camera";
import { Quat } from "../src/mathD/quat";
import { Prefab } from "../src/scene/asset/Prefab";
export class LoadGltf
{
    static start(toy: ToyGL)
    {
        let duck = "../resources/glTF/duck/Duck.gltf";
        let tree = "../resources/glTF/apple/AppleTree.gltf";
        let uvtest = "../resources/glTF/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf";
        toy.resource.load(tree)
            .then(asset =>
            {
                toy.scene.addChild(Prefab.instance(asset as Prefab))
            })

        let cam = toy.scene.createCamera();
        cam.node.localPosition.z = 3;
        // let roty = 0;
        // toy.scene.preUpdate.addEventListener((delta) =>
        // {
        //     roty += delta * 15;
        //     node.localRotation = Quat.FromEuler(0, roty, 0, node.localRotation);
        // })

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
