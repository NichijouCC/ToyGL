import { IComponent } from "../core/ecs";
import { System } from "../scene";
import { LineRender } from "./lineRender";

export class LineRenderSystem extends System {
    caries: { [queryKey: string]: (new () => IComponent)[]; } = { comps: [LineRender] };

    async init() {

    }

}