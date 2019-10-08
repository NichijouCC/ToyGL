import { IuniformInfo, IattributeInfo, ShaderTypeEnum, IshaderProgram } from "./declaration";

export class WebglShaderProgram implements IshaderProgram {
    program: WebGLProgram;
    uniformsDic: { [name: string]: IuniformInfo };
    attsDic: { [attName: string]: IattributeInfo };
    private _gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
        this._gl = gl;
        let vsShader = createShader(gl, vsSource, ShaderTypeEnum.VS);
        let fsShader = createShader(gl, fsSource, ShaderTypeEnum.FS);
        let item = gl.createProgram();
        gl.attachShader(item, vsShader);
        gl.attachShader(item, fsShader);
        gl.linkProgram(item);
        let check = gl.getProgramParameter(item, gl.LINK_STATUS);
        if (check == false) {
            let debguInfo =
                "ERROR: compile program Error!" +
                "VS:" +
                vsSource +
                "   FS:" +
                fsSource +
                "\n" +
                gl.getProgramInfoLog(item);
            alert(debguInfo);
            gl.deleteProgram(item);
        } else {
            let attsInfo = getAttributesInfo(gl, item);
            let uniformsInfo = getUniformsInfo(gl, item);
            this.program = item;
            this.uniformsDic = uniformsInfo;
            this.attsDic = attsInfo;
        }
    }
    private _cachedUniforms: { [name: string]: any } = {};
    setUniform(uniform: string, value: any) {
        let uniformInfo = this.uniformsDic[uniform];
        if (!uniformInfo.checkEqualFuc(value, this._cachedUniforms[uniform])) {
            uniformInfo.setter(value);
            this._cachedUniforms[uniform] = value;
        }
    }
}

function createShader(gl: WebGLRenderingContext, source: string, type: ShaderTypeEnum): WebGLProgram {
    let target = type == ShaderTypeEnum.VS ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    let item = gl.createShader(target);
    gl.shaderSource(item, source);
    gl.compileShader(item);
    let check = gl.getShaderParameter(item, gl.COMPILE_STATUS);
    if (check == false) {
        let debug =
            type == ShaderTypeEnum.VS ? "ERROR: compile  VS Shader Error! VS:" : "ERROR: compile FS Shader Error! FS:";
        debug = debug + name + ".\n";
        alert(debug + gl.getShaderInfoLog(item));
        gl.deleteShader(item);
        return null;
    } else {
        return item;
    }
}

function getAttributesInfo(gl: WebGLRenderingContext, program: WebGLProgram): { [attName: string]: IattributeInfo } {
    let attdic: { [attName: string]: IattributeInfo } = {};
    let numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
        let attribInfo = gl.getActiveAttrib(program, i);
        if (!attribInfo) continue;
        let attName = attribInfo.name;
        let attlocation = gl.getAttribLocation(program, attName);
        // let func = getAttributeSetter(gl, attlocation);
        attdic[attName] = { name: attName, location: attlocation };
    }
    return attdic;
}

function getUniformsInfo(gl: WebGLRenderingContext, program: WebGLProgram): { [name: string]: IuniformInfo } {
    let uniformDic: { [name: string]: IuniformInfo } = {};
    let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
        let uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) continue;
        let name = uniformInfo.name;
        let type = uniformInfo.type;
        let location = gl.getUniformLocation(program, name);

        let beArray = false;
        // remove the array suffix.
        if (name.substr(-3) === "[0]") {
            beArray = true;
            name = name.substr(0, name.length - 3);
        }
        if (location == null) continue;

        let func = getUniformSetter(gl, type, beArray, location);
        let checkFuc = checkUniformEqual(gl, type, beArray);
        uniformDic[name] = { name: name, location: location, type: type, setter: func, checkEqualFuc: checkFuc };
    }
    return uniformDic;
}

function getUniformSetter(
    gl: WebGLRenderingContext,
    uniformType: number,
    beArray: boolean,
    location: WebGLUniformLocation,
) {
    switch (uniformType) {
        case gl.FLOAT:
            if (beArray) {
                return (value: any) => {
                    gl.uniform1fv(location, value);
                };
            } else {
                return (value: any) => {
                    gl.uniform1f(location, value);
                };
            }

        case gl.FLOAT_VEC2:
            return (value: Float32Array) => {
                gl.uniform2fv(location, value);
            };

        case gl.FLOAT_VEC3:
            return (value: Float32Array) => {
                gl.uniform3fv(location, value);
            };

        case gl.FLOAT_VEC4:
            return (value: Float32Array) => {
                gl.uniform4fv(location, value);
            };

        case gl.INT:
        case gl.BOOL:
            if (beArray) {
                return (value: number[]) => {
                    gl.uniform1iv(location, value);
                };
            } else {
                return (value: number) => {
                    gl.uniform1i(location, value);
                };
            }

        case gl.INT_VEC2:
        case gl.BOOL_VEC2:
            return (value: number[]) => {
                gl.uniform2iv(location, value);
            };

        case gl.INT_VEC3:
        case gl.BOOL_VEC3:
            return (value: number[]) => {
                gl.uniform3iv(location, value);
            };

        case gl.INT_VEC4:
        case gl.BOOL_VEC4:
            return (value: number[]) => {
                gl.uniform4fv(location, value);
            };

        case gl.FLOAT_MAT2:
            return (value: Float32Array) => {
                gl.uniformMatrix2fv(location, false, value);
            };
        case gl.FLOAT_MAT3:
            return (value: Float32Array) => {
                gl.uniformMatrix3fv(location, false, value);
            };

        case gl.FLOAT_MAT4:
            return (value: Float32Array) => {
                gl.uniformMatrix4fv(location, false, value);
            };

        case gl.SAMPLER_2D:
            return (value: ItextureInfo) => {
                gl.activeTexture(gl.TEXTURE0 + value.bindPoint);
                gl.bindTexture(gl.TEXTURE_2D, value.value);
                gl.uniform1i(location, value.bindPoint);
            };
        default:
            console.error("uniformSetter not handle type:" + uniformType + " yet!");
    }
}

function checkUniformEqual(gl: WebGLRenderingContext, uniformType: number, beArray: boolean) {
    switch (uniformType) {
        case gl.FLOAT:
            if (beArray) {
                return (left: number[], right: number[]) => {
                    if (left.length != right.length) {
                        return false;
                    }
                    for (let i = 0; i < left.length; i++) {
                        if (left[i] != right[i]) {
                            return false;
                        }
                    }
                    return true;
                };
            } else {
                return (left: number, right: number) => {
                    return left == right;
                };
            }

        case gl.FLOAT_VEC2:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < 2; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.FLOAT_VEC3:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < 3; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.FLOAT_VEC4:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < 4; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };
        case gl.INT:
        case gl.BOOL:
            if (beArray) {
                return (left: number[], right: number[]) => {
                    if (left.length != right.length) {
                        return false;
                    }
                    for (let i = 0; i < left.length; i++) {
                        if (left[i] != right[i]) {
                            return false;
                        }
                    }
                    return true;
                };
            } else {
                return (left: number, right: number) => {
                    return left == right;
                };
            }

        case gl.INT_VEC2:
        case gl.BOOL_VEC2:
            return (left: number[], right: number[]) => {
                for (let i = 0; i < 2; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.INT_VEC3:
        case gl.BOOL_VEC3:
            return (left: number[], right: number[]) => {
                for (let i = 0; i < 3; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.INT_VEC4:
        case gl.BOOL_VEC4:
            return (left: number[], right: number[]) => {
                for (let i = 0; i < 4; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.FLOAT_MAT2:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < left.length; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };
        case gl.FLOAT_MAT3:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < left.length; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };
        case gl.FLOAT_MAT4:
            return (left: Float32Array, right: Float32Array) => {
                for (let i = 0; i < left.length; i++) {
                    if (left[i] != right[i]) {
                        return false;
                    }
                }
                return true;
            };

        case gl.SAMPLER_2D:
            return (left: ItextureInfo, right: ItextureInfo) => {
                return left === right;
            };
        default:
            console.error("uniform equal check not handle type:" + uniformType + " yet!");
    }
}
export interface ItextureInfo {
    value: any;
    bindPoint: number;
}
