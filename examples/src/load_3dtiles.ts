import { CameraComponent, Component, DefaultGeometry, DefaultMaterial, glMatrix, Input, KeyCodeEnum, ManualCamera, mat4, MouseKeyEnum, quat, Tiles3d, ToyGL, vec2, vec3 } from "TOYGL";
import { ecefToWs84, surfaceEnuNorthFromGps, surfaceEnuZUnitFromGps, transformEnuToEcef, ws84ToEcef } from "../../src/extends/3dtiles/math";
glMatrix.setMatrixArrayType(Float64Array as any);

window.onload = () => {
    const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
    world.registComp(GisManualCamera);
    let system = new Tiles3d.TilesetSystem(world);
    world.addSystem(system);

    const cam = world.addNewCamera();
    let loader = new Tiles3d.Loader();
    loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/jiugang_20220727/Production_2.json")
        .then(res => {
            let node = world.addNewChild();
            let comp = node.addComponent(Tiles3d.TilesetRender);
            comp.asset = res;

            let center = world.addNewChild();
            center.localMatrix = transformEnuToEcef(res.boundingVolume.center);
            center.addChild(cam.entity);

            cam.viewTargetPoint(res.boundingVolume.center, 1300, vec3.fromValues(0, 0, 0));
            cam.entity.addComponent(GisManualCamera);

            let lookAt: vec3;
            Input.mouse.on("mousedown", (ev) => {
                if (ev.keyType == MouseKeyEnum.Left) {
                    if (lookAt == null) {
                        let ray = world.mainCamera.viewportPointToRay(vec2.fromValues(0.5, 0.5));
                        lookAt = system.rayTest(ray);
                    }
                    let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
                    let point = system.rayTest(ray);
                    console.log("raytest", point);

                    if (point != null && lookAt) {
                        let scale = mat4.fromRotationTranslationScale(mat4.create(), quat.IDENTITY, point, vec3.fromValues(0.1, 0.1, 0.1));
                        world.addRenderIns({
                            geometry: DefaultGeometry.cube,
                            material: DefaultMaterial.color_3d.clone(),
                            worldMat: scale
                        });
                        let offset = vec3.subtract(vec3.create(), point, lookAt);
                        lookAt = point;
                        let worldPos = world.mainCamera.worldPos;
                        world.mainCamera.entity.worldPosition = vec3.add(vec3.create(), worldPos, offset)
                        // let gps = ecefToWs84(point, vec3.create() as any);

                        // let normal = surfaceEnuZUnitFromGps(gps);
                        // let camPos = vec3.scaleAndAdd(vec3.create(), point, normal, 300);
                        // world.mainCamera.entity.worldPosition = camPos;

                        // let north = surfaceEnuNorthFromGps(gps);
                        // world.mainCamera.lookAtPoint(point, north);
                    }
                }
            })
        })
}



export class GisManualCamera extends Component {
    moveSpeed: number = 1;
    rotSpeed: number = 1;
    init() {
        let rotDir = vec3.create();
        let tempt_x = vec3.create();
        let tempt_q = quat.create();
        Input.mouse.on("mousemove", (ev) => {
            let comp = this.entity.getComponent(CameraComponent);
            if (comp == null) return;
            if (Input.getMouseDown(MouseKeyEnum.Right)) {
                tempt_x[0] = ev.movementX;
                tempt_x[1] = ev.movementY;
                let length = vec3.len(tempt_x);
                vec3.normalize(tempt_x, tempt_x);
                vec3.cross(rotDir, tempt_x, vec3.FORWARD);
                vec3.normalize(rotDir, rotDir);
                quat.setAxisAngle(tempt_q, rotDir, 0.01 * length * this.rotSpeed * Math.PI / 180);
                quat.multiply(tempt_q, comp.entity.localRotation, tempt_q);
                comp.entity.localRotation = tempt_q;
            }
        });
        Input.mouse.on("mousewheel", (ev) => {
            let comp = this.entity.getComponent(CameraComponent);
            if (comp == null) return;
            let forward = comp.forwardInWorld;
            let worldPos = comp.worldPos;
            let newPos = vec3.scaleAndAdd(vec3.create(), worldPos, forward, -1 * ev.rotateDelta);
            comp.entity.worldPosition = newPos;
        });
    }
    private _totalTime: number = 0;
    private _totalTime_to: number = 3;
    private _speed_to: number = 50;

    update(deltaTime: number) {
        let comp = this.entity.getComponent(CameraComponent);
        if (comp != null) {
            let move = vec3.create();
            let tempt = vec3.create();
            let forward = comp.forwardInWorld;
            let right = comp.rightInWorld;
            let up = comp.upInWorld;


            let _pressed = false;
            if (Input.getKeyDown(KeyCodeEnum.A)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, right, -1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.D)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, right, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.W)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, forward, -1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.S)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, forward, 1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.Z)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, up, -1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.C)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, up, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.Q)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, vec3.UP, -1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.E)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, vec3.UP, this.moveSpeed * deltaTime))
            }
            if (_pressed) {
                this._totalTime += deltaTime;
                if (!vec3.equals(move, vec3.ZERO)) {
                    vec3.scale(move, move, this._speed_to * Math.pow(this._totalTime / this._totalTime_to, 2.0) + 1.0)
                    let target = vec3.add(move, comp.entity.worldPosition, move);
                    comp.entity.worldPosition = target;
                }
            } else {
                this._totalTime = 0;
            }
        }
    }

    clone(): ManualCamera {
        throw new Error("Method not implemented.");
    }
}