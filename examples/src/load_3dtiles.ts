import { TaskPromise, Timer } from "@mtgoo/ctool";
import { CameraComponent, Color, ComponentDatatypeEnum, DefaultMaterial, Geometry, glMatrix, Input, mat4, MouseKeyEnum, PrimitiveTypeEnum, quat, Ray, Tempt, Tiles3d, ToyGL, vec2, vec3, vec4, VertexAttEnum, World } from "TOYGL";
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
            let line = new RoadLineRender({ system, origin: res.boundingVolume.center, gpsArr: [], clampToGround: true });

            let mat = mat4.fromTranslation(mat4.create(), res.boundingVolume.center);
            let material = DefaultMaterial.color_3d.clone();
            material.customSortOrder = 10;
            material.renderState.depth.depthTest = false;

            world.preUpdate.addEventListener(ev => {
                world.addFrameRenderIns({
                    geometry: line.geo,
                    material: material,
                    worldMat: mat,
                });
            });

            Input.mouse.on("mousedown", (ev) => {
                if (ev.keyType == MouseKeyEnum.Left) {
                    let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
                    let pickPoint = system.rayTest(ray);
                    if (pickPoint) {
                        let first = pickPoint[0];
                        first.render.material.setUniform("MainColor", Color.random());
                        line.addPoint(pickPoint[0].point);
                    }
                }
            })
        })
}

/**
 * gis类相机控制:  
 *      1. 鼠标左键拖拽     
 *      2. 鼠标右键旋转
 * @param world 
 * @param system 
 */
function initCameraController(world: World, system: Tiles3d.TilesetSystem) {
    let beActiveDrag = false;
    let beActiveRot = false;

    let translateCamera: (pos: vec2) => void;
    let rotCamera: (movement: vec2) => void;
    Input.mouse.on("mousedown", (ev) => {
        if (ev.keyType == MouseKeyEnum.Left) {
            beActiveDrag = true;
            let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
            let pickResult = system.rayTest(ray);
            if (pickResult == null) return;
            let pickPoint = pickResult[0].point;

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
            let pickResult = system.rayTest(ray);
            if (pickResult == null) return;
            let pickPoint = pickResult[0].point;

            let gps = Tiles3d.ecefToWs84(pickPoint, vec3.create() as any);
            let upAxis = Tiles3d.surfaceEnuNormalFromGps(gps);
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

        let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
        let pickResult = system.rayTest(ray);
        if (pickResult) {
            let pickPoint = pickResult[0].point;
            forward = vec3.subtract(vec3.create(), comp.entity.worldPosition, pickPoint);
            let distance = vec3.len(forward);
            vec3.normalize(forward, forward);
            let worldPos = comp.worldPos;
            let newPos = vec3.scaleAndAdd(vec3.create(), worldPos, forward, -1 * distance * ev.rotateDelta * 0.002);
            comp.entity.worldPosition = newPos;
        } else {
            let worldPos = comp.worldPos;
            let newPos = vec3.scaleAndAdd(vec3.create(), worldPos, forward, -1 * ev.rotateDelta * 0.3);
            comp.entity.worldPosition = newPos;
        }
    });
}

export class RoadLineRender {
    private _gpsArr: vec3[];
    private _origin: vec3;
    readonly clampToGround: boolean;
    readonly system: Tiles3d.TilesetSystem;
    private _invertMat: mat4;
    get points() { return this._gpsArr }
    constructor(options: { system: Tiles3d.TilesetSystem, origin: vec3, gpsArr: vec3[], clampToGround?: boolean }) {
        this.system = options.system;
        this._origin = options.origin;
        this._gpsArr = options.gpsArr;
        this.clampToGround = options.clampToGround ?? true;
        this.initOrUpdateGeo();
    }
    geo: Geometry;
    private initOrUpdateGeo() {
        let { _origin: origin, _gpsArr } = this;
        let mat = mat4.fromTranslation(mat4.create(), origin);
        mat4.invert(mat, mat);
        this._invertMat = mat;

        let data = new Float32Array(_gpsArr.length * 3);

        _gpsArr.forEach((el, index) => {
            let localPos = Tiles3d.ws84ToEcef(el, vec3.create())
            mat4.transformPoint(vec3.fromTypedArray(data, index), localPos as any, mat);
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
            this.geo.attributes[VertexAttEnum.POSITION].set({ data })
        }

        if (this.clampToGround) {
            Promise.all(_gpsArr.map((el, index) => clampToGround(this.system, el)))
                .then(results => {
                    results.forEach((el, index) => {
                        let localPos = mat4.transformPoint(Tempt.getVec3(), el, mat);
                        this.localPoints.push(localPos[0], localPos[1], localPos[2]);
                    })
                    this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints })
                })
        }
    }
    private localPoints: number[] = [];
    addPoint(point: vec3) {
        if (this.clampToGround) {
            clampToGround(this.system, point)
                .then(clamp => {
                    let localPos = mat4.transformPoint(vec3.create(), clamp, this._invertMat);
                    this.localPoints.push(localPos[0], localPos[1], localPos[2]);
                    this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints })
                })
        } else {
            let localPos = mat4.transformPoint(vec3.create(), point, this._invertMat);
            this.localPoints.push(localPos[0], localPos[1], localPos[2]);
            this.geo.attributes[VertexAttEnum.POSITION].set({ data: this.localPoints })
        }
    }

    update(system: Tiles3d.TilesetSystem) {

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
                return true
            }
        })
        return task.ins;
    }
}