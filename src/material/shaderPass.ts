/* eslint-disable prettier/prettier */
import { IprogramOptions, IprogramState } from "../render/webglRender";
import { IbassProgramInfo, IbassProgramOption, IuniformInfo, IattributeInfo } from "twebgl/dist/types/type";
import { createBassProgramInfo } from "twebgl";
import { GlConstants } from "../render/GlConstant";
import { IpassState } from "../render/renderState";

export type IshaderProgramOption =
    {
        name?: string;
        webglProgram: WebGLProgram;
    } | {
        name?: string;
        vs: string;
        fs: string;
    };

export interface IshaderPassOption {
    program: IshaderProgramOption | ShaderProgram;
    defUniform?: { [name: string]: any };
    states?: IpassState;
}

export class ShaderPass {
    program: ShaderProgram;
    uniforms?: { [name: string]: any };
    readonly defUniforms: { [name: string]: any };
    readonly states?: IpassState;

    constructor(option: IshaderPassOption) {
        if (option.program instanceof ShaderProgram) {
            this.program = option.program;
        } else {
            this.program = new ShaderProgram(option.program);
        }
        this.defUniforms = option.defUniform;
        this.states = option.states;
    }
}

export class ShaderProgram {
    readonly id: number;
    readonly name?: string;
    readonly program: WebGLProgram;
    readonly uniformsDic: { [name: string]: IuniformInfo };
    readonly attsDic: { [name: string]: IattributeInfo };
    readonly combinedVs: string;
    readonly combinedFs: string;
    constructor(option: IshaderProgramOption) {
        this.name = option.name;
    }
}
