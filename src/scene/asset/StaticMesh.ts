import { VertexArray } from "../../webgl/VertextArray";
import { BoundingBox } from "../Bounds";
import { Asset, IgraphicAsset } from "./Asset";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { GeometryAsset } from "../primitive/GeoemtryAsset";
export class StaticMesh extends GeometryAsset
{
    protected create(device: GraphicsDevice): VertexArray
    {
        throw new Error("Method not implemented.");
    }
    protected refresh(device: GraphicsDevice): void
    {
        throw new Error("Method not implemented.");
    }


}
