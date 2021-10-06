import { UniqueObject } from "../core/uniqueObject";
import { EventTarget } from "@mtgoo/ctool";

export abstract class Asset extends UniqueObject {
    name: string;
    onDirty = new EventTarget<void>();
    onCreated = new EventTarget<void>();
    abstract destroy(): void;
}