import { ShaderProgram, IshaderProgramOption } from "../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../RenderLayer";
import { Material } from "./Material";
import { ValueEvent } from "../../core/Event";
import { Asset } from "./Asset";

export class Shader extends Asset
{
    private _shader: ShaderProgram;
    get glShader() { return this._shader };
    set glShader(shader: ShaderProgram)
    {
        if (this._shader)
        {
            this._shader.destroy();
        }
        this._shader = shader;
    }
    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0)
    {
        let layerIndex = layer + queue;
        if (this._layerIndex != layerIndex)
        {
            this.onchangeLayerIndex.raiseEvent(this, { layer: this._layer, layerIndex: this._layerIndex }, { layer, layerIndex });

            this._layer = layer;
            this._layerIndex = layerIndex;
        }
    }
    get layerIndex() { return this._layerIndex }
    onchangeLayerIndex = new ValueEvent<Shader, IlayerIndexEvent>();
}

export interface IlayerIndexEvent
{
    layer: RenderLayerEnum;
    layerIndex: number
}