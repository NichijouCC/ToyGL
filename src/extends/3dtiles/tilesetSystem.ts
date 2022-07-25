import { IRenderable, System, vec3, World } from "../../index";
import { TilesetRender } from "./tilesetComp";

export class TilesetSystem extends System {
    caries = { comps: [TilesetRender] }
    private _scene: World;
    constructor(scene: World) {
        super();
        this._scene = scene;
    }

    update(deltaTime: number): void {
        let cam = this._scene.mainCamera;
        if (cam == null) return;
        let renders: IRenderable[] = [];

        let campos = cam.worldPos;
        let fovY = cam.fov;
        let drawHeight = this._scene.screen.height;
        //sse=geometricError*drawWidth/(2*distance*Math.tan(fovY / 2))
        let sseParams = drawHeight / (2 * Math.tan(fovY / 2));
        this.queries.comps.forEach((node) => {
            let tileset = node.getComponent(TilesetRender).asset;
            tileset.update({ sseParams, campos, renders, maxSSE: 8 });
        });
        renders.forEach(el => this._scene.addFrameRenderIns(el))
    }
}

export interface ITileFrameState {
    sseParams: number;
    campos: vec3;
    renders: IRenderable[];
    maxSSE: number
}