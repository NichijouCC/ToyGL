import { ShaderProgram, IshaderProgramOption } from "../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../RenderLayer";
import { Asset, IgraphicAsset } from "./Asset";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";

namespace Private
{
    export let sortId: number = 0;
}

export class Shader extends Asset implements IgraphicAsset
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
    get layerIndex() { return this._layerIndex };

    private vsStr: string;
    private fsStr: string;
    private attributes: { [attName: string]: VertexAttEnum };
    readonly sortId: number;
    constructor(options: IshaderOption)
    {
        super();
        this.sortId = Private.sortId++;

        this.vsStr = options.vsStr;
        this.fsStr = options.fsStr;
        this.attributes = options.attributes;
    }

    bind(device: GraphicsDevice): void
    {
        if (this._shader == null)
        {
            this._shader = new ShaderProgram({ context: device, attributes: this.attributes, vsStr: this.vsStr, fsStr: this.fsStr });
        }
        this._shader.bind();
    }
    unbind(): void
    {
        this._shader?.unbind();
    }

    destroy()
    {
        this._shader?.destroy();
    }
}

export interface IshaderOption
{
    attributes: { [attName: string]: VertexAttEnum };
    vsStr: string;
    fsStr: string;
}

export interface IlayerIndexEvent
{
    layer: RenderLayerEnum;
    layerIndex: number
}