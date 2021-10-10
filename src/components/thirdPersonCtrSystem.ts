import { Input, KeyCodeEnum, MouseKeyEnum } from "../input";
import { mat4, quat, vec3, vec4 } from "../mathD";
import { InterScene, System } from "../scene";
import { ThirdPersonController } from "./thirdPersonController";

export class ThirdPersonCtrSystem extends System {
    caries = { comps: [ThirdPersonController] };
    private _scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this._scene = scene;
    }

    private targeCtr: ThirdPersonController;
    private rotAngle = 0;

    async init() {
        Input.mouse.on("mousemove", (ev) => {
            if (this._scene == null || this.targeCtr == null) return;
            if (Input.getMouseDown(MouseKeyEnum.Left)) {
                this.rotAngle += 0.1 * ev.movementX * this.targeCtr.camRotSpeed;
            }
        });

        const camNodeForward = vec3.create();
        const moved = vec3.create();
        const targetPos = vec3.create();
        const targetRot = quat.create();
        const temptRot = quat.create();

        Input.mouse.on("mousewheel", (ev) => {
            if (this._scene?.mainCamera == null || this.targeCtr == null) return;
            const camNode = this._scene.mainCamera;
            const { moveSpeed, rotSpeed, entity } = this.targeCtr;
            vec3.copy(camNodeForward, camNode.forwardInWorld);
            vec3.projectToPlan(camNodeForward, camNodeForward, vec3.UP);
            vec3.normalize(camNodeForward, camNodeForward);

            if (ev.rotateDelta > 0) {
                quat.rotationTo(targetRot, vec3.FORWARD, camNodeForward);
            } else if (ev.rotateDelta < 0) {
                quat.rotationTo(targetRot, vec3.BACKWARD, camNodeForward);
            }

            vec3.scale(moved, camNodeForward, moveSpeed * (ev.rotateDelta ?? 0.1) * -0.001);
            vec3.add(targetPos, moved, entity.worldPosition);
            entity.worldPosition = targetPos;
            quat.slerp(temptRot, entity.worldRotation, targetRot, Math.min(0.05 * rotSpeed, 1));
            entity.worldRotation = temptRot;
        });
    }

    update = (() => {
        /**
         * dirZ
         */
        let moveForward = vec3.create();
        let moved = vec3.create();
        let targetPos = vec3.create();
        let temptStartPos = vec3.create();
        let temptEndPos = vec3.create();

        let dir = vec3.create();
        let targetRot = quat.create();
        let temptRot = quat.create();

        // ----cam
        let camOffset = vec3.create();
        let camDir = vec3.create();
        let camWorldPos = vec3.create();

        return (delta: number) => {
            if (this.queries.comps.length == 0 || this._scene?.mainCamera == null) return;
            const comp = this.queries.comps[0].getComponent(ThirdPersonController);
            this.targeCtr = comp;
            if (!comp.canMove) return;
            vec3.zero(dir);
            if (Input.getKeyDown(KeyCodeEnum.A)) {
                vec3.add(dir, dir, vec3.LEFT);
            }
            if (Input.getKeyDown(KeyCodeEnum.D)) {
                vec3.add(dir, dir, vec3.RIGHT);
            }
            if (Input.getKeyDown(KeyCodeEnum.W)) {
                vec3.add(dir, dir, vec3.BACKWARD);
            }
            if (Input.getKeyDown(KeyCodeEnum.S)) {
                vec3.add(dir, dir, vec3.FORWARD);
            }

            const { moveSpeed, rotSpeed, dirToCamera, distanceToCam, entity } = comp;
            const cam = this._scene.mainCamera;
            if (vec3.len(dir) != 0) {
                const worldPos = entity.worldPosition;
                mat4.transformVector(moveForward, dir, cam.worldMatrix);
                vec3.projectToPlan(moveForward, moveForward, vec3.UP);
                vec3.normalize(moveForward, moveForward);

                vec3.scale(moved, moveForward, moveSpeed * delta);
                vec3.add(targetPos, moved, worldPos);

                if (comp.beIntersectCollision) {
                    vec3.copy(temptStartPos, worldPos);
                    temptStartPos[1] += 1;
                    vec3.scaleAndAdd(temptEndPos, temptStartPos, moveForward, 1.3);
                    const result = this._scene.intersectCollider(temptStartPos, temptEndPos);
                    // this._toy.gizmos.drawLine(temptStartPos, temptEndPos);

                    if (!result.hasHit) {
                        entity.worldPosition = targetPos;
                    }
                } else {
                    entity.worldPosition = targetPos;
                }
                quat.rotationTo(targetRot, vec3.BACKWARD, moveForward);
                quat.slerp(temptRot, entity.worldRotation, targetRot, delta * rotSpeed);
                entity.worldRotation = temptRot;
            }
            vec3.normalize(camDir, dirToCamera);
            vec3.scale(camDir, camDir, distanceToCam);
            vec3.rotateY(camOffset, camDir, vec3.ZERO, -1 * this.rotAngle * Math.PI / 180);
            vec3.add(camWorldPos, entity.worldPosition, camOffset);
            cam.entity.worldPosition = camWorldPos;
            cam.lookAt(entity);
        };
    })();
}
