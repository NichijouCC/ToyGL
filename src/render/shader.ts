import { RenderTypeEnum } from "./renderLayer";
import { Asset } from "../resources/asset";
import { ShaderFeat } from "./shaderBucket";
import { GraphicsDevice, IShaderProgramOption, ShaderProgram, VertexAttEnum } from "../webgl";

export class Shader extends Asset {
    static totalCount: number = 0;
    readonly create_id: number;
    private _config: IMultiplyPassShaderOption;
    /**
     * 用于调整绘制顺序
     */
    renderType: RenderTypeEnum = RenderTypeEnum.OPAQUE;
    /**
     * 用于调整绘制顺序
     */
    sortOrder: number = 0;

    private _bucketFeats: number = 0;
    set bucketFeats(feat: ShaderFeat | number) { this._bucketFeats = feat; }
    private _programs: Map<number, ShaderProgram[]> = new Map();

    constructor(options: ISinglePassShaderOption | IMultiplyPassShaderOption) {
        super();
        this.create_id = Shader.totalCount++;
        if (options["subPasses"] != null) {
            this._config = options as any;
        } else {
            let op = options as ISinglePassShaderOption;
            this._config = { attributes: op.attributes, subPasses: [{ vs: op.vsStr, fs: op.fsStr }] }
        }
    }

    getSubPasses(bucketId: ShaderFeat, device: GraphicsDevice) {
        bucketId = bucketId | this._bucketFeats;
        if (!this._programs.has(bucketId)) {
            const packStr = ShaderFeat.packShaderStr(bucketId);
            let programs = this._config.subPasses.map(item => {
                return device.createShaderProgram({
                    attributes: this._config.attributes,
                    vsStr: packStr + item.vs,
                    fsStr: packStr + item.fs,
                })
            })
            this._programs.set(bucketId, programs);
        }
        return this._programs.get(bucketId);
    }

    destroy() {
        this._programs.forEach(el => el.forEach(program => program.destroy()));
        this._programs.clear();
    }

    clone() {
        const newShader = new Shader(this._config);
        newShader._bucketFeats = this._bucketFeats;
        newShader.renderType = this.renderType;
        newShader.sortOrder = this.sortOrder;
        return newShader;
    }
}

export interface ISinglePassShaderOption {
    attributes: { [attName: string]: VertexAttEnum },
    vsStr: string,
    fsStr: string,
}

export interface IMultiplyPassShaderOption {
    attributes: { [attName: string]: VertexAttEnum },
    subPasses: { vs: string, fs: string, feat?: number }[],
}

export interface ILayerIndexEvent {
    layer: RenderTypeEnum;
    layerIndex: number
}
