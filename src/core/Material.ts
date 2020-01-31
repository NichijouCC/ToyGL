import { Shader } from "./Shader";
import { RenderLayerEnum } from "./RenderLayer";

export class Material {
    uniformParameters: { [name: string]: any } = {};
    shader: Shader;
    private _layer: RenderLayerEnum;
    queue: number = 0;

    set layer(value: RenderLayerEnum) {
        this._layer = value;
    }
    get layer(): RenderLayerEnum {
        return this._layer || (this.shader && this.shader.layer) || RenderLayerEnum.Geometry;
    }

    setParameter(uniformKey:string,value:any){
        this.uniformParameters[uniformKey]=value;
    }
    dispose(): void { }
}
