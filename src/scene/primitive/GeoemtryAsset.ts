import { Asset, IgraphicAsset } from "../asset/Asset";
import { VertexArray } from "../../webgl/VertextArray";
import { BoundingBox, BoundingSphere } from "../Bounds";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";

export abstract class GeometryAsset extends Asset
{
    protected graphicAsset: VertexArray;
    protected beNeedRefresh: boolean = false;
    protected abstract create(device: GraphicsDevice): VertexArray
    protected abstract refresh(device: GraphicsDevice): void

    protected _bounding: BoundingSphere;
    get bounding() { return this._bounding }
    set bounding(aabb: BoundingSphere) { this._bounding = aabb }

    bind(device: GraphicsDevice)
    {
        if (this.graphicAsset == null)
        {
            this.graphicAsset = this.create(device);
            this.onCreated.raiseEvent();
            this.beNeedRefresh = false;
        }
        if (this.beNeedRefresh)
        {
            this.refresh(device);
            this.beNeedRefresh = false;
        }
        this.graphicAsset?.bind();
    }
    unbind()
    {
        this.graphicAsset.unbind();
    }

    draw(device: GraphicsDevice, instanceCount?: number)
    {
        device.draw(this.graphicAsset, instanceCount);
    }

    destroy()
    {
        this.graphicAsset?.destroy();
        super.destroy();
    }
}
export interface IgeometryAsset extends IgraphicAsset
{
    readonly vertexArray: VertexArray;
    readonly bounding: BoundingSphere;
}
