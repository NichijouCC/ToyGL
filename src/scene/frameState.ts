import { Camera } from "../ec/components/camera";
import { Light } from "../ec/components/light";

import { Geometry } from "../resources/assets/geometry";
import { Material } from "../resources/assets/material";
import { Mat4 } from "../mathD/mat4";
import { CullingMask } from "../ec/ec";
import { BoundingSphere } from "./Bounds";

export interface IframeState
{
    renderList: Irenderable[];
    cameraList: Camera[];
    lightList: Light[];
    deltaTime: number;
}

export interface Irenderable
{
    maskLayer: CullingMask;
    geometry: Geometry;
    // program: IprogramInfo;
    // uniforms: { [name: string]: any };
    material: Material;
    modelMatrix: Mat4;
    bouningSphere?: BoundingSphere;

    castShadow?: boolean;
    receiveShadow?: boolean;
}

export class FrameState implements IframeState
{
    deltaTime: number;
    renderList: Irenderable[] = [];
    cameraList: Camera[] = [];
    lightList: Light[] = [];
}
