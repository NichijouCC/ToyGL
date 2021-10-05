import { CameraComponent } from './cameraComponent';
import { ECS } from "../core/ecs";
import { Component } from "../scene";
import { quat, vec3 } from '../mathD';
import { Input, KeyCodeEnum, MouseKeyEnum } from '../input';

@ECS.registComp
export class ManualCamera extends Component {
    moveSpeed: number = 1;
    rotSpeed: number = 1;
    private _aTotalTime: number = 0;
    private _aTotalTime_to: number = 5;
    private _aSpeed_to: number = 30;
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
                let speed = this._aSpeed_to * Math.pow(this._aTotalTime / this._aTotalTime_to, 2.0) + 1.0;
                quat.setAxisAngle(tempt_q, rotDir, 0.01 * length * speed * Math.PI / 180);
                quat.multiply(tempt_q, comp.entity.localRotation, tempt_q);
                comp.entity.localRotation = tempt_q;
            } else {
                this._aTotalTime = 0;
            }
        });
    }
    private _totalTime: number = 0;
    private _totalTime_to: number = 5;
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
            if (Input.getKeyDown(KeyCodeEnum.Q)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, up, this.moveSpeed * deltaTime))
            }
            if (Input.getKeyDown(KeyCodeEnum.E)) {
                _pressed = true;
                vec3.add(move, move, vec3.scale(tempt, up, -1 * this.moveSpeed * deltaTime))
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
            if (Input.getMouseDown(MouseKeyEnum.Right)) {
                this._aTotalTime += deltaTime;
            } else {
                this._aTotalTime = 0;
            }
        }
    }

    clone(): Component {
        throw new Error("Method not implemented.");
    }
}