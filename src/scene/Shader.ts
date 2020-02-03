import { ShaderProgam, IshaderProgramOption } from "../webgl/ShaderProgam";
import { RenderLayerEnum } from "./RenderLayer";

interface IshaderOption extends IshaderProgramOption
{
    layer?: RenderLayerEnum;
    queue?: number;
}

export class Shader extends ShaderProgam
{
    layer: RenderLayerEnum;
    queue: number;
    constructor(options: IshaderOption)
    {
        super(options);
        this.layer = options.layer || RenderLayerEnum.Geometry;
        this.queue = options.queue ?? 0;
    }
}