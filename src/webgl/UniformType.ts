import { GlConstants } from "./GLconstant";

export enum UniformTypeEnum
{
    FLOAT = "FLOAT",
    FLOAT_VEC2 = "FLOAT_VEC2",
    FLOAT_VEC3 = "FLOAT_VEC3",
    FLOAT_VEC4 = "FLOAT_VEC4",
    INT = "INT",
    BOOL = "BOOL",
    INT_VEC2 = "INT_VEC2",
    BOOL_VEC2 = "BOOL_VEC2",
    INT_VEC3 = "INT_VEC3",
    BOOL_VEC3 = "BOOL_VEC3",
    INT_VEC4 = "INT_VEC4",
    BOOL_VEC4 = "BOOL_VEC4",
    FLOAT_MAT2 = "FLOAT_MAT2",
    FLOAT_MAT3 = "FLOAT_MAT3",
    FLOAT_MAT4 = "FLOAT_MAT4",
    FLOAT_ARRAY = "FLOAT_ARRAY",
    BOOL_ARRAY = "BOOL_ARRAY",
    INT_ARRAY = "INT_ARRAY",
    SAMPLER_2D = "SAMPLER_2D",
    SAMPLER_CUBE = "SAMPLER_CUBE"
}

export namespace UniformTypeEnum
{
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

    export function fromGlType(type: number)
    {
        return gltypeToUniformType[type]
    }
}
