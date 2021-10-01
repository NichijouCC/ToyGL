import { ShaderProgram, IShaderProgramOption } from "../webgl/shaderProgram";
import { RenderTypeEnum } from "./renderLayer";
import { Asset } from "../resources/asset";
import { VertexAttEnum } from "../webgl/vertexAttEnum";
import { ShaderBucket } from "./shaderBucket";
import { GraphicsDevice } from "../webgl";

export class Shader extends Asset {
    static totalCount: number = 0;

    private _vsStr: string;
    private _fsStr: string;
    private _attributes: { [attName: string]: VertexAttEnum };
    readonly create_id: number;

    /**
     * 用于调整绘制顺序
     */
    renderType: RenderTypeEnum = RenderTypeEnum.OPAQUE;
    /**
     * 用于调整绘制顺序
     */
    sortOrder: number = 0;

    private _bucketFeats: number = 0;
    set bucketFeats(feat: ShaderBucket | number) { this._bucketFeats = feat; }
    private _programs: Map<number, ShaderProgram> = new Map();

    constructor(options: IShaderOption) {
        super();
        this.create_id = Shader.totalCount++;

        this._vsStr = options.vsStr;
        this._fsStr = options.fsStr;
        this._attributes = options.attributes;
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
        newShader.renderType = this.renderType;
        newShader.sortOrder = this.sortOrder;
        return newShader;
    }
}

export type IShaderOption = IShaderProgramOption
export interface ILayerIndexEvent {
    layer: RenderTypeEnum;
    layerIndex: number
}
