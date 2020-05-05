import { ShaderProgram, IshaderProgramOption } from "../../webgl/ShaderProgam";
import { RenderLayerEnum } from "../RenderLayer";
import { Asset, IgraphicAsset } from "./Asset";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { AutoUniforms } from "../AutoUniform";
import { UniformState } from "../UniformState";

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
            this._instances.set(bucketId, new ShaderInstance(
                ShaderBucket.packShaderStr(bucketId, this.vsStr),
                ShaderBucket.packShaderStr(bucketId, this.fsStr),
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


export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
}
export namespace ShaderBucket {
    export const packShaderStr = (buket: number, shaderStr: string) => {
        let str = "";
        if (buket && ShaderBucket.SKIN) {
            str = "#define SKIN \n" + str;
        }
        if (buket && ShaderBucket.FOG) {
            str = "#define FOG \n" + str;
        }
        return str + shaderStr;
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

export class ShaderInstance {
    program: ShaderProgram;
    autouniforms: string[]
    constructor(vsStr: string, fsStr: string, attributes: { [attName: string]: VertexAttEnum }) {
        this.create = (device: GraphicsDevice) => {
            let program = new ShaderProgram({ context: device, attributes, vsStr, fsStr });
            let autouniforms: string[] = [];
            Object.keys(program.uniforms).forEach(uniform => {
                if (AutoUniforms.containAuto(uniform)) {
                    autouniforms.push(uniform);
                }
            })
            this.program = program;
            this.autouniforms = autouniforms;
        }
    }

    private create = (device: GraphicsDevice) => { };

    bind(device: GraphicsDevice) {
        if (this.program == null) {
            this.create(device);
        }
        this.program.bind();
    }

    bindManulUniforms(device: GraphicsDevice, uniforms: { [name: string]: any }) {
        this.program.bindUniforms(device, uniforms);
    }

    bindAutoUniforms(device: GraphicsDevice, uniformState: UniformState) {
        let uniforms: { [name: string]: any } = {};
        this.autouniforms.forEach(item => {
            uniforms[item] = AutoUniforms.getAutoUniformValue(item, uniformState);
        })
        this.program.bindUniforms(device, uniforms);
    }
}