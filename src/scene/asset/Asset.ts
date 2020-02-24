import { UniqueObject } from "../../core/UniqueObject";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { EventHandler } from "../../core/Event";

export class Asset extends UniqueObject
{
    protected _becreated = true;
    get becreated() { return this._becreated };

    protected _becreating = false;
    get becreating() { return this._becreating };

    onDirty = new EventHandler<void>();

    destroy() { }
}

export interface IgraphicAsset
{
    bind(device: GraphicsDevice): void;
    unbind(): void;
    destroy(): void;
}