import { Entity } from "./entity";
import { IRenderable } from "./render/irenderable";

export class FrameState {
    deltaTime: number;
    dirtyNode = new Set<Entity>();
    renders: IRenderable[] = [];
}
