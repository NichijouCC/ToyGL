import { TaskPool, retryPromise } from "@mtgoo/ctool";
import { ComponentDatatypeEnum, DefaultMaterial, Geometry, mat4, Material, PrimitiveTypeEnum, Ray, Tempt, Tiles3d, vec2, vec3, VertexAttEnum } from "TOYGL";
import { FrameState } from "../../../src/scene/frameState";

export class GisLineRender {
    private gpsArr: vec3[];
    private _origin: vec3;
    readonly clampToGround: boolean;
    readonly system: Tiles3d.TilesetSystem;
    private invertWorldMat: mat4;
    private worldMat: mat4;
    private material: Material;
    lineWidth: number = 0.6;
    get points() { return this.gpsArr; }
    constructor(options: { system: Tiles3d.TilesetSystem; origin: vec3; gpsArr: vec3[]; clampToGround?: boolean; }) {
        this.system = options.system;
        this._origin = options.origin;
        this.gpsArr = options.gpsArr;
        this.clampToGround = options.clampToGround ?? true;

        let originGps = Tiles3d.ecefToWs84(this._origin, vec3.create());
        this.worldMat = Tiles3d.transformEnuToEcef(originGps);
        this.invertWorldMat = mat4.invert(mat4.create(), this.worldMat);
        let material = DefaultMaterial.color_3d.clone();
        material.customSortOrder = 10;
        material.renderState.depth.depthTest = false;
        material.renderState.cull.enable = false;
        this.material = material;

        if (this.gpsArr.length > 1) { this.process() }
    }
    geo: Geometry;
    private process() {
        let { lineWidth, gpsArr } = this;
        let centerPoints = gpsArr.map((el, index) => {
            let worldPos = Tiles3d.ws84ToEcef(el, vec3.create());
            let localPos = mat4.transformPoint(vec3.create(), worldPos as any, this.invertWorldMat);
            return localPos;
        });

        let points = [];
        let uvs = [];
        let indices = [];

        let currentLength = 0;
        let tangent = vec3.create();
        let normal = vec3.fromValues(0, 0.0, 1.0);
        let expandDir = vec3.create();
        let preDir = vec3.create();
        let nextDir = vec3.create();
        for (let i = 0; i < centerPoints.length; i++) {
            if (i == 0) {
                vec3.subtract(tangent, centerPoints[1], centerPoints[0])
                vec3.normalize(tangent, tangent)
                vec3.cross(expandDir, tangent, normal);
                vec3.scale(expandDir, expandDir, lineWidth / 2);
            } else {
                vec3.subtract(preDir, centerPoints[i], centerPoints[i - 1]);
                currentLength += vec3.length(preDir);
                indices.push(2 * (i - 1) + 1, 2 * i, 2 * (i - 1), 2 * (i - 1) + 1, 2 * i + 1, 2 * i);

                if (i == centerPoints.length - 1) {
                    vec3.copy(tangent, preDir);
                    vec3.normalize(tangent, tangent)
                    vec3.cross(expandDir, tangent, normal);
                    vec3.scale(expandDir, expandDir, lineWidth / 2);
                } else {
                    vec3.subtract(nextDir, centerPoints[i + 1], centerPoints[i]);
                    vec3.normalize(preDir, preDir);
                    vec3.normalize(nextDir, nextDir);
                    vec3.add(tangent, preDir, nextDir);
                    vec3.cross(expandDir, tangent, normal);
                    vec3.normalize(expandDir, expandDir);

                    let crossAngle = vec3.dot(expandDir, nextDir);
                    let angle = Math.acos(crossAngle);
                    vec3.scale(expandDir, expandDir, (lineWidth / 2) / Math.cos(Math.PI * 0.5 - angle));
                }
            }

            let upPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, -1);
            points.push(upPoint[0], upPoint[1], upPoint[2]);
            uvs.push(currentLength / 100, 1.0);

            let downPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, 1);
            points.push(downPoint[0], downPoint[1], downPoint[2]);
            uvs.push(currentLength / 100, 0.0);
        }

        this.geo = new Geometry({
            attributes: [
                {
                    type: VertexAttEnum.POSITION,
                    data: points,
                    componentSize: 3,
                    componentDatatype: ComponentDatatypeEnum.FLOAT
                },
                {
                    type: VertexAttEnum.TEXCOORD_0,
                    data: uvs,
                    componentSize: 2,
                    componentDatatype: ComponentDatatypeEnum.FLOAT
                }
            ],
            indices,
            primitiveType: PrimitiveTypeEnum.TRIANGLES
        });
    }
    addGpsPoint(point: vec3) {
        this.gpsArr.push(point);
        if (this.gpsArr.length > 1) { this.process() }
    }

    render(frameState: FrameState) {
        frameState.renders.push({
            geometry: this.geo,
            material: this.material,
            worldMat: this.worldMat,
        })
    }
}

export var clamper = new TaskPool({ maxConcurrency: 1 })
export function clampToGround(system: Tiles3d.TilesetSystem, targetPos: vec3, out = vec3.create()): Promise<vec3> {
    return clamper.push(() => {
        return retryPromise<vec3>(
            () => {
                let ray = new Ray().setByTwoPoint(vec3.create(), targetPos);
                let pickResult = system.rayTest(ray);
                if (pickResult != null) {
                    let pickPoint = pickResult[pickResult.length - 1].point;
                    vec3.copy(out, pickPoint);
                    return Promise.resolve(out);
                } else {
                    return Promise.reject();
                }
            },
            { count: Number.POSITIVE_INFINITY, retryFence: 300 })
    })
}