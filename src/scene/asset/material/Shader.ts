import { ShaderProgram, IshaderProgramOption } from "../../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../../RenderLayer";
import { Asset, IgraphicAsset } from "../Asset";
import { VertexAttEnum } from "../../../webgl/VertexAttEnum";
import { ShaderInstance } from "./ShaderInstance";
import { ShaderBucket } from "./ShaderBucket";

namespace Private {
    export let sortId: number = 0;
}

export class Shader extends Asset {

    private _shader: ShaderProgram;
    private _instances: Map<number, ShaderInstance> = new Map();

    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    setLayerIndex(layer: RenderLayerEnum, queue: number = 0) {
        let layerIndex = layer + queue;
        if (this._layerIndex != layerIndex) {
            this._layer = layer;
            this._layerIndex = layerIndex;
            this.onDirty.raiseEvent();
        }
    }
    get layerIndex() { return this._layerIndex };

    private vsStr: string;
    private fsStr: string;
    private attributes: { [attName: string]: VertexAttEnum };
    readonly sortId: number;
    constructor(options: IshaderOption) {
        super();
        this.sortId = Private.sortId++;

        this.vsStr = options.vsStr;
        this.fsStr = options.fsStr;
        this.attributes = options.attributes;
    }

    getInstance(bucketId: number) {
        if (!this._instances.has(bucketId)) {
            let packStr = ShaderBucket.packShaderStr(bucketId);
            this._instances.set(bucketId, new ShaderInstance(
                packStr + this.vsStr,
                packStr + this.fsStr,
                this.attributes));
        }
        return this._instances.get(bucketId);
    }

    unbind(): void {
        this._shader?.unbind();
    }

    destroy() {
        this._shader?.destroy();
    }
}


export interface IshaderOption {
    attributes: { [attName: string]: VertexAttEnum };
    vsStr: string;
    fsStr: string;
}

export interface IlayerIndexEvent {
    layer: RenderLayerEnum;
    layerIndex: number
}

