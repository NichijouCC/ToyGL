import { Shader } from "../../render/shader";
import { VertexAttEnum } from "../../webgl";

namespace Private {
    export const color_2d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION
        },
        vsStr: `attribute vec3 POSITION;
                void main()
                {
                    vec4 temp_1=vec4(POSITION.xyz,1.0);\
                    gl_Position = temp_1;\
                }`,
        fsStr: `precision highp float;
                uniform  vec4 MainColor;
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
                varying vec2 xlv_TEXCOORD0;
                void main()
                {
                    xlv_TEXCOORD0 = TEXCOORD_0.xy;
                    gl_Position = vec4(POSITION.xyz,1.0);
                }`,
        fsStr: `precision highp float;
                uniform vec4 MainColor;
                uniform sampler2D MainTex;
                varying vec2 xlv_TEXCOORD0;
                void main()
                {
                    gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0);
                }`
    });

    export const color_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
        },
        vsStr: `attribute vec3 POSITION;
                uniform mat4 czm_modelViewP;
                void main()
                {
                    vec4 temp_1=vec4(POSITION.xyz,1.0);
                    gl_Position = czm_modelViewP * temp_1;
                }`,
        fsStr: `precision highp float;
                uniform  vec4 MainColor;
                void main()
                {
                    gl_FragData[0] = MainColor;
                }`
    });

    const fsStr = `precision highp float;
                    uniform vec4 MainColor;
                    #ifdef DIFFUSEMAP
                    varying vec2 xlv_TEXCOORD0;
                    uniform sampler2D MainTex;
                    #endif
                    #ifdef AlPHACUT
                    uniform float czm_alphaCut;
                    #endif

                    #ifdef INS_COLOR
                    varying vec4 v_a_color;
                    #endif

                    void main()
                    {
                        vec4 outColor=MainColor;
                        #ifdef DIFFUSEMAP
                        outColor=outColor*texture2D(MainTex, xlv_TEXCOORD0);
                        #endif

                        #ifdef INS_COLOR
                        outColor=outColor*v_a_color;
                        #endif

                        #ifdef AlPHACUT
                        if(outColor.a<czm_alphaCut){
                            discard;
                        }
                        #endif
                        gl_FragData[0] = outColor;
                    }`

    export const unlit_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
            skinIndex: VertexAttEnum.JOINTS_0,
            skinWeight: VertexAttEnum.WEIGHTS_0,
            ins_mat4: VertexAttEnum.INS_MAT4,
            ins_color: VertexAttEnum.INS_COLOR,
        },
        vsStr: `attribute vec4 POSITION;
        attribute vec2 TEXCOORD_0;
        varying vec2 xlv_TEXCOORD0;

        #ifdef SKIN
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
        uniform mat4 czm_boneMatrices[200];
        uniform mat4 czm_viewP;
        vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
        {
            int i = int(blendIndex.x);  
            int i2 =int(blendIndex.y);
            int i3 =int(blendIndex.z);
            int i4 =int(blendIndex.w);
            
            mat4 mat = czm_boneMatrices[i]*blendWeight.x 
                    + czm_boneMatrices[i2]*blendWeight.y 
                    + czm_boneMatrices[i3]*blendWeight.z 
                    + czm_boneMatrices[i4]*blendWeight.w;
            return mat* srcVertex;
        }

        #ifdef INS_MAT
        attribute mat4 INS_MAT;
        #endif

        #else

        #ifdef INS_MAT
        uniform mat4 czm_viewP;
        attribute mat4 ins_mat4;
        #else
        uniform mat4 czm_modelViewP;
        #endif

        #endif

        #ifdef INS_COLOR
        attribute vec4 ins_color;
        varying vec4 v_a_color;
        #endif

        void main()
        {
            vec4 position = vec4(POSITION.xyz,1.0);
            #ifdef SKIN
            position =calcVertex(position,skinIndex,skinWeight);

            #ifdef INS_MAT
            gl_Position = czm_viewP *ins_mat4* position;
            #else
            gl_Position = czm_viewP * position;
            #endif

            #else

            #ifdef INS_MAT
            gl_Position = czm_viewP *ins_mat4 * position;
            #else
            gl_Position = czm_modelViewP * position;
            #endif

            #endif

            #ifdef INS_COLOR
            v_a_color=ins_color;
            #endif

            xlv_TEXCOORD0 = TEXCOORD_0.xy;
        }`,
        fsStr: fsStr
    });
    /**
     * 优化骨骼运算，每个骨骼占用：1 location + 1 quat
     */
    export const unlit_3d_1 = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
            skinIndex: VertexAttEnum.JOINTS_0,
            skinWeight: VertexAttEnum.WEIGHTS_0,
        },
        vsStr: `attribute vec3 TEXCOORD_0;
        varying vec2 xlv_TEXCOORD0;
        #ifdef SKIN
        uniform mat4 czm_viewP;
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
        uniform float czm_boneMatrices[450];
        
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
        #else
        uniform mat4 czm_modelViewP;
        #endif
        attribute vec3 POSITION;
        void main()
        {
            vec4 position=vec4(POSITION.xyz,1.0);
            #ifdef SKIN
            position =calcVertex(position,skinIndex,skinWeight);
            gl_Position = czm_viewP * position;
            #else
            gl_Position = czm_modelViewP * position;
            #endif
            xlv_TEXCOORD0 = TEXCOORD_0.xy;
        }`,
        fsStr: fsStr
    });

    export const lit_3d = new Shader({
        attributes: {
            POSITION: VertexAttEnum.POSITION,
            TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
            skinIndex: VertexAttEnum.JOINTS_0,
            skinWeight: VertexAttEnum.WEIGHTS_0,
            ins_mat4: VertexAttEnum.INS_MAT4,
            ins_color: VertexAttEnum.INS_COLOR,
        },
        vsStr: `attribute vec4 POSITION;
        attribute vec2 TEXCOORD_0;
        varying vec2 xlv_TEXCOORD0;

        #ifdef SKIN
        attribute vec4 skinIndex;
        attribute vec4 skinWeight;
        uniform mat4 czm_boneMatrices[65];
        uniform mat4 czm_viewP;
        vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
        {
            int i = int(blendIndex.x);  
            int i2 =int(blendIndex.y);
            int i3 =int(blendIndex.z);
            int i4 =int(blendIndex.w);
            
            mat4 mat = czm_boneMatrices[i]*blendWeight.x 
                    + czm_boneMatrices[i2]*blendWeight.y 
                    + czm_boneMatrices[i3]*blendWeight.z 
                    + czm_boneMatrices[i4]*blendWeight.w;
            return mat* srcVertex;
        }

        #ifdef INS_MAT
        attribute mat4 INS_MAT;
        #endif

        #else

        #ifdef INS_MAT
        uniform mat4 czm_viewP;
        attribute mat4 ins_mat4;
        #else
        uniform mat4 czm_modelViewP;
        #endif

        #endif

        #ifdef INS_COLOR
        attribute vec4 ins_color;
        varying vec4 v_a_color;
        #endif

        void main()
        {
            vec4 position = vec4(POSITION.xyz,1.0);
            #ifdef SKIN
            position =calcVertex(position,skinIndex,skinWeight);

            #ifdef INS_MAT
            gl_Position = czm_viewP *ins_mat4* position;
            #else
            gl_Position = czm_viewP * position;
            #endif

            #else

            #ifdef INS_MAT
            gl_Position = czm_viewP *ins_mat4 * position;
            #else
            gl_Position = czm_modelViewP * position;
            #endif

            #endif

            #ifdef INS_COLOR
            v_a_color=ins_color;
            #endif

            xlv_TEXCOORD0 = TEXCOORD_0.xy;
        }`,
        fsStr: fsStr
    })

}
export class DefaultShader {
    static get color_2d() { return Private.color_2d; };
    static get color_3d() { return Private.color_3d; };
    static get tex_2d() { return Private.tex_2d; };
    static get unlit_3d() { return Private.unlit_3d; };
    static get unlit_3d_1() { return Private.unlit_3d_1; };
}
