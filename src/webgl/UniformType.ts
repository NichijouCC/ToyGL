import { GlConstants } from "./GLconstant";
import { IuniformInfo } from "./ShaderProgam";
import { GraphicsDevice } from "./GraphicsDevice";

export enum UniformTypeEnum {
    FLOAT = "FLOAT",
    FLOAT_VEC2 = "FLOAT_VEC2",
    FLOAT_VEC3 = "FLOAT_VEC3",
    FLOAT_VEC4 = "FLOAT_VEC4",
    BOOL = "BOOL",
    BOOL_VEC2 = "BOOL_VEC2",
    BOOL_VEC3 = "BOOL_VEC3",
    BOOL_VEC4 = "BOOL_VEC4",
    INT = "INT",
    INT_VEC2 = "INT_VEC2",
    INT_VEC3 = "INT_VEC3",
    INT_VEC4 = "INT_VEC4",
    FLOAT_MAT2 = "FLOAT_MAT2",
    FLOAT_MAT3 = "FLOAT_MAT3",
    FLOAT_MAT4 = "FLOAT_MAT4",
    SAMPLER_2D = "SAMPLER_2D",
    SAMPLER_CUBE = "SAMPLER_CUBE",
    FLOAT_ARRAY = "FLOAT",
    FLOAT_VEC2_ARRAY = "FLOAT_VEC2_ARRAY",
    FLOAT_VEC3_ARRAY = "FLOAT_VEC3_ARRAY",
    FLOAT_VEC4_ARRAY = "FLOAT_VEC4_ARRAY",
    BOOL_ARRAY = "BOOL_ARRAY",
    BOOL_VEC2_ARRAY = "BOOL_VEC2_ARRAY",
    BOOL_VEC3_ARRAY = "BOOL_VEC3_ARRAY",
    BOOL_VEC4_ARRAY = "BOOL_VEC4_ARRAY",
    INT_ARRAY = "INT_ARRAY",
    INT_VEC2_ARRAY = "INT_VEC2_ARRAY",
    INT_VEC3_ARRAY = "INT_VEC3_ARRAY",
    INT_VEC4_ARRAY = "INT_VEC4_ARRAY",
    FLOAT_MAT2_ARRAY = "FLOAT_MAT2_ARRAY",
    FLOAT_MAT3_ARRAY = "FLOAT_MAT3_ARRAY",
    FLOAT_MAT4_ARRAY = "FLOAT_MAT4_ARRAY",
    SAMPLER_2D_ARRAY = "SAMPLER_2D_ARRAY",
    SAMPLER_CUBE_ARRAY = "SAMPLER_CUBE_ARRAY",
}

export namespace UniformTypeEnum {
    const gltypeToUniformType: { [glType: number]: UniformTypeEnum } = {};
    {
        gltypeToUniformType[GlConstants.FLOAT] = UniformTypeEnum.FLOAT;
        gltypeToUniformType[GlConstants.FLOAT_VEC2] = UniformTypeEnum.FLOAT_VEC2;
        gltypeToUniformType[GlConstants.FLOAT_VEC3] = UniformTypeEnum.FLOAT_VEC3;
        gltypeToUniformType[GlConstants.FLOAT_VEC4] = UniformTypeEnum.FLOAT_VEC4;
        gltypeToUniformType[GlConstants.INT] = UniformTypeEnum.INT;
        gltypeToUniformType[GlConstants.INT_VEC2] = UniformTypeEnum.INT_VEC2;
        gltypeToUniformType[GlConstants.INT_VEC3] = UniformTypeEnum.INT_VEC3;
        gltypeToUniformType[GlConstants.INT_VEC4] = UniformTypeEnum.INT_VEC4;
        gltypeToUniformType[GlConstants.BOOL] = UniformTypeEnum.BOOL;
        gltypeToUniformType[GlConstants.BOOL_VEC2] = UniformTypeEnum.BOOL_VEC2;
        gltypeToUniformType[GlConstants.BOOL_VEC3] = UniformTypeEnum.BOOL_VEC3;
        gltypeToUniformType[GlConstants.BOOL_VEC4] = UniformTypeEnum.BOOL_VEC4;
        gltypeToUniformType[GlConstants.FLOAT_MAT2] = UniformTypeEnum.FLOAT_MAT2;
        gltypeToUniformType[GlConstants.FLOAT_MAT3] = UniformTypeEnum.FLOAT_MAT3;
        gltypeToUniformType[GlConstants.FLOAT_MAT4] = UniformTypeEnum.FLOAT_MAT4;
        gltypeToUniformType[GlConstants.SAMPLER_2D] = UniformTypeEnum.SAMPLER_2D;
        gltypeToUniformType[GlConstants.SAMPLER_CUBE] = UniformTypeEnum.SAMPLER_CUBE;
    }

    const gltypeArrayToUniformType: { [glType: number]: UniformTypeEnum } = {};
    {
        gltypeArrayToUniformType[GlConstants.FLOAT] = UniformTypeEnum.FLOAT_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_VEC2] = UniformTypeEnum.FLOAT_VEC2_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_VEC3] = UniformTypeEnum.FLOAT_VEC3_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_VEC4] = UniformTypeEnum.FLOAT_VEC4_ARRAY;
        gltypeArrayToUniformType[GlConstants.INT] = UniformTypeEnum.INT_ARRAY;
        gltypeArrayToUniformType[GlConstants.INT_VEC2] = UniformTypeEnum.INT_VEC2_ARRAY;
        gltypeArrayToUniformType[GlConstants.INT_VEC3] = UniformTypeEnum.INT_VEC3_ARRAY;
        gltypeArrayToUniformType[GlConstants.INT_VEC4] = UniformTypeEnum.INT_VEC4_ARRAY;
        gltypeArrayToUniformType[GlConstants.BOOL] = UniformTypeEnum.BOOL_ARRAY;
        gltypeArrayToUniformType[GlConstants.BOOL_VEC2] = UniformTypeEnum.BOOL_VEC2_ARRAY;
        gltypeArrayToUniformType[GlConstants.BOOL_VEC3] = UniformTypeEnum.BOOL_VEC3_ARRAY;
        gltypeArrayToUniformType[GlConstants.BOOL_VEC4] = UniformTypeEnum.BOOL_VEC4_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_MAT2] = UniformTypeEnum.FLOAT_MAT2_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_MAT3] = UniformTypeEnum.FLOAT_MAT3_ARRAY;
        gltypeArrayToUniformType[GlConstants.FLOAT_MAT4] = UniformTypeEnum.FLOAT_MAT4_ARRAY;
        gltypeArrayToUniformType[GlConstants.SAMPLER_2D] = UniformTypeEnum.SAMPLER_2D_ARRAY;
        gltypeArrayToUniformType[GlConstants.SAMPLER_CUBE] = UniformTypeEnum.SAMPLER_CUBE_ARRAY;
    }

    export function fromGlType(type: number, beArray: boolean = false) {
        if (beArray) {
            return gltypeArrayToUniformType[type]
        } else {
            return gltypeToUniformType[type]
        }
    }
}
