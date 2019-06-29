import { Texture } from "./texture";
import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { RenderLayerEnum } from "../../ec/ec";
import { Shader, IshaderInfo } from "./shader";
import { Color } from "../../mathD/color";
import { Vec4 } from "../../mathD/vec4";
import { Vec3 } from "../../mathD/vec3";

export class Material extends ToyAsset {
    constructor(param?: ItoyAsset) {
        super(param);
    }
    uniforms: { [name: string]: any } = {};

    _dirty: boolean = false;
    private _program: IshaderInfo;
    set shader(value: IshaderInfo) {
        this._program = value;
        this._dirty = true;
    }
    get shader(): IshaderInfo {
        return this._program;
    }

    private _layer: RenderLayerEnum;
    queue: number = 0;

    set layer(value: RenderLayerEnum) {
        this._layer = value;
    }
    get layer(): RenderLayerEnum {
        return this._layer || (this._program && this._program.layer) || RenderLayerEnum.Geometry;
    }

    setColor(key: string, value: Color) {
        this.uniforms[key] = value;
    }
    setTexture(key: string, value: Texture) {
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
