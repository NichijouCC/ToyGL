import { Color, DefaultMaterial, Geometry, LoadPLY, ManualCamera, mat4, Material, vec3, VertexAttEnum } from "TOYGL";
import { initToy } from "./util";

const toy = initToy();


let mat = new Material({
    shader: {
        attributes: {
            POSITION: VertexAttEnum.POSITION,
        },
        vsStr: `attribute vec3 POSITION;
        uniform mat4 czm_modelViewP;
        uniform float u_size;
        uniform float height_top;
        uniform float height_bottom;
        vec4 RGBTop = vec4(1.0,0.0,0.0,1.0); //red
        vec4 RGBMiddle = vec4(0.0,1.0,0.0,1.0); // green
        vec4 RGBBottom = vec4(0.0,0.0,1.0,1.0); // blue
        varying vec4 v_color;
        void main()
        {
            gl_PointSize=u_size;
        
            //计算颜色
            vec4 black = vec4(0.,0.,0.,1.);
            float p_h=(POSITION.y - height_bottom)/(height_top - height_bottom);
            float h = 1./3.; // adjust position of middleColor
            float h2 = 2./3.; // adjust position of middleColor
        
            vec4 col1 = p_h < h ? mix(RGBBottom, RGBMiddle, p_h/h) : black;
            vec4 c2b = mix(RGBMiddle, RGBTop, (p_h - h)/(1.0 - h2));
            vec4 col2 = h < p_h ? p_h < h2 ? c2b :black : black;
            vec4 c3b = mix(RGBTop, RGBBottom, (p_h - h2)/(1.0 - h2));
            vec4 col3 = h2<p_h ? p_h<1. ? c3b : black : black;    
            v_color = col1+col2+col3;
            
            vec4 temp_1=vec4(POSITION.xyz,1.0);
            gl_Position = czm_modelViewP * temp_1;
        }`,
        fsStr: `precision mediump float;
        uniform vec4 MainColor;
        varying vec4 v_color;
        void main()
        {
            gl_FragData[0] = v_color;
        }`
    },
    uniformParameters: {
        "u_size": 5.0,
        "height_top": 10,
        "height_bottom": 0,
        "MainColor": new Color(1.0, 0.0, 0.0, 1.0)
    }
});


toy.resource.registLoaderWithExt(".ply", new LoadPLY())
toy.resource.load<Geometry>("./aisland.ply")
    .then(asset => {
        toy.scene.addRenderIns({
            geometry: asset,
            material: mat,
            worldMat: mat4.clone(mat4.IDENTITY)
        });
        let { center, halfSize } = asset.boundingBox;
        toy.scene.mainCamera.viewTargetPoint(center, 400, vec3.fromValues(-90, 0, 0));
        let height_top = center[1] + halfSize[1];
        let height_bottom = center[1] - halfSize[1];

        mat.setUniform("height_top", height_top);
        mat.setUniform("height_bottom", height_bottom);

        toy.scene.mainCamera.entity.addComponent(ManualCamera)
    });
