import { RenderCommand } from "../webgl/RenderCommand";
import { CullingMask } from "./Camera";
import { Material } from "./Material";

export class DrawCommand extends RenderCommand
{
    cullingMask?: CullingMask;
    material: Material;
}