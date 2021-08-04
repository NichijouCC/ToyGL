import { Shader, ILayerIndexEvent, IShaderOption } from "./shader";
import { RenderLayerEnum } from "../../renderLayer";
import { RenderState } from "../../renderState";
import { Asset } from "../asset";
import { AssetReference } from "../../assetReference";

export class Material extends Asset {
    static totalCount: number = 0;

    name: string;
    uniformParameters: { [name: string]: any } = {};
    constructor(options?: IMatOption) {
        super();
        this.name = options?.name;
        Material.totalCount++;

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
        this.onDirty.addEventListener(() => { this._beDirty = true; });
        this.shaderRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(); });
    }

    /**
     * private
     */
    _beDirty: boolean = false;
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

    renderState = new RenderState();

    setUniformParameter(uniformKey: string, value: any) {
        this.uniformParameters[uniformKey] = value;
        this._beDirty = true;
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
        mat._beDirty = true;
        return mat;
    }
}

export interface IMatOption {
    name?: string;
    uniformParameters?: { [name: string]: any };
    shaderOption?: IShaderOption | Shader;
}
