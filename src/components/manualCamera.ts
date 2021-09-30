import { CameraComponent } from ".";
import { Input, KeyCodeEnum, MouseKeyEnum, quat, vec3 } from "..";
import { ECS } from "../core/ecs";
import { Component } from "../scene";

@ECS.registerComp
export class ManualCamera extends Component {
    moveSpeed: number = 5;
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
                quat.setAxisAngle(tempt_q, rotDir, length * this.rotSpeed);
                quat.multiply(tempt_q, comp.entity.worldRotation, tempt_q);
                comp.entity.worldRotation = tempt_q;
            }
        });
        this.totalTime[KeyCodeEnum.A] = 0;
        this.totalTime[KeyCodeEnum.D] = 0;
        this.totalTime[KeyCodeEnum.W] = 0;
        this.totalTime[KeyCodeEnum.S] = 0;
        this.totalTime[KeyCodeEnum.Q] = 0;
        this.totalTime[KeyCodeEnum.E] = 0;
    }
    private totalTime: { [keycode: string]: number } = {};
    update(deltaTime: number) {
        let comp = this.entity.getComponent(CameraComponent);
        if (comp != null) {
            let move = vec3.create();
            let tempt = vec3.create();
            let forward = comp.forwardInWorld;
            let right = comp.rightInWorld;
            let up = comp.upInWorld;

            if (Input.getKeyDown(KeyCodeEnum.A)) {
                vec3.add(move, move, vec3.scale(tempt, right, -1 * this.moveSpeed * deltaTime))
            } else {
                this.totalTime[KeyCodeEnum.A] = 0;
            }
            if (Input.getKeyDown(KeyCodeEnum.D)) {
                vec3.add(move, move, vec3.scale(tempt, right, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.W)) {
                vec3.add(move, move, vec3.scale(tempt, forward, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.S)) {
                vec3.add(move, move, vec3.scale(tempt, forward, -1 * this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.Q)) {
                vec3.add(move, move, vec3.scale(tempt, up, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.E)) {
                vec3.add(move, move, vec3.scale(tempt, up, -1 * this.moveSpeed * deltaTime))
            }
            let target = vec3.add(move, comp.entity.worldPosition, move);
            comp.entity.worldPosition = target;
        }
    }

    clone(): Component {
        throw new Error("Method not implemented.");
    }
}