import { VertexArray } from "../../webgl/VertextArray";
import { BoundingBox } from "../Bounds";
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

    private _aabb: BoundingBox;
    get boundingBox() { return this._aabb }
    set boundingBox(aabb: BoundingBox) { this._aabb = aabb }
}