import { ShaderProgram, IshaderProgramOption } from "../webgl/ShaderProgam";
import { RenderLayerEnum } from "./RenderLayer";
import { Material } from "./Material";
import { ValueEvent } from "../core/Event";

namespace Private
{
    export let id = 0;
}
interface IshaderOption extends IshaderProgramOption
{
    layer?: RenderLayerEnum;
    queue?: number;
}


export class Shader extends ShaderProgram
{
    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0)
    {
        let layerIndex = layer + queue;
        if (this._layerIndex != layerIndex)
        {
            this.onchangeLayerIndex.raiseEvent({ layer: this._layer, layerIndex: this._layerIndex }, { layer, layerIndex });

            this._layer = layer;
            this._layerIndex = layerIndex;
        }
    }
    get layerIndex() { return this._layerIndex }
    readonly id: number;
    constructor(options: IshaderOption)
    {
        super(options);
        this._layer = options.layer || RenderLayerEnum.Geometry;
        this.id = Private.id++;
    }
    onchangeLayerIndex = new ValueEvent<IlayerIndexEvent>();
}

export interface IlayerIndexEvent
{
    layer: RenderLayerEnum;
    layerIndex: number
}