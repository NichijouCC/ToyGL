import { Geometry } from "./primitive/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";
import { VertexArray } from "../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";
import { StaticMesh } from "./mesh/StaticMesh";
import { Mat4 } from "../mathD/mat4";
import { Event, ValueEvent } from "../core/Event";
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

        this._mat?.onchangeLayer.removeEventListener(this._onchangeLayer);
        this._mat = mat;
        mat?.onchangeLayer.addEventListener(this._onchangeLayer);

        if (this._mat?.layer != oldLayer)
        {
            this._onchangeLayer(oldLayer, this._mat?.layer);
        }
        if (this._mat?.shader != oldShader)
        {
            this.onchangeShader.raiseEvent(oldShader, this._mat?.shader);
        }
    }
    get material() { return this._mat }
    onchangeLayer = new ValueEvent<RenderLayerEnum>();

    private _onchangeLayer = (oldValue: any, newValue: any) => { this.onchangeLayer.raiseEvent(oldValue, newValue) }

    onchangeShader = new ValueEvent<Shader>();
    dispose()
    {
        this.ondispose.raiseEvent();
    };
    ondispose = new Event();
}