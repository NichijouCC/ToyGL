import { ShaderProgram, IshaderProgramOption } from "../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../RenderLayer";
import { Asset, IgraphicAsset } from "./Asset";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { AutoUniforms } from "../AutoUniform";
import { UniformState } from "../UniformState";

namespace Private
{
    export let sortId: number = 0;
}

export class Shader extends Asset implements IgraphicAsset
{

    private _shader: ShaderProgram;
    private _autoUniforms: string[] = [];
    get autoUniforms() { return this._autoUniforms }
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
            let newShader = new ShaderProgram({ context: device, attributes: this.attributes, vsStr: this.vsStr, fsStr: this.fsStr });
            this._shader = newShader;

            this._autoUniforms = [];
            Object.keys(newShader.uniforms).forEach(uniform =>
            {
                if (AutoUniforms.containAuto(uniform))
                {
                    this._autoUniforms.push(uniform);
                }
            })
        }
        this._shader.bind();
    }

    bindManulUniforms(device: GraphicsDevice, uniforms: { [name: string]: any })
    {
        this._shader.bindUniforms(device, uniforms);
    }

    bindAutoUniforms(device: GraphicsDevice, uniformState: UniformState)
    {
        let uniforms: { [name: string]: any } = {};
        this._autoUniforms.forEach(item =>
        {
            uniforms[item] = AutoUniforms.getAutoUniformValue(item, uniformState);
        })
        this._shader.bindUniforms(device, uniforms);
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