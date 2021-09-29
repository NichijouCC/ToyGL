import { DefaultMaterial, Geometry, mat4, Material, quat, StaticGeometry, vec3, VertexAttEnum } from "TOYGL";
import { initToy } from "./util";
import { LoadPLY } from "../../src/resources/loader/loadPly";

const toy = initToy();


let mat = new Material({
    shader: {
        attributes: {
            POSITION: VertexAttEnum.POSITION,
        },
        vsStr: `attribute vec3 POSITION;
        uniform highp mat4 czm_modelViewP;
        uniform highp float u_size;
        void main()
        {
            gl_PointSize=u_size;
            highp vec4 temp_1=vec4(POSITION.xyz,1.0);
            gl_Position = czm_modelViewP * temp_1;
        }`,
        fsStr: `uniform highp vec4 MainColor;
        void main()
        {
            gl_FragData[0] = MainColor;
        }`
    },
    uniformParameters: {
        "u_size": 5.0
    }
});


toy.resource.registerAssetLoader(".ply", new LoadPLY())
toy.resource.load<Geometry>("./aisland.ply")
    .then(asset => {
        toy.scene.addRenderIns({
            geometry: asset,
            material: DefaultMaterial.color_3d.clone(),
            worldMat: mat4.clone(mat4.IDENTITY)
        });

        toy.scene.mainCamera.lookAtPoint(asset.boundingBox.center);
    });
