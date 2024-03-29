import { mat4, vec3 } from "../mathD";
import { ICamera } from "../render/camera";

export interface ISceneCamera extends ICamera {
    priority: number;
    worldPos: vec3;
    worldMatrix: mat4;
    forwardInWorld: vec3;
}