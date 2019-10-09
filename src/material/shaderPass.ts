/* eslint-disable prettier/prettier */
import { IpassState } from "../render/renderState";

export type IshaderNodeOption =
    {
        name?: string;
        webglProgram: WebGLProgram;
    } | {
        name?: string;
        vs: string;
        fs: string;
    };

export interface IshaderPassOption {
    node: IshaderNodeOption | ShaderNode;
    defUniform?: { [name: string]: any };
    states?: IpassState;
}

export class ShaderPass {
    node: ShaderNode;
    readonly defUniforms: { [name: string]: any };
    readonly states?: IpassState;

    constructor(option: IshaderPassOption) {
        if (option.node instanceof ShaderNode) {
            this.node = option.node;
        } else {
            this.node = new ShaderNode(option.node);
        }
        this.defUniforms = option.defUniform;
        this.states = option.states;
    }
}

export class ShaderNode {
    readonly id: number;
    readonly name?: string;
    readonly program: WebGLProgram;
    readonly uniformsDic: { [name: string]: IuniformInfo };
    readonly attsDic: { [name: string]: IattributeInfo };
    readonly combinedVs: string;
    readonly combinedFs: string;
    constructor(option: IshaderNodeOption) {
        this.name = option.name;
    }
}
