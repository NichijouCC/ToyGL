import { ShaderProgram } from "../../../webgl/shaderProgram";
import { VertexAttEnum } from "../../../webgl/vertexAttEnum";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { AutoUniforms } from "../../render/autoUniform";
import { UniformState } from "../../uniformState";
export class ShaderInstance {
    program: ShaderProgram;
    autoUniforms: string[];
    constructor(vsStr: string, fsStr: string, attributes: {
        [attName: string]: VertexAttEnum;
    }) {
        this.create = (device: GraphicsDevice) => {
            const program = new ShaderProgram({ context: device, attributes, vsStr, fsStr });
            const autoUniforms: string[] = [];
            Object.keys(program.uniforms).forEach(uniform => {
                if (AutoUniforms.containAuto(uniform)) {
                    autoUniforms.push(uniform);
                }
            });
            this.program = program;
            this.autoUniforms = autoUniforms;
        };
    }

    private create = (device: GraphicsDevice) => { };
    bind(device: GraphicsDevice): boolean {
        if (this.program == null) {
            this.create(device);
        }
        return this.program.bind();
    }

    // bindManulUniforms(device: GraphicsDevice, uniforms: {
    //     [name: string]: any;
    // }) {
    //     this.program.bindUniforms(device, uniforms);
    // }

    // bindAutoUniforms(device: GraphicsDevice, uniformState: UniformState) {
    //     const uniforms: {
    //         [name: string]: any;
    //     } = {};
    //     this.autouniforms.forEach(item => {
    //         uniforms[item] = AutoUniforms.getAutoUniformValue(item, uniformState);
    //     });
    //     this.program.bindUniforms(device, uniforms);
    // }
}
