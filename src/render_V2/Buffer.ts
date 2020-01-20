import { Context } from "../core/context";
import { VertexBuffer } from "../webgl/buffer";

export enum BufferUsageEnum{
    STATIC_DRAW,
    DYNAMIC_DRAW
}
export type TypedArray=Float32Array