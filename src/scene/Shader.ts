import { ShaderProgram, IshaderProgramOption } from "../webgl/ShaderProgam";
import { RenderLayerEnum } from "./RenderLayer";
import { Material } from "./Material";

interface IshaderOption extends IshaderProgramOption
{
    layer?: RenderLayerEnum;
    queue?: number;
}

export class Shader extends ShaderProgram
{
    private _layer: RenderLayerEnum;
    queue: number;
    constructor(options: IshaderOption)
    {
        super(options);
        this._layer = options.layer || RenderLayerEnum.Geometry;
        this.queue = options.queue ?? 0;
    }

    set layer(layer: RenderLayerEnum)
    {
        this._layer = layer;
    }

    get layer()
    {
        return this._layer;
    }

    _refMaterials: Material[] = [];
}