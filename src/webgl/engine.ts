import { EngineCapability } from "./engineCapability";
import { GlConstants } from "../render/GlConstant";
import { Color } from "../mathD/color";
import { Vec4 } from "../mathD/vec4";
import { EngineGlState } from "./engineGlState";

export interface IengineOption {
    disableWebgl2?: boolean;
}
export class Engine {
    private _gl: WebGLRenderingContext;
    private _caps: EngineCapability;
    private _glState: EngineGlState;
    private _webGLVersion: number;
    constructor(canvasOrContext: HTMLCanvasElement | WebGLRenderingContext, option?: IengineOption) {
        if (canvasOrContext == null) {
            return;
        }
        option = option || {};
        if (canvasOrContext instanceof HTMLCanvasElement) {
            if (!option.disableWebgl2) {
                try {
                    this._gl = canvasOrContext.getContext("webgl2", option) as any;
                } catch (e) {}
            }
            if (!this._gl) {
                try {
                    this._gl = canvasOrContext.getContext("webgl", option) as any;
                } catch (e) {}
            }
            if (!this._gl) {
                throw new Error("webgl not supported");
            }
            canvasOrContext.addEventListener("webglcontextlost", this.handleContextLost, false);
        } else {
            this._gl = canvasOrContext;
        }
        if (this._gl.renderbufferStorageMultisample) {
            this._webGLVersion = 2.0;
        }

        this._caps = new EngineCapability(this._gl, this._webGLVersion);
        this._glState = new EngineGlState(this._gl);

        console.log(` ฅ(๑˙o˙๑)ฅ  v${Engine.Version} - ${this.description}`);
    }
    handleContextLost() {
        console.warn("WebGL context lost.");
    }
    static get Version(): string {
        return "0.0.1";
    }
    get description(): string {
        let description = "WebGL" + this._webGLVersion;
        return description;
    }

    private _currentProgram: WebGLProgram;
    private _setProgram(program: WebGLProgram): void {
        if (this._currentProgram !== program) {
            this._gl.useProgram(program);
            this._currentProgram = program;
        }
    }
    createVertexBuffer(data: DataArray, dynamic: boolean = false): WebGLBuffer {
        let vbo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vbo);
        if (data instanceof Array) {
            this._gl.bufferData(
                this._gl.ARRAY_BUFFER,
                new Float32Array(data),
                dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW,
            );
        } else {
            this._gl.bufferData(this._gl.ARRAY_BUFFER, data, dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW);
        }
        return vbo;
    }
    creatIndexBuffer(indices: IndicesArray, dynamic: boolean = false): WebGLBuffer {
        let ebo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, ebo);
        const data = this._normalizeIndexData(indices);
        this._gl.bufferData(
            this._gl.ELEMENT_ARRAY_BUFFER,
            data,
            dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW,
        );
        return ebo;
    }
    createGLProgramInfo(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram {
        let vsShader = this.createShader(vsSource, ShaderTypeEnum.VS);
        let fsShader = this.createShader(fsSource, ShaderTypeEnum.FS);
        if (vsShader && fsShader) {
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
                return null;
            } else {
                return item;
                // let attsInfo = getAttributesInfo(gl, item);
                // let uniformsInfo = getUniformsInfo(gl, item);
                // return new BassProgram(name, item, uniformsInfo, attsInfo);
                // return { program: item, programName: name, uniformsDic: uniformsInfo, attsDic: attsInfo };
            }
        } else {
            return null;
        }
    }

    private createShader(source: string, type: ShaderTypeEnum): WebGLProgram {
        let target = type == ShaderTypeEnum.VS ? this._gl.VERTEX_SHADER : this._gl.FRAGMENT_SHADER;
        let item = this._gl.createShader(target);

        this._gl.shaderSource(item, source);
        this._gl.compileShader(item);
        let check = this._gl.getShaderParameter(item, this._gl.COMPILE_STATUS);
        if (check == false) {
            let debug =
                type == ShaderTypeEnum.VS
                    ? "ERROR: compile  VS Shader Error! VS:"
                    : "ERROR: compile FS Shader Error! FS:";
            debug = debug + name + ".\n";
            alert(debug + this._gl.getShaderInfoLog(item));
            this._gl.deleteShader(item);
            return null;
        } else {
            return item;
        }
    }

    //------- tool
    private _normalizeIndexData(indices: IndicesArray): Uint16Array | Uint32Array {
        if (indices instanceof Uint16Array) {
            return indices;
        }

        // Check 32 bit support
        if (this._caps.uintIndices) {
            if (indices instanceof Uint32Array) {
                return indices;
            } else {
                // number[] or Int32Array, check if 32 bit is necessary
                for (var index = 0; index < indices.length; index++) {
                    if (indices[index] >= 65535) {
                        return new Uint32Array(indices);
                    }
                }

                return new Uint16Array(indices);
            }
        }

        // No 32 bit support, force conversion to 16 bit (values greater 16 bit are lost)
        return new Uint16Array(indices);
    }
}

export enum ShaderTypeEnum {
    VS,
    FS,
}

export type IndicesArray = number[] | Int32Array | Uint32Array | Uint16Array;
export type DataArray = number[] | ArrayBuffer | ArrayBufferView;
export class Event {
    private listener: ((...args: any) => void)[] = [];
    addEventListener(func: (...args: any) => void) {
        this.listener.push(func);
    }
    removeEventListener(func: (...args: any) => void) {
        let index = this.listener.indexOf(func);
        if (index >= 0) {
            this.listener.splice(index);
        }
    }
    raiseEvent(...args: any) {
        this.listener.forEach(fuc => {
            fuc(args);
        });
    }
}
