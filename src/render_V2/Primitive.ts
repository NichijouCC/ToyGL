import { GeometryInstance } from "./GeometryInstance";
import { Mat4 } from "../mathD/mat4";
import { FrameState } from "./FrameState";
import { DrawCommand } from "./DrawCommand";

export class Primitive {
    geometryInstances: GeometryInstance | GeometryInstance[];
    appearance: any;
    modelMatrix: Mat4;

    show: boolean;
    interleave: boolean;
    vertexCacheOptimize: boolean;
    cull: boolean;
    private drawCommand: DrawCommand[];
    constructor(option: Primitive) {
        this.geometryInstances = option.geometryInstances;
        this.appearance = option.appearance;
        this.modelMatrix = option.modelMatrix || Mat4.identity();
        // eslint-disable-next-line prettier/prettier
        this.show = option.show ?? true;
        this.interleave = option.interleave ?? false;
        this.vertexCacheOptimize = option.vertexCacheOptimize ?? false;
        this.cull = option.cull ?? true;
    }

    update(frameState: FrameState) {

    }
}

export interface IprimitiveOption {
    geometryInstances: GeometryInstance | GeometryInstance[];
    appearance?: any;
    modelMatrix?: Mat4;

    show?: boolean;
    interleave?: boolean;
    vertexCacheOptimize?: boolean;
    cull?: boolean;
}
