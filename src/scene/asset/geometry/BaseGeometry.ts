import { Asset, IgraphicAsset } from "../Asset";
import { VertexArray } from "../../../webgl/VertextArray";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { BoundingSphere } from "../../Bounds";
import { EventHandler } from "../../../core/Event";

export abstract class BaseGeometry extends Asset implements Igeometry {
    graphicAsset: VertexArray;
    protected beNeedRefreshGraphicAsset: boolean = false;
    protected abstract create(device: GraphicsDevice): VertexArray
    protected abstract refresh(device: GraphicsDevice): void

    protected _bounding: BoundingSphere;
    get bounding() { return this._bounding }
    set bounding(aabb: BoundingSphere) { this._bounding = aabb }

    bind(device: GraphicsDevice) {
        if (this.graphicAsset == null) {
            this.graphicAsset = this.create(device);
            this.onCreated.raiseEvent();
            this.beNeedRefreshGraphicAsset = false;
        }
        if (this.beNeedRefreshGraphicAsset) {
            this.refresh(device);
            this.beNeedRefreshGraphicAsset = false;
        }
        this.graphicAsset?.bind();
    }
    unbind() {
        this.graphicAsset.unbind();
    }

    draw(device: GraphicsDevice, instanceCount?: number) {
        device.draw(this.graphicAsset, instanceCount);
    }

    destroy() {
        this.graphicAsset?.destroy();
    }
}

export interface Igeometry {
    onDirty: EventHandler<void>;
    graphicAsset: VertexArray;
    bounding: BoundingSphere;
    bind(device: GraphicsDevice): void;
    unbind(): void;
    destroy(): void;
}