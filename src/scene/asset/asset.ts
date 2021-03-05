import { UniqueObject } from "../../core/uniqueObject";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { EventTarget } from "@mtgoo/ctool";

export abstract class Asset extends UniqueObject {
    name: string;
    onDirty = new EventTarget<void>();
    onCreated = new EventTarget<void>();
    abstract destroy(): void;
}

export interface IGraphicAsset {
    bind(device: GraphicsDevice): void;
    unbind(): void;
    destroy(): void;
    onDirty: EventTarget<void>;
}

export class GraphicAsset extends Asset implements IGraphicAsset {
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
