import { ShaderProgram, VersionData } from "./ShaderProgam";
import { VertexArray } from "./VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";
export class RenderCommand
{
    modeType: PrimitiveTypeEnum;
    count: number;
    offset: number;
    instanceCount: number;
    indexBufferData: {
        bytesPerIndex: number;
        indexDatatype: number;
    }
}
