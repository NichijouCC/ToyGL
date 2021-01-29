import { ShaderProgram, IshaderProgramOption } from "../../../webgl/shaderProgam";
import { RenderLayerEnum } from "../../renderLayer";
import { Asset, IgraphicAsset } from "../asset";
import { VertexAttEnum } from "../../../webgl/vertexAttEnum";
import { ShaderBucket } from "./shaderBucket";
import { GraphicsDevice } from "../../../webgl";

export class Shader extends Asset {
    static totalCount: number = 0;
    private _programs: Map<number, ShaderProgram> = new Map();

    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    get layerIndex() { return this._layerIndex; };

    setLayerIndex(layer: RenderLayerEnum, queue: number = 0) {
        const layerIndex = layer + queue;
        if (this._layerIndex != layerIndex) {
            this._layer = layer;
            this._layerIndex = layerIndex;
            this.onDirty.raiseEvent();
        }
    }

    private vsStr: string;
    private fsStr: string;
    private attributes: { [attName: string]: VertexAttEnum };
    readonly create_id: number;
    constructor(options: IshaderOption) {
        super();
        this.create_id = Shader.totalCount++;

        this.vsStr = options.vsStr;
        this.fsStr = options.fsStr;
        this.attributes = options.attributes;
    }
    private _bucketFeats: number = 0;

    set buketFeats(feat: ShaderBucket | number) { this._bucketFeats = feat; }

    getProgram(bucketId: ShaderBucket, device: GraphicsDevice) {
        bucketId = bucketId | this._bucketFeats;
        if (!this._programs.has(bucketId)) {
            const packStr = ShaderBucket.packShaderStr(bucketId);
            const program = new ShaderProgram({
                context: device,
                attributes: this.attributes,
                vsStr: packStr + this.vsStr,
                fsStr: packStr + this.fsStr
            });

            this._programs.set(bucketId, program);
        }
        return this._programs.get(bucketId);
    }

    destroy() { }

    clone() {
        let newShader = new Shader({ vsStr: this.vsStr, fsStr: this.fsStr, attributes: this.attributes });
        newShader._bucketFeats = this._bucketFeats;
        newShader._layer = this._layer;
        newShader._layerIndex = this._layerIndex;
        return newShader;
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
