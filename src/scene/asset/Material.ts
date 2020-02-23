import { Shader, IlayerIndexEvent } from "./Shader";
import { RenderLayerEnum } from "../RenderLayer";
import { RenderState } from "../RenderState";
import { Asset } from "./Asset";
import { AssetReference, AssetChangedEvent } from "../AssetReference";
namespace Private
{
    export let id: number = 0;
}
export class Material extends Asset
{
    name: string;
    uniformParameters: { [name: string]: any } = {};
    constructor(name?: string)
    {
        super();
        this.name = name;
        this._sortId = Private.id++;

        this.shaderRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent() });
    }

    private shaderRef = new AssetReference<Shader>();
    get shader() { return this.shaderRef.asset };
    set shader(value: Shader) { this.shaderRef.asset = value };

    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0)
    {
        this._layer = layer;
        this._layerIndex = layer + queue;
        this.onDirty.raiseEvent();
    }
    get layerIndex() { return this._layerIndex ?? this.shader.layerIndex };

    renderState: RenderState = new RenderState();
    private _sortId: number;
    get sortId() { return this._sortId + 1000 * this.shader?.sortId }

    setUniformParameter(uniformKey: string, value: any)
    {
        this.uniformParameters[uniformKey] = value;
    }
    dispose(): void { }
}