import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { RenderLayerEnum } from "../../ec/ec";
import { IshaderInfo } from "../../render/glRender";
import { Shader } from "./shader";
import { Color } from "../../mathD/color";

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

    setColor(uniform: string, color: Color) {
        this.uniforms[uniform] = color;
    }

    dispose(): void {}
}
