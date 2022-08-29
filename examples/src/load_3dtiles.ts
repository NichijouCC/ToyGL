import { CameraComponent, ClickEvent, Component, DefaultGeometry, DefaultMaterial, glMatrix, Input, KeyCodeEnum, ManualCamera, mat4, MouseKeyEnum, quat, Tiles3d, ToyGL, vec2, vec3, vec4 } from "TOYGL";
import { ecefToWs84, surfaceEnuEastFromGps, surfaceEnuNorthFromGps, surfaceEnuZUnitFromGps, transformEnuToEcef, ws84ToEcef } from "../../src/extends/3dtiles/math";
glMatrix.setMatrixArrayType(Float64Array as any);

window.onload = () => {
    const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
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

            let pickPoint = vec3.create();
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
                } else if (ev.keyType == MouseKeyEnum.Middle) {
                    beActiveRot = true;
                    let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
                    let pickPoint = system.rayTest(ray);

                    let gps = ecefToWs84(pickPoint, vec3.create() as any);
                    let upAxis = surfaceEnuZUnitFromGps(gps);
                    let eastAxis = surfaceEnuEastFromGps(gps);
                    rotCamera = (ev: vec2) => {
                        let rotX = quat.setAxisAngle(quat.create(), upAxis, ev[0] / world.screen.width);
                        let rotY = quat.setAxisAngle(quat.create(), eastAxis, ev[1] / world.screen.width);
                        let rot = quat.multiply(quat.create(), rotX, rotY);
                        let originRot = world.mainCamera.entity.worldRotation;
                        world.mainCamera.entity.worldRotation = quat.multiply(quat.create(), rot, originRot);
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
        })
}