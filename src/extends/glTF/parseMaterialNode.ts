import { IGltfJson } from "./loadGltf";
import { ParseTextureNode } from "./parseTextureNode";
import { MaterialAlphaMode } from "./gltfJsonStruct";
import { Color, DefaultMaterial, DefaultTexture, Material, RenderTypeEnum, ShaderFeat, SkinInstance, SkinMode } from "../../index";

// namespace Private {
//     /**
//      * perBone one mat4，使用root坐标系
//      */
//     export const defMat = new Material({
//         uniformParameters: {
//             MainColor: Color.create(1.0, 1.0, 1.0, 1.0)
//         },
//         shader: {
//             attributes: {
//                 POSITION: VertexAttEnum.POSITION,
//                 TEXCOORD_0: VertexAttEnum.TEXCOORD_0
//             },
//             vsStr: `precision highp float;
//             attribute vec3 TEXCOORD_0;
//             uniform mat4 czm_modelViewP;
//             varying mediump vec2 xlv_TEXCOORD0;
//             #ifdef SKIN
//             attribute vec4 skinIndex;
//             attribute vec4 skinWeight;
//             uniform mat4 czm_boneMatrices[60];
//             vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
//             {
//                 int i = int(blendIndex.x);  
//                 int i2 =int(blendIndex.y);
//                 int i3 =int(blendIndex.z);
//                 int i4 =int(blendIndex.w);

//                 mat4 mat = czm_boneMatrices[i]*blendWeight.x 
//                         + czm_boneMatrices[i2]*blendWeight.y 
//                         + czm_boneMatrices[i3]*blendWeight.z 
//                         + czm_boneMatrices[i4]*blendWeight.w;
//                 return mat* srcVertex;
//             }
//             #endif
//             attribute vec3 POSITION;
//             void main()
//             {
//                 vec4 position=vec4(POSITION.xyz,1.0);
//                 #ifdef SKIN
//                 position =calcVertex(position,skinIndex,skinWeight);
//                 #endif

//                 xlv_TEXCOORD0 = TEXCOORD_0.xy;
//                 gl_Position = czm_modelViewP * position;
//             }`,
//             fsStr: `precision highp float;
//             uniform vec4 MainColor;
//             varying vec2 xlv_TEXCOORD0;
//             uniform sampler2D MainTex;
//             #ifdef AlPHACUT
//             uniform float czm_alphaCut;
//             #endif
//             void main()
//             {
//                 vec4 outColor=texture2D(MainTex, xlv_TEXCOORD0)*MainColor;

//                 #ifdef AlPHACUT
//                 if(outColor.a<czm_alphaCut){
//                     discard;
//                 }
//                 #endif
//                 gl_FragData[0] = outColor;
//             }`
//         }
//     });
//     /**
//      * perBone：1 location + 1 quat,使用world坐标系
//      * 
//      * @description
//      * 7*60=420<128*4;
//      */
//     export const defMat2 = new Material({
//         uniformParameters: {
//             MainColor: Color.create(1.0, 1.0, 1.0, 1.0)
//         },
//         shader: {
//             attributes: {
//                 POSITION: VertexAttEnum.POSITION,
//                 TEXCOORD_0: VertexAttEnum.TEXCOORD_0
//             },
//             vsStr: `precision highp float;
//             attribute vec3 TEXCOORD_0;
//             uniform mat4 czm_modelViewP;
//             varying mediump vec2 xlv_TEXCOORD0;
//             uniform mat4 czm_viewP;
//             #ifdef SKIN
//             attribute vec4 skinIndex;
//             attribute vec4 skinWeight;
//             uniform float czm_boneMatrices[450];

//             vec3 rotate_vector( vec4 quat, vec3 vec )
//             {
//                 //return vec + 2.0 * cross( cross( vec, quat.xyz ) + quat.w * vec, quat.xyz );
//                 return vec + 2.0 * cross( quat.xyz,cross(quat.xyz, vec ) + quat.w * vec );
//             }

//             vec3 blendBone(vec3 point,int boneIndex){
//                 vec3 m= vec3(czm_boneMatrices[boneIndex*7+0],czm_boneMatrices[boneIndex*7+1],czm_boneMatrices[boneIndex*7+2]);
//                 vec4 q= vec4(czm_boneMatrices[boneIndex*7+3],czm_boneMatrices[boneIndex*7+4],czm_boneMatrices[boneIndex*7+5],czm_boneMatrices[boneIndex*7+6]);

//                 vec3 rotatedPos= rotate_vector(q,point);
//                 rotatedPos += m;
//                 return rotatedPos;
//             }

//             vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
//             {
//                 int i = int(blendIndex.x);  
//                 int i2 =int(blendIndex.y);
//                 int i3 =int(blendIndex.z);
//                 int i4 =int(blendIndex.w);

//                 vec3 endPos=blendBone(srcVertex.xyz,i)*blendWeight.x
//                         +blendBone(srcVertex.xyz,i2)*blendWeight.y
//                         +blendBone(srcVertex.xyz,i3)*blendWeight.z
//                         +blendBone(srcVertex.xyz,i4)*blendWeight.w;

//                 return vec4(endPos,1.0);
//             }
//             #endif
//             attribute vec3 POSITION;
//             void main()
//             {
//                 vec4 position=vec4(POSITION.xyz,1.0);
//                 #ifdef SKIN
//                 position =calcVertex(position,skinIndex,skinWeight);
//                 gl_Position = czm_viewP * position;
//                 #else
//                 gl_Position = czm_modelViewP * position;
//                 #endif
//                 xlv_TEXCOORD0 = TEXCOORD_0.xy;

//             }`,
//             fsStr: `precision highp float;
//             uniform vec4 MainColor;
//             varying vec2 xlv_TEXCOORD0;
//             uniform sampler2D MainTex;
//             #ifdef AlPHACUT
//             uniform float czm_alphaCut;
//             #endif
//             void main()
//             {
//                 vec4 outColor=texture2D(MainTex, xlv_TEXCOORD0)*MainColor;
//                 outColor.a=1.0;
//                 #ifdef AlPHACUT
//                 if(outColor.a<czm_alphaCut){
//                     discard;
//                 }
//                 #endif
//                 gl_FragData[0] = outColor;
//             }`
//         }
//     });
// }

export class ParseMaterialNode {
    static async parse(index: number, gltf: IGltfJson): Promise<Material> {
        if (gltf.cache.materialNodeCache[index]) {
            return gltf.cache.materialNodeCache[index];
        } else {
            const node = gltf.materials[index];

            const mat = new Material();
            if (node.pbrMetallicRoughness?.baseColorTexture != null) {
                mat.setUniform("MainColor", Color.create(1.0, 1.0, 1.0, 1));
                if (SkinInstance.skinMode == SkinMode.UNIFORM_MATS) {
                    mat.shader = DefaultMaterial.unlit_3d.shader;
                } else if (SkinInstance.skinMode == SkinMode.UNIFORM_ARRAY) {
                    mat.shader = DefaultMaterial.unlit_3d_1.shader;
                }

                await ParseTextureNode.parse(node.pbrMetallicRoughness?.baseColorTexture.index, gltf)
                    .then(tex => {
                        mat.setUniform("MainTex", tex);
                    });
            } else {
                mat.shader = DefaultMaterial.unlit_3d.shader;
                mat.setUniform("MainTex", DefaultTexture.white);
                const baseColor = node.pbrMetallicRoughness?.baseColorFactor;
                if (baseColor) {
                    mat.setUniform("MainColor", Color.create(baseColor[0], baseColor[1], baseColor[2], baseColor[3]));
                } else {
                    mat.setUniform("MainColor", Color.create(1.0, 1.0, 1.0, 1.0))
                }
            }
            if (node.doubleSided) {
                mat.renderState.cull.enable = false;
            }
            if (node.alphaMode != null) {
                switch (node.alphaMode) {
                    case MaterialAlphaMode.OPAQUE:
                        break;
                    case MaterialAlphaMode.BLEND:
                        mat.renderState.blend.enable = true;
                        mat.customRenderType = RenderTypeEnum.TRANSPARENT;
                        mat.renderState.depth.depthWrite = false;
                        break;
                    case MaterialAlphaMode.MASK:
                        mat.shader.bucketFeats = ShaderFeat.AlPHA_CUT;
                        break;
                }
            }
            return mat;
        }
    }
}
