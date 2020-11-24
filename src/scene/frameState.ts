import { Entity } from "../core/entity";
import { Irenderable } from "./render/irenderable";

export class FrameState {
    deltaTime: number;
    dirtyNode = new Set<Entity>();
    renders: Irenderable[] = [];
}
