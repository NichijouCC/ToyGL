import { ToyAsset } from "../base/toyAsset";
import { RenderLayerEnum } from "../../ec/ec";
import { IshaderInfo } from "../../render/glRender";

export class Material extends ToyAsset {
    constructor(name: string, url: string) {
        super({ name: name, URL: url });
    }
    uniforms: { [name: string]: any } = {};

    _dirty: boolean = false;
    private _program: IshaderInfo;
    set program(value: IshaderInfo) {
        this._program = value;
        this._dirty = true;
    }
    get program(): IshaderInfo {
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
    dispose(): void {}
}
