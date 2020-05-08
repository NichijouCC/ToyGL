import { Vec4 } from "../../../mathD/vec4";
import { IgltfJson } from "../LoadglTF";
import { ParseTextureNode } from "./ParseTextureNode";
import { Vec3 } from "../../../mathD/vec3";
import { Color } from "../../../mathD/color";
import { Material } from '../../../scene/asset/material/Material';
import { VertexAttEnum } from "../../../webgl/VertexAttEnum";
import { DefaultMaterial } from "../../defAssets/DefaultMaterial";


namespace Private {
    export const defmat = new Material({
        uniformParameters: {
            MainColor: Color.create(1.0, 1.0, 1.0, 1.0)
        },
        shaderOption: {
            attributes: {
                POSITION: VertexAttEnum.POSITION,
                TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
            },
            vsStr: `precision highp float;
            attribute vec3 TEXCOORD_0;
            uniform mat4 czm_modelViewp;
            varying mediump vec2 xlv_TEXCOORD0;
            #ifdef SKIN
            attribute vec4 skinIndex;
            attribute vec4 skinWeight;
            uniform mat4 czm_boneMatrices[40];
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
            #endif
            attribute vec3 POSITION;
            void main()
            {
                vec4 position=vec4(POSITION.xyz,1.0);
                #ifdef SKIN
                position =calcVertex(position,skinIndex,skinWeight);
                #endif

                xlv_TEXCOORD0 = TEXCOORD_0.xy;
                gl_Position = czm_modelViewp * position;
            }`,
            fsStr: `precision highp float;
            uniform vec4 MainColor;
            varying vec2 xlv_TEXCOORD0;
            uniform sampler2D MainTex;
            void main()
            {
                gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0)*MainColor;
            }`
        }
    });
}

export class ParseMaterialNode {
    static parse(index: number, gltf: IgltfJson): Promise<Material> {
        if (gltf.cache.materialNodeCache[index]) {
            return gltf.cache.materialNodeCache[index];
        } else {
            // if (gltf.materials == null)
            // {
            //     return Promise.resolve(null);
            // }
            let node = gltf.materials[index];

            if (node.pbrMetallicRoughness?.baseColorTexture != null) {
                let mat = new Material();
                mat.setUniformParameter("MainColor", Color.create(1.0, 1.0, 1.0, 1));
                mat.shader = Private.defmat.shader;
                return ParseTextureNode.parse(node.pbrMetallicRoughness?.baseColorTexture.index, gltf)
                    .then(tex => {
                        mat.setUniformParameter("MainTex", tex);
                        return mat;
                    });
            } else {
                let mat = DefaultMaterial.color_3d;
                return Promise.resolve(mat);
            }


            //     let baseVs =
            //     "\
            //   attribute vec3 POSITION;\
            //   uniform highp mat4 czm_modelViewp;\
            //   void main()\
            //   {\
            //       highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
            //       gl_Position = czm_modelViewp * tmplet_1;\
            //   }";

            // let baseFs =
            //     "\
            //     uniform highp vec4 MainColor;\
            //     void main()\
            //     {\
            //         gl_FragData[0] = MainColor;\
            //     }";
            // mat.setUniformParameter("MainColor", Color.create());
            // // mat.setUniformParameter("_MainTex", DefTextrue.GIRD);
            // //-------------loadshader
            // // let pbrShader = assetMgr.load("resource/shader/pbr_glTF.shader.json") as Shader;
            // // mat.setShader(pbrShader);
            // if (node.pbrMetallicRoughness)
            // {
            //     let nodeMR = node.pbrMetallicRoughness;
            //     if (nodeMR.baseColorFactor)
            //     {
            //         let baseColorFactor = Vec4.create();
            //         Vec4.copy(nodeMR.baseColorFactor, baseColorFactor);
            //         mat.setUniformParameter("u_BaseColorFactor", baseColorFactor);
            //     }
            //     if (nodeMR.metallicFactor != null)
            //     {
            //         mat.setUniformParameter("u_metalFactor", nodeMR.metallicFactor);
            //     }
            //     if (nodeMR.roughnessFactor != null)
            //     {
            //         mat.setUniformParameter("u_roughnessFactor", nodeMR.roughnessFactor);
            //     }
            //     if (nodeMR.baseColorTexture != null)
            //     {
            //         let tex = ParseTextureNode.parse(nodeMR.baseColorTexture.index, gltf).then(tex =>
            //         {
            //             mat.setUniformParameter("u_BaseColorSampler", tex);
            //             mat.setUniformParameter("_MainTex", tex);
            //             console.warn("@@@@@@@@@", mat);
            //         });
            //     }
            //     if (nodeMR.metallicRoughnessTexture)
            //     {
            //         let tex = ParseTextureNode.parse(nodeMR.metallicRoughnessTexture.index, gltf).then(tex =>
            //         {
            //             mat.setUniformParameter("u_MetallicRoughnessSampler", tex);
            //         });
            //     }
            // }
            // if (node.normalTexture)
            // {
            //     let nodet = node.normalTexture;
            //     let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
            //     {
            //         mat.setUniformParameter("u_NormalSampler", tex);
            //     });
            //     // mat.setTexture("u_NormalSampler",tex);
            //     if (nodet.scale)
            //     {
            //         mat.setUniformParameter("u_NormalScale", nodet.scale);
            //     }
            // }
            // if (node.emissiveTexture)
            // {
            //     let nodet = node.emissiveTexture;
            //     let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
            //     {
            //         mat.setUniformParameter("u_EmissiveSampler", tex);
            //     });
            // }
            // if (node.emissiveFactor)
            // {
            //     let ve3 = Vec3.create();
            //     Vec3.copy(node.emissiveFactor, ve3);
            //     mat.setUniformParameter("u_EmissiveFactor", ve3);
            // }
            // if (node.occlusionTexture)
            // {
            //     let nodet = node.occlusionTexture;
            //     if (nodet.strength)
            //     {
            //         mat.setUniformParameter("u_OcclusionStrength", nodet.strength);
            //     }
            // }

            // // let brdfTex = assetMgr.load("resource/texture/brdfLUT.imgdes.json") as Texture;
            // // mat.setTexture("u_brdfLUT", brdfTex);

            // // let e_cubeDiff: CubeTexture = new CubeTexture();
            // // let e_diffuseArr: string[] = [];
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_right_0.jpg");
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_left_0.jpg");
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_top_0.jpg");
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_bottom_0.jpg");
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_front_0.jpg");
            // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_back_0.jpg");
            // // e_cubeDiff.groupCubeTexture(e_diffuseArr);

            // // let env_speTex = new CubeTexture();
            // // for (let i = 0; i < 10; i++) {
            // //     let urlarr = [];
            // //     urlarr.push("resource/texture/papermill/specular/specular_right_" + i + ".jpg");
            // //     urlarr.push("resource/texture/papermill/specular/specular_left_" + i + ".jpg");
            // //     urlarr.push("resource/texture/papermill/specular/specular_top_" + i + ".jpg");
            // //     urlarr.push("resource/texture/papermill/specular/specular_bottom_" + i + ".jpg");
            // //     urlarr.push("resource/texture/papermill/specular/specular_front_" + i + ".jpg");
            // //     urlarr.push("resource/texture/papermill/specular/specular_back_" + i + ".jpg");
            // //     env_speTex.groupMipmapCubeTexture(urlarr, i, 9);
            // // }
            // // mat.setCubeTexture("u_DiffuseEnvSampler", e_cubeDiff);
            // // mat.setCubeTexture("u_SpecularEnvSampler", env_speTex);

            // return Promise.resolve(mat);
        }
    }
}
