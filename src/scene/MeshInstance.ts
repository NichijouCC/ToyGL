import { Material } from "./asset/Material";
import { Transform } from "../core/Transform";
import { InterEvent, ValueEvent } from "../core/Event";
import { DrawCommand } from "./DrawCommand";
import { RenderLayerEnum } from "./RenderLayer";
import { Shader } from "./asset/Shader";
import { IgeometryAsset } from "./asset/BassGeoemtryAsset";

namespace Private
{
    export let id: number = 0;
}

export class MeshInstance extends DrawCommand
{
    constructor()
    {
        super();
        this.id = Private.id++;
    }
    readonly id: number;
    private _mesh: IgeometryAsset;
    get mesh() { return this._mesh }
    set mesh(mesh: IgeometryAsset) { this._mesh = mesh }

    node: Transform;
    get worldMat() { return this.node?.worldMatrix }

    private _mat: Material;
    set material(mat: Material)
    {
        let oldLayer = this._mat?.layer;
        let oldShader = this._mat?.shader;

        this._mat?.onchangeLayer.removeEventListener(this._onMatchangeLayer);
        this._mat = mat;
        mat?.onchangeLayer.addEventListener(this._onMatchangeLayer);

        if (this._mat?.layer != oldLayer)
        {
            this.onchangeLayer.raiseEvent(this, oldLayer, this._mat?.layer)
        }
        if (this._mat?.shader != oldShader)
        {
            this.onchangeShader.raiseEvent(this, oldShader, this._mat?.shader);
        }
    }
    get material() { return this._mat }
    private _onMatchangeLayer = (target: Material, oldValue: any, newValue: any) => { this.onchangeLayer.raiseEvent(this, oldValue, newValue) }

    dispose()
    {
        this.ondispose.raiseEvent();
    };

    onchangeLayer = new ValueEvent<MeshInstance, RenderLayerEnum>();
    onchangeShader = new ValueEvent<MeshInstance, Shader>();
    ondispose = new InterEvent();
}