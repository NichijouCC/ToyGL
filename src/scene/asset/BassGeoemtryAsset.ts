import { Asset, IgraphicAsset } from "./Asset";
import { VertexArray } from "../../webgl/VertextArray";
import { BoundingBox } from "../Bounds";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";

export class BaseGeometryAsset extends Asset implements IgeometryAsset
{
    protected _vertexArray: VertexArray;
    get vertexArray()
    {
        return this._vertexArray
    }
    set vertexArray(vertexArray: VertexArray)
    {
        if (this._vertexArray)
        {
            this._vertexArray.destroy();
        }
        this._vertexArray = vertexArray;
    }

    protected _aabb: BoundingBox;
    get boundingBox() { return this._aabb }
    set boundingBox(aabb: BoundingBox) { this._aabb = aabb }

    bind(device: GraphicsDevice): void
    {
        this._vertexArray?.bind();
    }

    unbind(): void
    {
        this._vertexArray?.unbind();
    }
    destroy(): void
    {
        this._vertexArray?.destroy();
    }
}

export interface IgeometryAsset extends IgraphicAsset
{
    readonly vertexArray: VertexArray;
    readonly boundingBox: BoundingBox;
}
