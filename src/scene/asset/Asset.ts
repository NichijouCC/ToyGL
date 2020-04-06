import { UniqueObject } from "../../core/UniqueObject";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { EventHandler } from "../../core/Event";
import { Texture } from "../../webgl/Texture";

export abstract class Asset extends UniqueObject {
    name: string;
    onDirty = new EventHandler<void>();
    onCreated = new EventHandler<void>();
    abstract destroy(): void;
}

export interface IgraphicAsset {
    bind(device: GraphicsDevice): void;
    unbind(): void;
    destroy(): void;
    onDirty: EventHandler<void>;
}

export class GraphicAsset extends Asset implements IgraphicAsset {
    bind(device: GraphicsDevice): void {
        throw new Error("Method not implemented.");
    }
    unbind(): void {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}