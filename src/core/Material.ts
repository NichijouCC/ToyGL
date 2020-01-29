import { GraphicsDevice } from "../webgl/GraphicsDevice";

export class Material {
    uniforms: { [name: string]: any } = {};
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

    }
    dispose(): void { }
}





/**
 * 渲染的层级(从小到大绘制)
 */
export enum RenderLayerEnum {
    Background = 1000,
    Geometry = 2000,
    AlphaTest = 2450,
    Transparent = 3000, //透明
    Overlay = 4000, //Overlay层
}