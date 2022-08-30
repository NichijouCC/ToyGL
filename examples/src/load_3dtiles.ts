import { Task } from "@mtgoo/ctool";
import { CameraComponent, ComponentDatatypeEnum, Geometry, glMatrix, Input, mat4, MouseKeyEnum, PrimitiveTypeEnum, quat, Ray, Tempt, Tiles3d, ToyGL, vec2, vec3, vec4, VertexAttEnum, World } from "TOYGL";
import { TilesetSystem } from "../../src/extends/3dtiles";
glMatrix.setMatrixArrayType(Float64Array as any);

window.onload = () => {
    const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    let system = new Tiles3d.TilesetSystem(world);
    world.addSystem(system);

    const cam = world.addNewCamera();
    cam.far = 10000;
    let loader = new Tiles3d.Loader();
    loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/jiugang_20220727/Production_2.json")
        .then(res => {
            let node = world.addNewChild();
            let comp = node.addComponent(Tiles3d.TilesetRender);
            comp.asset = res;

            cam.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));
            initCameraController(world, system);
        })
}

function initCameraController(world: World, system: Tiles3d.TilesetSystem) {
    let beActiveDrag = false;
    let beActiveRot = false;

    let translateCamera: (pos: vec2) => void;
    let rotCamera: (movement: vec2) => void;
    Input.mouse.on("mousedown", (ev) => {
        if (ev.keyType == MouseKeyEnum.Left) {
            beActiveDrag = true;
            let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
            let pickPoint = system.rayTest(ray);
            let camToWorld = mat4.clone(world.mainCamera.worldMatrix);
            let projectMat = mat4.clone(world.mainCamera.projectMatrix);
            let camWorldPos = vec3.clone(world.mainCamera.worldPos);
            let vp = mat4.multiply(mat4.create(), world.mainCamera.projectMatrix, world.mainCamera.viewMatrix);
            let ndc = vec4.transformMat4(vec4.create(), vec4.fromValues(pickPoint[0], pickPoint[1], pickPoint[2], 1.0), vp);
            let ndcZ = ndc[2] / ndc[3];

            translateCamera = (point: vec2) => {
                const ndc_x = (point[0] / world.screen.width) * 2 - 1;
                const ndc_y = -1 * ((point[1] / world.screen.height) * 2 - 1);
                let newNdc = vec3.fromValues(ndc_x, ndc_y, ndcZ);
                let newWorldPoint = mat4.ndcToWorld(vec3.create(), newNdc, projectMat, camToWorld);
                let offset = vec3.subtract(newWorldPoint, newWorldPoint, pickPoint);
                let newCamPos = vec3.subtract(offset, camWorldPos, offset);
                world.mainCamera.entity.worldPosition = newCamPos;
            }
        } else if (ev.keyType == MouseKeyEnum.Right) {
            beActiveRot = true;
            let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
            let pickPoint = system.rayTest(ray);

            let gps = Tiles3d.ecefToWs84(pickPoint, vec3.create() as any);
            let upAxis = Tiles3d.surfaceEnuZUnitFromGps(gps);
            let worldMat = mat4.fromTranslation(mat4.create(), pickPoint);
            let worldMatInverse = mat4.invert(mat4.create(), worldMat);

            rotCamera = (ev: vec2) => {
                let eastAxis = world.mainCamera.rightInWorld;

                let rotX = quat.setAxisAngle(quat.create(), upAxis, -2 * Math.PI * ev[0] / world.screen.width);
                let rotY = quat.setAxisAngle(quat.create(), eastAxis, 2 * Math.PI * ev[1] / world.screen.width);
                let rot = quat.multiply(quat.create(), rotX, rotY);
                let rotMat = mat4.fromQuat(mat4.create(), rot);

                let localMat = mat4.multiply(mat4.create(), worldMatInverse, world.mainCamera.worldMatrix);
                let newWorldMat = mat4.multiply(mat4.create(), rotMat, localMat);
                mat4.multiply(newWorldMat, worldMat, newWorldMat);
                world.mainCamera.entity.worldMatrix = newWorldMat;
            }
        }
    });

    Input.mouse.on("mouseup", (ev) => {
        beActiveDrag = false;
        beActiveRot = false;
    })
    Input.mouse.on("mousemove", (ev) => {
        if (beActiveDrag) {
            translateCamera(vec2.fromValues(ev.pointx, ev.pointy));
        }
        if (beActiveRot) {
            rotCamera(vec2.fromValues(ev.movementX, ev.movementY));
        }
    });
    Input.mouse.on("mousewheel", (ev) => {
        let comp = world.mainCamera.entity.getComponent(CameraComponent);
        if (comp == null) return;
        let forward = comp.forwardInWorld;
        let worldPos = comp.worldPos;
        let newPos = vec3.scaleAndAdd(vec3.create(), worldPos, forward, -1 * ev.rotateDelta);
        comp.entity.worldPosition = newPos;
    });
}

export class RoadLineRender {
    private _points: vec3[];
    private _origin: vec3;
    readonly clampToGround: boolean;
    set points(value: vec3[]) {
        this._points = value;
        this.initOrUpdateGeo();
    }
    get points() { return this._points }
    constructor(options: { origin: vec3, points: vec3[], clampToGround?: boolean }) {
        this._origin = options.origin;
        this._points = options.points;
        this.clampToGround = options.clampToGround ?? true;
        this.initOrUpdateGeo();
    }
    private geo: Geometry;
    private initOrUpdateGeo() {
        let { _origin: origin, _points: points } = this;
        let mat = mat4.fromTranslation(Tempt.getMat4(), origin);
        mat4.invert(mat, mat);
        let data: number[] = [];
        points.forEach(el => {
            let localPoint = mat4.transformPoint(vec3.create(), el, mat);
            data.push(localPoint[0], localPoint[1], localPoint[2]);
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
                primitiveType: PrimitiveTypeEnum.LINES
            });
        } else {
            this.geo.attributes[VertexAttEnum.POSITION].set({ data })
        }
    }

    update(system: TilesetSystem) {

    }

    private tryClampToGround(system: TilesetSystem) {
        let points = this._points;
        let clampPoints: vec3[] = [];
        points.forEach(el => {
            let gps = Tiles3d.ecefToWs84(el, vec3.create() as any);
            let dir = Tiles3d.surfaceEnuZUnitFromGps(gps);
            let pickPoint = system.rayTest(new Ray(vec3.create(), dir), "last");
            if (pickPoint != null) {
                clampPoints.push(pickPoint);
            }
        });
        this.points = clampPoints;
    }
}