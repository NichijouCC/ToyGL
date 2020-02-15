import { VertexArray } from "../../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../../core/PrimitiveTypeEnum";

export class StaticMesh
{
    private _vertexArray: VertexArray;

    get vertexArray() { return this._vertexArray }
    set vertexArray(vertexArray: VertexArray)
    {
        if (this._vertexArray)
        {
            this._vertexArray.destroy();
        }
        this._vertexArray = vertexArray;
    }
}