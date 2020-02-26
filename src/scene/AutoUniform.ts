import { UniformTypeEnum } from "../webgl/UniformType";
import { UniformState } from "./UniformState";

/* eslint-disable @typescript-eslint/camelcase */

namespace Private
{
    export const datatypeToGlsl: { [uniformType: string]: string } = {};
    {
        datatypeToGlsl[UniformTypeEnum.FLOAT] = "float";
        datatypeToGlsl[UniformTypeEnum.FLOAT_VEC2] = "vec2";
        datatypeToGlsl[UniformTypeEnum.FLOAT_VEC3] = "vec3";
        datatypeToGlsl[UniformTypeEnum.FLOAT_VEC4] = "vec4";
        datatypeToGlsl[UniformTypeEnum.INT] = "int";
        datatypeToGlsl[UniformTypeEnum.INT_VEC2] = "ivec2";
        datatypeToGlsl[UniformTypeEnum.INT_VEC3] = "ivec3";
        datatypeToGlsl[UniformTypeEnum.INT_VEC4] = "ivec4";
        datatypeToGlsl[UniformTypeEnum.BOOL] = "bool";
        datatypeToGlsl[UniformTypeEnum.BOOL_VEC2] = "bvec2";
        datatypeToGlsl[UniformTypeEnum.BOOL_VEC3] = "bvec3";
        datatypeToGlsl[UniformTypeEnum.BOOL_VEC4] = "bvec4";
        datatypeToGlsl[UniformTypeEnum.FLOAT_MAT2] = "mat2";
        datatypeToGlsl[UniformTypeEnum.FLOAT_MAT3] = "mat3";
        datatypeToGlsl[UniformTypeEnum.FLOAT_MAT4] = "mat4";
        datatypeToGlsl[UniformTypeEnum.SAMPLER_2D] = "sampler2D";
        datatypeToGlsl[UniformTypeEnum.SAMPLER_CUBE] = "samplerCube";
    }
    export let autoUniformDic: { [name: string]: IautomaticUniform } = {};
}



export interface IautomaticUniform
{
    size: number;
    datatype: UniformTypeEnum;
    getValue(uniformState: UniformState): any;
}

export class AutoUniforms
{
    private static autoUniformDic: { [name: string]: IautomaticUniform } = {
        czm_model: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixModel;
            },
        },
        czm_view: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixView;
            },
        },
        czm_projection: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixProject;
            },
        },
        czm_modelView: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixModelView;
            },
        },
        czm_viewP: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixViewProject;
            },
        },
        czm_modelViewp: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixModelViewProject;
            },
        },
        czm_normal: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.matrixNormalToView;
            },
        },
        czm_fov: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.curCamera.fov;
            },
        },
        czm_aspect: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.curCamera.aspect;
            },
        },
        czm_near: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.curCamera.near;
            },
        },
        czm_far: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) =>
            {
                return uniformState.curCamera.far;
            },
        },
    };

    static containAuto(unfiorm: string)
    {
        return this.autoUniformDic[unfiorm] != null;
    }

    static registAutomaticUniform(unfiorm: string, node: IautomaticUniform)
    {
        this.autoUniformDic[unfiorm] = node;
    }

    static getUniformDeclaration(unfiorm: string)
    {
        let node = this.autoUniformDic[unfiorm];
        if (node == null)
        {
            return null;
        }
        let declaration = "uniform " + Private.datatypeToGlsl[node.datatype] + " " + name;
        if (node.size === 1)
        {
            declaration += ";";
        } else
        {
            declaration += "[" + node.size.toString() + "];";
        }
        return declaration;
    }

    static getAutoUniformValue(uniform: string, uniformState: UniformState)
    {
        return this.autoUniformDic[uniform].getValue(uniformState);
    }
}
