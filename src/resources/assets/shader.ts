import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { IprogramInfo, GlRender } from "../../render/glRender";
import { RenderLayerEnum } from "../../ec/ec";
import { IprogramState, IuniformInfo, IattributeInfo, IprogramOptions } from "twebgl/dist/types/type";
import { VertexAttEnum } from "../../render/vertexAttType";

export class Shader extends ToyAsset {
    layer: RenderLayerEnum = RenderLayerEnum.Geometry;
    queue: number = 0;
    mapUniformDef: { [key: string]: { type: UniformTypeEnum; value: any } };
    passes: { [feature: string]: IprogramInfo[] };

    constructor(param?: ItoyAsset) {
        super(param);
    }

    static fromCustomData(data: IshaderOptions) {
        let newAsset = new Shader({ name: data.name || "custom_shader" });
        newAsset.layer = data.layer || RenderLayerEnum.Geometry;
        newAsset.queue = data.queue != null ? data.queue : 0;

        let features = data.feature != null ? [...data.feature, "base"] : ["base"];
        let passes = data.passes;

        let featurePasses: { [feature: string]: IprogramInfo[] } = {};
        for (let i = 0; i < features.length; i++) {
            let type = features[i];
            let featureStr = getFeaturShderStr(type);

            let programArr = [];
            for (let i = 0; i < passes.length; i++) {
                let passitem = passes[i];
                let program = GlRender.createProgram({
                    program: {
                        vs: featureStr + (passitem.program as any).vs,
                        fs: featureStr + (passitem.program as any).fs,
                        name: null,
                    },
                    states: passitem.states,
                    uniforms: passitem.uniforms,
                });
                programArr.push(program);
            }

            featurePasses[type] = programArr;
        }

        newAsset.passes = featurePasses;
        if (data.mapUniformDef != null) {
            newAsset.mapUniformDef = {};
            for (const key in data.mapUniformDef) {
                const _value = data.mapUniformDef[key];
                newAsset.mapUniformDef[key] = { value: _value, type: UniformTypeEnum.UNKOWN };
            }
        }
        return newAsset;
    }
    dispose(): void {}
}

export interface IshaderInfo {
    layer: RenderLayerEnum;
    queue: number;
    mapUniformDef: { [key: string]: { type: UniformTypeEnum; value: any } };
    passes: { [feature: string]: IprogramInfo[] };
}

export enum UniformTypeEnum {
    FLOAT,
    FLOAT_VEC2,
    FLOAT_VEC3,
    FLOAT_VEC4,
    TEXTURE,
    UNKOWN,
}

export interface IshaderOptions {
    layer?: RenderLayerEnum;
    queue?: number;
    passes: IprogramOptions[];
    feature?: string[];
    name?: string;
    mapUniformDef?: { [key: string]: any };
}

export function getFeaturShderStr(type: string) {
    switch (type) {
        case "base":
            return "";
        case "fog":
            return "#define FOG \n";
        case "skin":
            return "#define SKIN \n";
        case "skin_fog":
            return "#define SKIN \n" + "#define FOG \n";
        case "lightmap":
            return "#define LIGHTMAP \n";
        case "lightmap_fog":
            return "#define LIGHTMAP \n" + "#define FOG \n";
        case "instance":
            return "#define INSTANCE \n";
    }
}
