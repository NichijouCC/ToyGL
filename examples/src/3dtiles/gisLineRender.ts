import { TaskPromise, Timer } from "@mtgoo/ctool";
import { ComponentDatatypeEnum, DefaultMaterial, Geometry, mat4, Material, PrimitiveTypeEnum, Ray, Tempt, Tiles3d, vec3, VertexAttEnum } from "TOYGL";
import { FrameState } from "../../../src/scene/frameState";

export class GisLineRender {
    private _gpsArr: vec3[];
    private _origin: vec3;
    readonly clampToGround: boolean;
    readonly system: Tiles3d.TilesetSystem;
    private _invertMat: mat4;
    private worldMat: mat4;
    private material: Material;
    get points() { return this._gpsArr; }
    constructor(options: { system: Tiles3d.TilesetSystem; origin: vec3; gpsArr: vec3[]; clampToGround?: boolean; }) {
        this.system = options.system;
        this._origin = options.origin;
        this._gpsArr = options.gpsArr;
        this.clampToGround = options.clampToGround ?? true;
        this.worldMat = mat4.fromTranslation(mat4.create(), this._origin);
        this._invertMat = mat4.invert(mat4.create(), this.worldMat);

        this.initGeo();
        let material = DefaultMaterial.color_3d.clone();
        material.customSortOrder = 10;
        material.renderState.depth.depthTest = false;
        this.material = material;
    }
    geo: Geometry;
    private initGeo() {
        let { _gpsArr } = this;
        let data = new Float32Array(_gpsArr.length * 3);

        _gpsArr.forEach((el, index) => {
            let worldPos = Tiles3d.ws84ToEcef(el, vec3.create());
            mat4.transformPoint(vec3.fromTypedArray(data, index), worldPos as any, this._invertMat);
        });

        if (this.geo == null) {
            this.geo = new Geometry({
                attributes: [
                    {
                        type: VertexAttEnum.POSITION,
                        data: data,
                        componentSize: 3,
                        componentDatatype: ComponentDatatypeEnum.FLOAT
                    }
                ],
                primitiveType: PrimitiveTypeEnum.LINE_STRIP
            });
        } else {
            this.geo.attributes[VertexAttEnum.POSITION].set({ data });
        }

        if (this.clampToGround) {
            Promise.all(_gpsArr.map((el, index) => clampToGround(this.system, el)))
                .then(results => {
                    results.forEach((el, index) => {
                        let localPos = mat4.transformPoint(Tempt.getVec3(), el, this.worldMat);
                        this.localPoints.push(localPos[0], localPos[1], localPos[2]);
                    });
                    this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints });
                });
        }
    }
    private localPoints: number[] = [];
    addPoint(point: vec3) {
        if (this.clampToGround) {
            clampToGround(this.system, point)
                .then(clamp => {
                    let localPos = mat4.transformPoint(vec3.create(), clamp, this._invertMat);
                    this.localPoints.push(localPos[0], localPos[1], localPos[2]);
                    this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints });
                });
        } else {
            let localPos = mat4.transformPoint(vec3.create(), point, this._invertMat);
            this.localPoints.push(localPos[0], localPos[1], localPos[2]);
            this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints });
        }
    }

    render(frameState: FrameState) {
        frameState.renders.push({
            geometry: this.geo,
            material: this.material,
            worldMat: this.worldMat,
        })
    }
}

export const timer = new Timer({ interval: 1000 });
export function clampToGround(system: Tiles3d.TilesetSystem, targetPos: vec3, out = vec3.create()): Promise<vec3> {
    let ray = new Ray().setByTwoPoint(vec3.create(), targetPos);
    let pickResult = system.rayTest(ray);
    if (pickResult != null) {
        let pickPoint = pickResult[pickResult.length - 1].point;
        vec3.copy(out, pickPoint);
        return Promise.resolve(out);
    } else {
        let task = TaskPromise.create<vec3>();
        timer.tick.addEventListener(() => {
            pickResult = system.rayTest(ray);
            if (pickResult) {
                let pickPoint = pickResult[pickResult.length - 1].point;
                vec3.copy(out, pickPoint);
                task.resolve(out);
                return true;
            }
        });
        return task.ins;
    }
}
