import { ShaderProgram, IshaderProgramOption } from "../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../RenderLayer";
import { Asset } from "./Asset";

namespace Private
{
    export let sortId: number = 0;
}

export class Shader extends Asset
{
    private _shader: ShaderProgram;
    get glShader() { return this._shader };
    set glShader(shader: ShaderProgram)
    {
        if (this._shader != shader)
        {
            if (this._shader) { this._shader.destroy(); }
            this._shader = shader;
            this.onDirty.raiseEvent();
        }
    }
    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0)
    {
        let layerIndex = layer + queue;
        if (this._layerIndex != layerIndex)
        {
            this._layer = layer;
            this._layerIndex = layerIndex;
            this.onDirty.raiseEvent();
        }
    }
    get layerIndex() { return this._layerIndex }
    readonly sortId: number;
    constructor()
    {
        super();
        this.sortId = Private.sortId++;
    }
}

export interface IlayerIndexEvent
{
    layer: RenderLayerEnum;
    layerIndex: number
}