import { IRenderable } from "../render/irenderable";
import { World } from "./world";

export class FrameState {
    deltaTime: number;
    // dirtyNode = new Set<Entity>();
    renders: IRenderable[] = [];
    world: World
}
