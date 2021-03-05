import { Shader } from "../../scene/asset/material/shader";
import { VertexAttEnum } from "../../webgl/vertexAttEnum";
import baseVs from "../../shaders/Unlit.vert.glsl";
import baseFs from "../../shaders/Unlit.frag.glsl";

namespace Private {
    export const color_2d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION
        },
        vsStr: `attribute vec3 POSITION;
        void main()
        {
            highp vec4 temp_1=vec4(POSITION.xyz,1.0);\
            gl_Position = temp_1;\
        }`,
        fsStr: `uniform highp vec4 MainColor;
        void main()
        {
            gl_FragData[0] = MainColor;
        }`
    });
    export const tex_2d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: `attribute vec3 POSITION;
          attribute vec2 TEXCOORD_0;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              highp vec4 temp_1=vec4(POSITION.xyz*2.0,1.0);
              xlv_TEXCOORD0 = TEXCOORD_0.xy;
              gl_Position = temp_1;
          }`,
        fsStr: `uniform highp vec4 MainColor;
          uniform lowp sampler2D MainTex;
          varying mediump vec2 xlv_TEXCOORD0;
          void main()
          {
              gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0);
          }`
    });

    export const color_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: `attribute vec3 POSITION;
        uniform highp mat4 czm_modelViewP;
        void main()
        {
            highp vec4 temp_1=vec4(POSITION.xyz,1.0);
            gl_Position = czm_modelViewP * temp_1;
        }`,
        fsStr: `uniform highp vec4 MainColor;
        void main()
        {
            gl_FragData[0] = MainColor;
        }`
    });
    export const tex_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: `precision highp float;
        attribute vec3 TEXCOORD_0;
        uniform mat4 czm_modelViewP;
        varying mediump vec2 xlv_TEXCOORD0;
        #ifdef SKIN
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
        uniform float czm_boneMatrices[420];
        
        vec3 rotate_vector( vec4 quat, vec3 vec )
        {
            //return vec + 2.0 * cross( cross( vec, quat.xyz ) + quat.w * vec, quat.xyz );
            return vec + 2.0 * cross( quat.xyz,cross(quat.xyz, vec ) + quat.w * vec );
        }
        
        vec3 blendBone(vec3 point,int boneIndex){
            vec3 m= vec3(czm_boneMatrices[boneIndex*7+0],czm_boneMatrices[boneIndex*7+1],czm_boneMatrices[boneIndex*7+2]);
            vec4 q= vec4(czm_boneMatrices[boneIndex*7+3],czm_boneMatrices[boneIndex*7+4],czm_boneMatrices[boneIndex*7+5],czm_boneMatrices[boneIndex*7+6]);
            
            vec3 rotatedPos= rotate_vector(q,point);
            rotatedPos += m;
            return rotatedPos;
        }
        
        vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
        {
            int i = int(blendIndex.x);  
            int i2 =int(blendIndex.y);
            int i3 =int(blendIndex.z);
            int i4 =int(blendIndex.w);

            vec3 endPos=blendBone(srcVertex.xyz,i)*blendWeight.x
                    +blendBone(srcVertex.xyz,i2)*blendWeight.y
                    +blendBone(srcVertex.xyz,i3)*blendWeight.z
                    +blendBone(srcVertex.xyz,i4)*blendWeight.w;
        
            return vec4(endPos,1.0);
        }
        #endif
        attribute vec3 POSITION;
        void main()
        {
            vec4 position=vec4(POSITION.xyz,1.0);
            #ifdef SKIN
            position =calcVertex(position,skinIndex,skinWeight);
            #endif

            xlv_TEXCOORD0 = TEXCOORD_0.xy;
            gl_Position = czm_modelViewP * position;
        }`,
        fsStr: `precision highp float;
        uniform vec4 MainColor;
        varying vec2 xlv_TEXCOORD0;
        uniform sampler2D MainTex;
        #ifdef AlPHACUT
        uniform float czm_alphaCut;
        #endif
        void main()
        {
            vec4 outColor=texture2D(MainTex, xlv_TEXCOORD0)*MainColor;
            outColor.a=1.0;
            #ifdef AlPHACUT
            if(outColor.a<czm_alphaCut){
                discard;
            }
            #endif
            gl_FragData[0] = outColor;
        }`
    });

    export const unlit_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0
        },
        vsStr: baseVs,
        fsStr: baseFs
    });
}
export class DefaultShader {
    static get color_2d() { return Private.color_2d; };
    static get color_3d() { return Private.color_3d; };
    static get tex_2d() { return Private.tex_2d; };
    static get tex_3d() { return Private.tex_3d; };
    static get unlit_3d() { return Private.unlit_3d; };
}
