import { Shader, IlayerIndexEvent, IshaderOption } from "./shader";
import { RenderLayerEnum } from "../../renderLayer";
import { RenderState } from "../../renderState";
import { Asset } from "../asset";
import { AssetReference } from "../../assetReference";

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
        this.onDirty.addEventListener(() => { this.bedirty = true; });
        this.shaderRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(); });
    }
    /**
     * shader修改;uniform修改
     */
    bedirty: boolean = false;
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
        this.bedirty = true;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

    clone() {
        const mat = new Material();
        mat.shader = this.shader;
        mat.setLayerIndex(this._layer, this._layerIndex);
        mat.renderState = JSON.parse(JSON.stringify(this.renderState));
        for (const key in this.uniformParameters) {
            mat.uniformParameters[key] = this.uniformParameters[key];
        }
        mat.bedirty = true;
        return mat;
    }
}

export interface ImatOption {
    name?: string;
    uniformParameters?: { [name: string]: any };
    shaderOption?: IshaderOption | Shader;
}
