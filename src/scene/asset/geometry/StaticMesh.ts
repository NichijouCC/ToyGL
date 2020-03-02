import { VertexArray } from "../../../webgl/VertextArray";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { GeometryAsset } from "./GeoemtryAsset";
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

    set vertexArray(value: VertexArray) { this.graphicAsset = value }

}
