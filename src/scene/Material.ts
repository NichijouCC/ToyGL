import { Shader } from "./Shader";
import { RenderLayerEnum } from "./RenderLayer";

export class Material
{
    uniformParameters: { [name: string]: any } = {};
    shader: Shader;
    private _layer: RenderLayerEnum;
    queue: number = 0;
    name: string;
    set layer(value: RenderLayerEnum)
    {
        this._layer = value;
    }
    get layer(): RenderLayerEnum
    {
        return this._layer || (this.shader && this.shader.layer) || RenderLayerEnum.Geometry;
    }
    constructor(name: string)
    {
        this.name = name;
    }
    setParameter(uniformKey: string, value: any)
    {
        this.uniformParameters[uniformKey] = value;
    }
    dispose(): void { }
}
