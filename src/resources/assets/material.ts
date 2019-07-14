import { Texture } from "./texture";
import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { RenderLayerEnum } from "../../ec/ec";
import { Shader, IshaderInfo } from "./shader";
import { Color } from "../../mathD/color";
import { Vec4 } from "../../mathD/vec4";
import { Vec3 } from "../../mathD/vec3";
import { RenderTexture } from "./renderTexture";
import { ItextureInfo } from "../../render/glRender";

export class Material extends ToyAsset {
    constructor(param?: ItoyAsset) {
        super(param);
    }
    uniforms: { [name: string]: any } = {};
    shader: IshaderInfo;

    private _layer: RenderLayerEnum;
    queue: number = 0;

    set layer(value: RenderLayerEnum) {
        this._layer = value;
    }
    get layer(): RenderLayerEnum {
        return this._layer || (this.shader && this.shader.layer) || RenderLayerEnum.Geometry;
    }

    setColor(key: string, value: Color) {
        this.uniforms[key] = value;
    }
    setTexture(key: string, value: Texture | ItextureInfo) {
        this.uniforms[key] = value;
    }
    setVector4(key: string, value: Vec4) {
        this.uniforms[key] = value;
    }
    setVector3(key: string, value: Vec3) {
        this.uniforms[key] = value;
    }
    setFloat(key: string, value: number) {
        this.uniforms[key] = value;
    }
    dispose(): void {}
}
