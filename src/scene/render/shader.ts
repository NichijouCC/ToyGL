import { ShaderProgram, IShaderProgramOption } from "../../webgl/shaderProgram";
import { RenderLayerEnum } from "./renderLayer";
import { Asset, IGraphicAsset } from "../asset/asset";
import { VertexAttEnum } from "../../webgl/vertexAttEnum";
import { ShaderBucket } from "./shaderBucket";
import { GraphicsDevice } from "../../webgl";

export class Shader extends Asset {
    static totalCount: number = 0;

    private _vsStr: string;
    private _fsStr: string;
    private _attributes: { [attName: string]: VertexAttEnum };
    readonly create_id: number;

    private _layer: RenderLayerEnum;
    get layer() { return this._layer; }

    private _layerIndex: number;
    get layerIndex() { return this._layerIndex; };

    setLayerIndex(layer: RenderLayerEnum, queue: number = 0) {
        const layerIndex = layer + queue;
        if (this._layerIndex != layerIndex) {
            this._layer = layer;
            this._layerIndex = layerIndex;
        }
    }

    private _bucketFeats: number = 0;
    set bucketFeats(feat: ShaderBucket | number) { this._bucketFeats = feat; }
    private _programs: Map<number, ShaderProgram> = new Map();

    constructor(options: IShaderOption) {
        super();
        this.create_id = Shader.totalCount++;

        this._vsStr = options.vsStr;
        this._fsStr = options.fsStr;
        this._attributes = options.attributes;
        this.setLayerIndex(RenderLayerEnum.Geometry);
    }

    getProgram(bucketId: ShaderBucket, device: GraphicsDevice) {
        bucketId = bucketId | this._bucketFeats;
        if (!this._programs.has(bucketId)) {
            const packStr = ShaderBucket.packShaderStr(bucketId);
            const program = device.createShaderProgram({
                attributes: this._attributes,
                vsStr: packStr + this._vsStr,
                fsStr: packStr + this._fsStr
            });

            this._programs.set(bucketId, program);
        }
        return this._programs.get(bucketId);
    }

    bind(bucketId: ShaderBucket, device: GraphicsDevice) {
        let program = this.getProgram(bucketId, device);
        program.bind();
        return program;
    }

    destroy() { }

    clone() {
        const newShader = new Shader({ vsStr: this._vsStr, fsStr: this._fsStr, attributes: this._attributes });
        newShader._bucketFeats = this._bucketFeats;
        newShader._layer = this._layer;
        newShader._layerIndex = this._layerIndex;
        return newShader;
    }
}

export type IShaderOption = IShaderProgramOption
export interface ILayerIndexEvent {
    layer: RenderLayerEnum;
    layerIndex: number
}
