import { IComponent } from "../../core/ecs";
import { System, World } from "../../index";
import { TileRender } from "./tileComp";

export class TileSetSystem extends System {
    caries = { comps: [TileRender] }
    private _scene: World;
    constructor(scene: World) {
        super();
        this._scene = scene;
    }

    private render() {
        this.queries.comps.forEach((node) => {
            let tileset = node.getComponent(TileRender).asset;

        })
    }
}