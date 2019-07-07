import { Icomponent, Ientity, EC } from "../ec";
import { IframeState } from "../../scene/frameState";
import { Entity } from "../entity";
import { Quat } from "../../mathD/quat";
import { Input } from "../../input/Inputmgr";
import { MouseEventEnum, MouseKeyEnum, ClickEvent } from "../../input/mouse";
import { GameTimer } from "../../gameTimer";
import { KeyCodeEventEnum, KeyCodeEnum } from "../../input/keyboard";
import { Camera } from "./camera";
import { Vec3 } from "../../mathD/vec3";

@EC.RegComp
export class CameraController implements Icomponent {
    entity: Entity;
    update(frameState: IframeState): void {
        this.doMove(frameState.deltaTime);
    }
    dispose(): void {}

    moveSpeed: number = 0.2;
    movemul: number = 5;
    wheelSpeed: number = 1;
    rotateSpeed: number = 0.1;
    keyMap: { [id: number]: boolean } = {};
    beRightClick: boolean = false;

    rotAngle: Vec3 = Vec3.create();
    active() {
        Quat.ToEuler(this.entity.transform.localRotation, this.rotAngle);
        Input.addMouseEventListener(MouseEventEnum.Move, ev => {
            if (Input.getMouseDown(MouseKeyEnum.Right)) {
                this.doRotate(ev.movementX, ev.movementY);
            }
        });
        Input.addKeyCodeEventListener(KeyCodeEventEnum.Up, ev => {
            this.moveSpeed = 0.2;
        });
        Input.addMouseEventListener(MouseEventEnum.Rotate, ev => {
            this.doMouseWheel(ev);
        });
        // Input.addMouseWheelEventListener((ev)=>{
        //     this.doMouseWheel(ev);
        // })
    }
    private inverseDir: number = -1;
    private moveVector: Vec3 = Vec3.create();
    doMove(delta: number) {
        if (this.entity.getCompByName("Camera") == null) return;
        if (Input.getMouseDown(MouseKeyEnum.Right)) {
            if (Input.getKeyDown(KeyCodeEnum.A)) {
                this.moveSpeed += this.movemul * delta;
                this.entity.transform.getRightInWorld(this.moveVector);
                Vec3.scale(this.moveVector, -1 * this.moveSpeed * delta, this.moveVector);
                // vec3.scale(this.moveVector,this.inverseDir,this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            if (Input.getKeyDown(KeyCodeEnum.D)) {
                this.moveSpeed += this.movemul * delta;
                this.entity.transform.getRightInWorld(this.moveVector);
                Vec3.scale(this.moveVector, this.moveSpeed * delta, this.moveVector);
                // vec3.scale(this.moveVector,this.inverseDir,this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            if (Input.getKeyDown(KeyCodeEnum.W)) {
                this.moveSpeed += this.movemul * delta;
                this.entity.transform.getForwardInWorld(this.moveVector);
                Vec3.scale(this.moveVector, this.moveSpeed * delta, this.moveVector);
                Vec3.scale(this.moveVector, this.inverseDir, this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            if (Input.getKeyDown(KeyCodeEnum.S)) {
                this.moveSpeed += this.movemul * delta;
                this.entity.transform.getForwardInWorld(this.moveVector);
                Vec3.scale(this.moveVector, -1 * this.moveSpeed * delta, this.moveVector);
                Vec3.scale(this.moveVector, this.inverseDir, this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            if (Input.getKeyDown(KeyCodeEnum.E)) {
                this.moveSpeed += this.movemul * delta;
                Vec3.scale(Vec3.UP, this.moveSpeed * delta, this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            if (Input.getKeyDown(KeyCodeEnum.Q)) {
                this.moveSpeed += this.movemul * delta;
                Vec3.scale(Vec3.DOWN, this.moveSpeed * delta, this.moveVector);
                Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            }
            // this.entity.transform.markDirty();
        }
    }
    private camrot = Quat.create();
    doRotate(rotateX: number, rotateY: number) {
        // this.rotAngle[0] += rotateY * this.rotateSpeed;
        // this.rotAngle[1] += rotateX * this.rotateSpeed;
        // this.rotAngle[0] %= 360;
        // this.rotAngle[1] %= 360;
        Quat.FromEuler(0, rotateX * this.rotateSpeed * this.inverseDir, 0, this.camrot);
        Quat.multiply(this.camrot, this.entity.transform.localRotation, this.entity.transform.localRotation);
        Quat.FromEuler(rotateY * this.rotateSpeed * this.inverseDir, 0, 0, this.camrot);
        Quat.multiply(this.entity.transform.localRotation, this.camrot, this.entity.transform.localRotation);
        // this.entity.transform.markDirty();
    }
    private doMouseWheel(ev: ClickEvent) {
        if (this.entity.getCompByName("Camera") == null) return;
        this.entity.transform.getForwardInWorld(this.moveVector);
        Vec3.scale(this.moveVector, this.wheelSpeed * ev.rotateDelta * 0.01 * this.inverseDir, this.moveVector);
        Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
        // this.entity.transform.markDirty();
    }
    Dispose() {}
}
