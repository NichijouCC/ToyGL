import { CameraComponent, Input, mat4, MouseKeyEnum, quat, Tiles3d, vec2, vec3, vec4, World } from "TOYGL";

/**
 * gis类相机控制:
 *      1. 鼠标左键拖拽
 *      2. 鼠标右键旋转
 * @param world
 * @param system
 */

export function initGisCameraController(world: World, system: Tiles3d.TilesetSystem) {
    let beActiveDrag = false;
    let beActiveRot = false;

    let translateCamera: (pos: vec2) => void;
    let rotCamera: (movement: vec2) => void;
    Input.mouse.on("mousedown", (ev) => {
        if (ev.keyType == MouseKeyEnum.Left) {
            beActiveDrag = true;
            let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
            let pickResult = system.rayTest(ray);
            if (pickResult == null)
                return;
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
            };
        } else if (ev.keyType == MouseKeyEnum.Right) {
            beActiveRot = true;
            let ray = world.mainCamera.screenPointToRay(Input.mouse.position);
            let pickResult = system.rayTest(ray);
            if (pickResult == null)
                return;
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
            };
        }
    });

    Input.mouse.on("mouseup", (ev) => {
        beActiveDrag = false;
        beActiveRot = false;
    });
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
        if (comp == null)
            return;
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
