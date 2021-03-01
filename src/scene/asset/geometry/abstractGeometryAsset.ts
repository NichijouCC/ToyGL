import { Asset, IgraphicAsset } from "../asset";
import { VertexArray } from "../../../webgl/vertextArray";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { BoundingBox, BoundingSphere } from "../../bounds";
import { EventTarget } from "@mtgoo/ctool";

export abstract class AbstractGeometryAsset extends Asset implements Igeometry {
    graphicAsset: VertexArray;
    protected beNeedRefreshGraphicAsset: boolean = false;
    protected abstract create(device: GraphicsDevice): VertexArray
    protected abstract updateDirtyAtts(device: GraphicsDevice): void

    protected _bounding: BoundingBox;
    get boundingBox() { return this._bounding; }
    set boundingBox(aabb: BoundingBox) { this._bounding = aabb; }

    bind(device: GraphicsDevice) {
        if (this.graphicAsset == null) {
            this.graphicAsset = this.create(device);
            this.onCreated.raiseEvent();
        }
        if (this.beNeedRefreshGraphicAsset) {
            this.updateDirtyAtts(device);
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
    onDirty: EventTarget;
    graphicAsset: VertexArray;
    boundingBox: BoundingBox;
    bind(device: GraphicsDevice): void;
    unbind(): void;
    destroy(): void;
}
