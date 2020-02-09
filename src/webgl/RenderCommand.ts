import { ShaderProgram, VersionData } from "./ShaderProgam";
import { VertexArray } from "./VertextArray";
import { GlConstants } from "../render/GlConstant";
export class RenderCommand
{
    shaderProgram: ShaderProgram;
    vertexArray: VertexArray;
    uniformMap: {
        [name: string]: VersionData;
    };
    modeType: PrimitiveTypeEnum;
    count: number;
    offset: number;
    instanceCount: number;
}
export enum PrimitiveTypeEnum
{
    POINTS = GlConstants.POINTS,
    LINES = GlConstants.LINES,
    LINE_LOOP = GlConstants.LINE_LOOP,
    LINE_STRIP = GlConstants.LINE_STRIP,
    TRIANGLES = GlConstants.TRIANGLES,
    TRIANGLE_FAN = GlConstants.TRIANGLE_FAN
}