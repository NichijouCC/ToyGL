import { ShaderProgram, VersionData } from "./ShaderProgam";
import { VertexArray } from "./VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";
export class RenderCommand
{
    modeType: PrimitiveTypeEnum = PrimitiveTypeEnum.TRIANGLES;
    count: number;
    offset: number = 0;
    instanceCount: number = 0;
    indexBufferData: {
        bytesPerIndex: number;
        indexDatatype: number;
        count: number;
    }
}
