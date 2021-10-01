import { UniqueObject } from "../core/uniqueObject";
import { GraphicsDevice } from "../webgl/graphicsDevice";
import { EventTarget } from "@mtgoo/ctool";

export abstract class Asset extends UniqueObject {
    name: string;
    onDirty = new EventTarget<void>();
    onCreated = new EventTarget<void>();
    abstract destroy(): void;
}