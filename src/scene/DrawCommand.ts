import { CullingMask } from "./Camera";
import { Material } from "./Material";
import { VertexArray } from "../webgl/VertextArray";
import { RenderCommand } from "../webgl/RenderCommand";
import { BoundingSphere } from "./Bounds";
import { Mat4 } from "../mathD/mat4";

export class DrawCommand extends RenderCommand
{
    cullingMask?: CullingMask;
    material: Material;
    private _vertexArray: VertexArray;
    set vertexArray(vertexArray: VertexArray)
    {
        this._vertexArray = vertexArray;
        if (vertexArray?.indexbuffer != null)
        {
            this.indexBufferData = {
                bytesPerIndex: vertexArray?.indexbuffer?.bytesPerIndex,
                indexDatatype: vertexArray?.indexbuffer?.indexDatatype,
            }
        }
    }
    get vertexArray()
    {
        return this._vertexArray;
    };
    enableCull: boolean = true;
    boundingSphere: BoundingSphere;
    worldMat: Mat4;
}