import { IRenderable, System, vec3, World, Ray, Color, IIntersectResult, quat, mat4, Frustum, BoundingSphere } from "../../index";
import { TileNode } from "./tileNode";
import { TilesetRender } from "./tilesetComp";

export class TilesetSystem extends System {
    caries = { comps: [TilesetRender] }
    private _scene: World;
    renders: IRenderable[];
    constructor(scene: World) {
        super();
        this._scene = scene;
    }
    maximumScreenSpaceError = 0.8;
    frustum = new Frustum();
    viewProjectMatrix = mat4.create();

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

        const { projectMatrix, viewMatrix, } = cam;
        let { frustum, viewProjectMatrix } = this;
        mat4.multiply(viewProjectMatrix, projectMatrix, viewMatrix);
        frustum.setFromMatrix(viewProjectMatrix);

        let checkBeInView = (sphere: BoundingSphere, mat?: mat4) => {
            return frustum.containSphere(sphere, mat)
        }
        this.queries.comps.forEach((node) => {
            let tileset = node.getComponent(TilesetRender).asset;
            tileset.update({ renders, computeTileNodeSSE, maximumScreenSpaceError: this.maximumScreenSpaceError, needNodes: null, checkBeInView });
        });
        renders.forEach(el => this._scene.addFrameRenderIns(el))
        this.renders = renders;
    }

    rayTest(ray: Ray): ITileIntersectResult[] | null {
        let intersectPoints: ITileIntersectResult[] = [];
        for (let i = 0; i < this.renders.length; i++) {
            let el = this.renders[i];
            if (ray.intersectWithBoundingSphere(el.worldBounding)) {
                let points = ray.intersectWithGeometry(el.geometry, el.worldMat);
                intersectPoints.push(...points.map(result => { return { ...result, render: el } }));
            }
        };
        intersectPoints.sort((a, b) => a.distance - b.distance);
        return intersectPoints.length > 0 ? intersectPoints : null;
    }
}

export type ITileIntersectResult = IIntersectResult & { render: IRenderable }

export interface ITileFrameState {
    renders: IRenderable[];
    computeTileNodeSSE: (tileset: TileNode) => number;
    checkBeInView: (sphere: BoundingSphere, mat?: mat4) => boolean;
    maximumScreenSpaceError: number
    needNodes: Set<TileNode>;
}