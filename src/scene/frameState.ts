import { Camera } from "../ec/components/camera";

import { IgeometryInfo, IprogramInfo } from "../render/glRender";
import { Geometry } from "../resources/assets/geometry";
import { Material } from "../resources/assets/material";
import { Mat4 } from "../mathD/mat4";
import { CullingMask } from "../ec/ec";

export interface IframeState {
    renderList: Irenderable[];
    cameraList: Camera[];
    deltaTime: number;
}

export interface Irenderable {
    maskLayer: CullingMask;
    geometry: Geometry;
    // program: IprogramInfo;
    // uniforms: { [name: string]: any };
    material: Material;
    modelMatrix: Mat4;
}

export class FrameState implements IframeState {
    deltaTime: number;
    renderList: Irenderable[] = [];
    cameraList: Camera[] = [];

    reInit() {
        this.renderList.length = 0;
        this.cameraList.length = 0;
    }
}
