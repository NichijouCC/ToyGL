import { Color, mat4, Rect } from "../mathD";
import { RenderTarget } from "./renderTarget";

export interface ICamera {
    viewport: Rect;
    viewMatrix: mat4,
    worldMatrix: mat4,
    projectMatrix: mat4,
    enableClearColor: boolean;
    backgroundColor: Color;
    enableClearDepth: boolean;
    dePthValue: number;
    enableClearStencil: boolean;
    stencilValue: number;
    cullingMask: LayerMask;
    renderTarget?: RenderTarget;
}

export class Camera implements ICamera {
    viewport: Rect = Rect.create(0, 0, 1, 1);
    enableClearColor = true;
    backgroundColor: Color = Color.create(0.3, 0.3, 0.3, 1);
    enableClearDepth: boolean = true;
    dePthValue: number = 1.0;
    enableClearStencil = false;
    stencilValue: number = 0;
    /**
     * 控制需要渲染的层级
     */
    cullingMask: number = LayerMask.everything;
    worldMatrix: mat4 = mat4.create();
    viewMatrix: mat4 = mat4.create();
    projectMatrix: mat4 = mat4.create();
    renderTarget: RenderTarget;
    constructor(options?: Partial<Camera>) {
        if (options) {
            for (let key in options) {
                (this as any)[key] = (options as any)[key];
            }
        }
    }
}


/**
 * 物体分层,一层占一个二进制位
 */
export enum LayerMask {
    everything = 0xffffffff,
    default = 0x00000001,
    ui = 0x00000002,
    editor = 0x00000004,
    model = 0x00000008,
}
