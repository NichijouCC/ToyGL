import { IComponent } from "../core/ecs";
import { InterScene, System } from "../scene";
import { Tileset3dRender } from "./tileset3dRender";

export class TileSetSystem extends System {
    caries: { [queryKey: string]: (new () => IComponent)[]; } = { comps: [Tileset3dRender] }
    private _scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this._scene = scene;
    }

    private render() {
        this.queries.comps.forEach((node) => {
            let tileset = node.getComponent(Tileset3dRender).asset;

        })
    }
}