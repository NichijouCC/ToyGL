import { DefTextrue } from './../defAssets/defTexture';
import { Vec4 } from "../../mathD/vec4";
import { IgltfJson } from "./loadglTF";
import { ParseTextureNode } from "./parseTextureNode";
import { Vec3 } from "../../mathD/vec3";
import { DefShader } from "../defAssets/defShader";
import { Color } from "../../mathD/color";
import { Material } from '../../scene/asset/Material';

export class ParseMaterialNode
{
    static parse(index: number, gltf: IgltfJson): Promise<Material>
    {
        if (gltf.cache.materialNodeCache[index])
        {
            return gltf.cache.materialNodeCache[index];
        } else
        {
            if (gltf.materials == null)
            {
                return Promise.resolve(null);
            }
            let node = gltf.materials[index];
            let mat = new Material(node.name);
            mat.setParameter("MainColor", Color.create());
            mat.setParameter("_MainTex", DefTextrue.GIRD);
            //-------------loadshader
            // let pbrShader = assetMgr.load("resource/shader/pbr_glTF.shader.json") as Shader;
            // mat.setShader(pbrShader);
            if (node.pbrMetallicRoughness)
            {
                let nodeMR = node.pbrMetallicRoughness;
                if (nodeMR.baseColorFactor)
                {
                    let baseColorFactor = Vec4.create();
                    Vec4.copy(nodeMR.baseColorFactor, baseColorFactor);
                    mat.setParameter("u_BaseColorFactor", baseColorFactor);
                }
                if (nodeMR.metallicFactor != null)
                {
                    mat.setParameter("u_metalFactor", nodeMR.metallicFactor);
                }
                if (nodeMR.roughnessFactor != null)
                {
                    mat.setParameter("u_roughnessFactor", nodeMR.roughnessFactor);
                }
                if (nodeMR.baseColorTexture != null)
                {
                    let tex = ParseTextureNode.parse(nodeMR.baseColorTexture.index, gltf).then(tex =>
                    {
                        mat.setParameter("u_BaseColorSampler", tex);
                        mat.setParameter("_MainTex", tex);
                        console.warn("@@@@@@@@@", mat);
                    });
                }
                if (nodeMR.metallicRoughnessTexture)
                {
                    let tex = ParseTextureNode.parse(nodeMR.metallicRoughnessTexture.index, gltf).then(tex =>
                    {
                        mat.setParameter("u_MetallicRoughnessSampler", tex);
                    });
                }
            }
            if (node.normalTexture)
            {
                let nodet = node.normalTexture;
                let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
                {
                    mat.setParameter("u_NormalSampler", tex);
                });
                // mat.setTexture("u_NormalSampler",tex);
                if (nodet.scale)
                {
                    mat.setParameter("u_NormalScale", nodet.scale);
                }
            }
            if (node.emissiveTexture)
            {
                let nodet = node.emissiveTexture;
                let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
                {
                    mat.setParameter("u_EmissiveSampler", tex);
                });
            }
            if (node.emissiveFactor)
            {
                let ve3 = Vec3.create();
                Vec3.copy(node.emissiveFactor, ve3);
                mat.setParameter("u_EmissiveFactor", ve3);
            }
            if (node.occlusionTexture)
            {
                let nodet = node.occlusionTexture;
                if (nodet.strength)
                {
                    mat.setParameter("u_OcclusionStrength", nodet.strength);
                }
            }

            // let brdfTex = assetMgr.load("resource/texture/brdfLUT.imgdes.json") as Texture;
            // mat.setTexture("u_brdfLUT", brdfTex);

            // let e_cubeDiff: CubeTexture = new CubeTexture();
            // let e_diffuseArr: string[] = [];
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_right_0.jpg");
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_left_0.jpg");
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_top_0.jpg");
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_bottom_0.jpg");
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_front_0.jpg");
            // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_back_0.jpg");
            // e_cubeDiff.groupCubeTexture(e_diffuseArr);

            // let env_speTex = new CubeTexture();
            // for (let i = 0; i < 10; i++) {
            //     let urlarr = [];
            //     urlarr.push("resource/texture/papermill/specular/specular_right_" + i + ".jpg");
            //     urlarr.push("resource/texture/papermill/specular/specular_left_" + i + ".jpg");
            //     urlarr.push("resource/texture/papermill/specular/specular_top_" + i + ".jpg");
            //     urlarr.push("resource/texture/papermill/specular/specular_bottom_" + i + ".jpg");
            //     urlarr.push("resource/texture/papermill/specular/specular_front_" + i + ".jpg");
            //     urlarr.push("resource/texture/papermill/specular/specular_back_" + i + ".jpg");
            //     env_speTex.groupMipmapCubeTexture(urlarr, i, 9);
            // }
            // mat.setCubeTexture("u_DiffuseEnvSampler", e_cubeDiff);
            // mat.setCubeTexture("u_SpecularEnvSampler", env_speTex);

            return Promise.resolve(mat);
        }
    }
}
