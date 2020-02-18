import { Shader, IlayerIndexEvent } from "./Shader";
import { RenderLayerEnum } from "./RenderLayer";
import { RenderState } from "./RenderState";
import { ValueEvent } from "../core/Event";

namespace Private
{
    export let id = 0;
}

export class Material
{
    name: string;
    uniformParameters: { [name: string]: any } = {};
    private _shader: Shader;
    set shader(shader: Shader)
    {
        if (this._shader != shader)
        {
            let oldShader = this._shader;
            this._shader?.onchangeLayerIndex.removeEventListener(this._onshaderchangeLayerIndex);
            this._shader = shader;
            shader?.onchangeLayerIndex.addEventListener(this._onshaderchangeLayerIndex);

            this.onchangeShader.raiseEvent(this, oldShader, shader);
        }
    };

    get shader() { return this._shader };
    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0)
    {
        if (this._layer != layer)
        {
            this.onchangeLayer.raiseEvent(this, this._layer, layer);
        }
        this._layer = layer;
        this._layerIndex = layer + queue;
    }
    get layerIndex() { return this._layerIndex ?? this._shader.layerIndex };
    private _onshaderchangeLayerIndex = (target: Shader, oldValue: IlayerIndexEvent, newValue: IlayerIndexEvent) =>
    {
        if (this._layerIndex == null)
        {
            if (oldValue.layer != newValue.layer)
            {
                this.onchangeLayer.raiseEvent(this, oldValue.layer, newValue.layer);
            }
        }
    }
    onchangeLayer = new ValueEvent<Material, RenderLayerEnum>();
    onchangeShader = new ValueEvent<Material, Shader>();

    renderState: RenderState = new RenderState();
    readonly id: number;
    constructor(name?: string)
    {
        this.name = name;
        this.id = Private.id++;
    }
    setParameter(uniformKey: string, value: any)
    {
        this.uniformParameters[uniformKey] = value;
    }
    dispose(): void { }
}