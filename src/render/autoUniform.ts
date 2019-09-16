/* eslint-disable @typescript-eslint/camelcase */
import { UniformState } from "./uniformState";
import { Mat4 } from "../mathD/mat4";
import { Vec3 } from "../mathD/vec3";
import { UniformTypeEnum } from "../resources/assets/shader";

var datatypeToGlsl: { [uniformType: number]: string } = {};
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

export interface IautomaticUniform {
    size: number;
    datatype: UniformTypeEnum;
    getValue(uniformState: UniformState): any;
}

export class AutoUniforms {
    private static autoUniformDic: { [name: string]: IautomaticUniform } = {
        czm_model: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixModel;
            },
        },
        czm_view: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixView;
            },
        },
        czm_projection: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixProject;
            },
        },
        czm_modelView: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixModelView;
            },
        },
        czm_viewProjection: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixViewProject;
            },
        },
        czm_modelViewProjection: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixModelViewProject;
            },
        },
        czm_normal: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState: UniformState) => {
                return uniformState.matrixNormalToView;
            },
        },
        czm_fov: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) => {
                return uniformState.curCamera.fov;
            },
        },
        czm_aspect: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) => {
                return uniformState.curCamera.aspect;
            },
        },
        czm_near: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) => {
                return uniformState.curCamera.near;
            },
        },
        czm_far: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState: UniformState) => {
                return uniformState.curCamera.far;
            },
        },
    };

    static containAuto(unfiorm: string) {
        return this.autoUniformDic[unfiorm] != null;
    }

    static addAutomaticUniform(unfiorm: string, node: IautomaticUniform) {
        this.autoUniformDic[unfiorm] = node;
    }

    static getUniformDeclaration(unfiorm: string) {
        let node = this.autoUniformDic[unfiorm];
        if (node == null) {
            return null;
        }
        let declaration = "uniform " + datatypeToGlsl[node.datatype] + " " + name;
        if (node.size === 1) {
            declaration += ";";
        } else {
            declaration += "[" + node.size.toString() + "];";
        }
        return declaration;
    }

    static getvalue(uniform: string, uniformState: UniformState) {
        return this.autoUniformDic[uniform].getValue(uniformState);
    }
}
