import { IRenderable, System, vec3, World, Ray, Color } from "../../index";
import { Tileset } from "./tileset";
import { TileNode } from "./tileNode";
import { TilesetRender } from "./tilesetComp";
import { transformEnuToEcef } from "./math";

export class TilesetSystem extends System {
    caries = { comps: [TilesetRender] }
    private _scene: World;
    renders: IRenderable[];
    constructor(scene: World) {
        super();
        this._scene = scene;
    }
    maximumScreenSpaceError = 0.8;
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
        this.renders = renders;
    }

    rayTest(ray: Ray): vec3 | null {
        let distance = Number.POSITIVE_INFINITY;
        let nearPoint: vec3 | null;
        for (let i = 0; i < this.renders.length; i++) {
            let el = this.renders[i];
            if (ray.intersectWithBoundingSphere(el.worldBounding)) {
                el.material.setUniform("MainColor", Color.random())
                let points = ray.intersectWithGeometry(el.geometry, el.worldMat);
                points?.forEach(el => {
                    let dis = vec3.distance(ray.origin, el);
                    if (dis < distance) {
                        nearPoint = el;
                        distance = dis;
                    }
                })
            }
        }
        return nearPoint;
    }
}

export interface ITileFrameState {
    renders: IRenderable[];
    computeTileNodeSSE: (tileset: TileNode) => number;
    maximumScreenSpaceError: number
}