import { IRenderable, System, vec3, World } from "../../index";
import { TileNode, Tileset } from "./tileset";
import { TilesetRender } from "./tilesetComp";

export class TilesetSystem extends System {
    caries = { comps: [TilesetRender] }
    private _scene: World;
    constructor(scene: World) {
        super();
        this._scene = scene;
    }
    maximumScreenSpaceError = 0.3;
    update(deltaTime: number): void {
        let cam = this._scene.mainCamera;
        if (cam == null) return;
        let renders: IRenderable[] = [];

        let campos = cam.worldPos;
        let fovY = cam.fov;
        let drawHeight = this._scene.screen.height;
        //sse=geometricError*drawWidth/(2*distance*Math.tan(fovY / 2))
        let sseParams = drawHeight / (2 * Math.tan(fovY / 2));

        let computeTileNodeSSE = (tileset: TileNode) => {
            let sse = sseParams * tileset.geometricError / vec3.distance(campos, tileset.boundingVolume.center as any);
            return sse;
        }

        this.queries.comps.forEach((node) => {
            let tileset = node.getComponent(TilesetRender).asset;
            tileset.update({ renders, computeTileNodeSSE, maximumScreenSpaceError: this.maximumScreenSpaceError });
        });
        renders.forEach(el => this._scene.addFrameRenderIns(el))
    }


}

export interface ITileFrameState {
    renders: IRenderable[];
    computeTileNodeSSE: (tileset: TileNode) => number;
    maximumScreenSpaceError: number
}