import { VertexArray } from "../../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../../core/PrimitiveTypeEnum";
import { BoundingBox } from "../Bounds";
import { Geometry } from "../primitive/Geometry";
import { IvertexAttributeOption } from "../../webgl/VertexAttribute";
import { VertexBuffer } from "../../webgl/VertexBuffer";

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