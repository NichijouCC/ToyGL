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
    private _autoUniforms: string[] = [];
    private _instances: Map<number, ShaderInstance> = new Map();

    // get autoUniforms() { return this._autoUniforms }
    // get glShader() { return this._shader };
    // set glShader(shader: ShaderProgram)
    // {
    //     if (this._shader != shader)
    //     {
    //         if (this._shader) { this._shader.destroy(); }
    //         this._shader = shader;
    //         this.onDirty.raiseEvent();
    //     }
    // }
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
            this._instances.set(bucketId, new ShaderInstance(this.vsStr, this.fsStr, this.attributes));
        }
        return this._instances.get(bucketId);
    }

    // bind(device: GraphicsDevice, bucketId: number) {
    //     if (!this._instances.has(bucketId)) {
    //         let program = new ShaderProgram({ context: device, attributes: this.attributes, vsStr: this.vsStr, fsStr: this.fsStr });
    //         let autouniforms: string[] = [];
    //         Object.keys(program.uniforms).forEach(uniform => {
    //             if (AutoUniforms.containAuto(uniform)) {
    //                 autouniforms.push(uniform);
    //             }
    //         })

    //         this._instances.set(bucketId, { program, autouniforms });
    //     }
    //     let shader = this._instances.get(bucketId);
    //     shader.program.bind();
    //     return shader;
    // }

    // bindManulUniforms(device: GraphicsDevice, uniforms: { [name: string]: any }) {
    //     this._shader.bindUniforms(device, uniforms);
    // }

    // bindAutoUniforms(device: GraphicsDevice, uniformState: UniformState) {
    //     let uniforms: { [name: string]: any } = {};
    //     this._autoUniforms.forEach(item => {
    //         uniforms[item] = AutoUniforms.getAutoUniformValue(item, uniformState);
    //     })
    //     this._shader.bindUniforms(device, uniforms);
    // }

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