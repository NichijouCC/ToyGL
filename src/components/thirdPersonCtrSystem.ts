import { Entity } from "../core/entity";
import { InputCtr, KeyCodeEnum, MouseKeyEnum } from "../input";
import { mat4, quat, vec3, vec4 } from "../mathD";
import { InterScene } from "../scene/scene";
import { AbstractCompSystem } from "./abstractCompSystem";
import { ThirdPersonController } from "./thirdPersonController";

export class ThirdPersonCtrSystem extends AbstractCompSystem<ThirdPersonController> {
    careCompCtors: (new () => ThirdPersonController)[] = [ThirdPersonController];
    private scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this.scene = scene;
    }

    private targeCtr: ThirdPersonController;
    private rotAngle = 0;
    private _init = false;
    private init() {
        this._init = true;
        InputCtr.mouse.on("mousemove", (ev) => {
            if (this.scene == null || this.targeCtr == null) return;
            if (InputCtr.getMouseDown(MouseKeyEnum.Left)) {
                this.rotAngle += 0.1 * ev.movementX * this.targeCtr.camRotSpeed;
            }
        });

        let camNodeForkward = vec3.create();
        let moved = vec3.create();
        let targetPos = vec3.create();
        let targetRot = quat.create();
        let temptRot = quat.create();

        InputCtr.mouse.on("mousewheel", (ev) => {
            if (this.scene == null || this.targeCtr == null) return;
            let camNode = this.scene.mainCamera;
            let { moveSpeed, rotSpeed, entity } = this.targeCtr;
            vec3.copy(camNodeForkward, camNode.forwardInword);
            vec3.projectToPlan(camNodeForkward, camNodeForkward, vec3.UP);
            vec3.normalize(camNodeForkward, camNodeForkward);

            if (ev.rotateDelta > 0) {
                quat.rotationTo(targetRot, vec3.FORMAWORLD, camNodeForkward);
            } else if (ev.rotateDelta < 0) {
                quat.rotationTo(targetRot, vec3.BACKWORLD, camNodeForkward);
            }

            vec3.scale(moved, camNodeForkward, moveSpeed * (ev.rotateDelta ?? 0.1) * -0.001);
            vec3.add(targetPos, moved, entity.worldPosition);
            entity.worldPosition = targetPos;
            quat.slerp(temptRot, entity.worldRotation, targetRot, Math.min(0.05 * rotSpeed, 1));
            entity.worldRotation = temptRot;
        })
    }


    update = (() => {
        /**
         * dirz
         */
        let moveForward = vec3.create();
        let moved = vec3.create();
        let targetPos = vec3.create();

        let dir = vec3.create();
        let targetRot = quat.create();
        let temptRot = quat.create();

        //----cam
        let camOffset = vec3.create();

        return (delta: number) => {
            if (this.comps.size == 0) return;
            let comp: ThirdPersonController = this.comps.values().next().value[0];
            this.targeCtr = comp;
            if (this._init == false) this.init();
            vec3.zero(dir);
            if (InputCtr.getKeyDown(KeyCodeEnum.A)) {
                vec3.add(dir, dir, vec3.LEFT);
            }
            if (InputCtr.getKeyDown(KeyCodeEnum.D)) {
                vec3.add(dir, dir, vec3.RIGHT);
            }
            if (InputCtr.getKeyDown(KeyCodeEnum.W)) {
                vec3.add(dir, dir, vec3.BACKWORLD);
            }
            if (InputCtr.getKeyDown(KeyCodeEnum.S)) {
                vec3.add(dir, dir, vec3.FORMAWORLD);
            }

            let cam = this.scene.mainCamera;
            let { moveSpeed, rotSpeed, offsetTocamera, entity } = comp;
            if (vec3.len(dir) != 0) {
                mat4.transfromVector(moveForward, dir, cam.worldMatrix);
                vec3.projectToPlan(moveForward, moveForward, vec3.UP);
                vec3.normalize(moveForward, moveForward);

                quat.rotationTo(targetRot, vec3.BACKWORLD, moveForward);
                vec3.scale(moved, moveForward, moveSpeed * delta);
                vec3.add(targetPos, moved, entity.worldPosition);
                entity.worldPosition = targetPos;
                quat.slerp(temptRot, entity.worldRotation, targetRot, delta * rotSpeed);
                entity.worldRotation = temptRot;
            }
            vec3.rotateY(camOffset, offsetTocamera, vec3.ZERO, -1 * this.rotAngle * Math.PI / 180);
            vec3.add(cam.node.worldPosition, entity.worldPosition, camOffset);
            cam.lookAt(entity);
        }
    })();
}