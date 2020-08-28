import { Shader, IlayerIndexEvent, IshaderOption } from "./Shader";
import { RenderLayerEnum } from "../../RenderLayer";
import { RenderState } from "../../RenderState";
import { Asset } from "../Asset";
import { AssetReference } from "../../AssetReference";

export class Material extends Asset {
    static IdCount: number = 0;

    name: string;
    uniformParameters: { [name: string]: any } = {};
    constructor(options?: ImatOption) {
        super();
        this.name = options?.name;
        this._sortId = Material.IdCount++;

        if (options?.shaderOption != null) {
            if (options?.shaderOption instanceof Shader) {
                this.shader = options.shaderOption;
            } else {
                this.shader = new Shader(options.shaderOption);
            }
        }
        if (options?.uniformParameters) {
            this.uniformParameters = { ...options.uniformParameters };
        }
        this.onDirty.addEventListener(() => { this.beDirty = true; });
        this.shaderRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(); });
    }

    beDirty: boolean = false;
    private shaderRef = new AssetReference<Shader>();
    get shader() { return this.shaderRef.current; };
    set shader(value: Shader) { this.shaderRef.current = value; };

    private _layer: RenderLayerEnum;
    get layer() { return this._layer || this.shader.layer || RenderLayerEnum.Geometry; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0) {
        this._layer = layer;
        this._layerIndex = layer + queue;
        this.onDirty.raiseEvent();
    }

    get layerIndex() { return this._layerIndex ?? this.shader.layerIndex; };

    renderState: RenderState = new RenderState();
    private _sortId: number;
    get sortId() { return this._sortId + 1000 * this.shader?.sortId; }

    setUniformParameter(uniformKey: string, value: any) {
        this.uniformParameters[uniformKey] = value;
        this.beDirty = true;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export interface ImatOption {
    name?: string;
    uniformParameters?: { [name: string]: any };
    shaderOption?: IshaderOption | Shader;
}
