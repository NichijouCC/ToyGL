import { Geometry } from "./primitive/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";
import { VertexArray } from "../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";
import { StaticMesh } from "./mesh/StaticMesh";
import { Mat4 } from "../mathD/mat4";
import { InterEvent, ValueEvent } from "../core/Event";
import { DrawCommand } from "./DrawCommand";
import { RenderLayerEnum } from "./RenderLayer";
import { Shader } from "./Shader";

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
    mesh: StaticMesh;
    node: Transform;

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
    onchangeLayer = new ValueEvent<MeshInstance, RenderLayerEnum>();

    private _onMatchangeLayer = (target: Material, oldValue: any, newValue: any) => { this.onchangeLayer.raiseEvent(this, oldValue, newValue) }

    onchangeShader = new ValueEvent<MeshInstance, Shader>();
    dispose()
    {
        this.ondispose.raiseEvent();
    };
    ondispose = new InterEvent();
}