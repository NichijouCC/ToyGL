import { EngineCapability } from "./engineCapability";
import { GlConstants } from "../render/GlConstant";
import { Color } from "../mathD/color";
import { Vec4 } from "../mathD/vec4";
import { EngineGlState } from "./engineGlState";
import { IshaderProgram } from "./declaration";
import { WebglShaderProgram } from "./engineProgram";
import { ItexViewDataOption, EngineTexture, ItextureInfo, ItexImageDataOption } from "./engineTexture";

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
    createVertexBuffer(data: DataArray, dynamic: boolean = false): IdataBuffer {
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
        return new WebglDataBuffer(vbo);
    }
    createIndexBuffer(indices: IndicesArray, dynamic: boolean = false): IdataBuffer {
        let ebo = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, ebo);
        const data = this._normalizeIndexData(indices);
        this._gl.bufferData(
            this._gl.ELEMENT_ARRAY_BUFFER,
            data,
            dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW,
        );
        return new WebglDataBuffer(ebo);
    }
    createShaderProgram(vs: string, fs: string): IshaderProgram {
        return new WebglShaderProgram(this._gl, vs, fs);
    }

    private bindVertexBuffersAttributes(vertexBuffers: { [key: string]: VertexBuffer }, program: IshaderProgram): void {
        for (const key in program.attsDic) {
            let vertexInfo = vertexBuffers[key];
            let attLocation = program.attsDic[key].location;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexInfo.buffer);
            this._gl.enableVertexAttribArray(attLocation);
            this._gl.vertexAttribPointer(
                attLocation,
                vertexInfo.componentSize,
                vertexInfo.componentDataType,
                vertexInfo.normalize,
                vertexInfo.bytesStride,
                vertexInfo.bytesOffset,
            );
            if (vertexInfo.divisor !== undefined) {
                this._gl.vertexAttribDivisor(attLocation, vertexInfo.divisor);
            }
        }
    }
    private _cachedIndexBuffer: IdataBuffer;
    bindIndexBuffer(indexbuffer: IdataBuffer, force = false) {
        if (force || indexbuffer != this._cachedIndexBuffer) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexbuffer.buffer);
            this._cachedIndexBuffer = indexbuffer;
        }
    }
    private _cachedShaderProgram: IshaderProgram;
    bindShaderProgram(program: IshaderProgram, force = false) {
        if (force || program != this._cachedShaderProgram) {
            this._gl.useProgram(program.program);
            this._cachedShaderProgram = program;
        }
    }

    private _cachedVertexBuffers: { [key: string]: VertexBuffer };
    bindBuffers(
        vertexBuffers: { [key: string]: VertexBuffer },
        indexbuffer: IdataBuffer,
        program: IshaderProgram,
        force = false,
    ) {
        if (force || this._cachedVertexBuffers != vertexBuffers || this._cachedShaderProgram != program) {
            this._cachedVertexBuffers = vertexBuffers;

            this.bindVertexBuffersAttributes(vertexBuffers, program);
        }
        this.bindIndexBuffer(indexbuffer, force);
    }
    //------------------------------------------
    //                 TEXTURE
    //-----------------------------------------
    createTextureFromTypedArray(texOP: ItexViewDataOption): ItextureInfo {
        return EngineTexture.createTextureFromTypedArray(this._gl, texOP, this._webGLVersion);
    }
    createTextureFromImageSource(texOP: ItexImageDataOption): ItextureInfo {
        return EngineTexture.createTextureFromImageSource(this._gl, texOP, this._webGLVersion);
    }
    //------------------------------------------
    //                RELEASE
    //-----------------------------------------
    releaseBuffer(buffer: IdataBuffer) {
        this._gl.deleteBuffer(buffer.buffer);
    }

    releaseProgram(program: IshaderProgram) {
        this._gl.deleteProgram(program.program);
    }
    //---------------------------------------------
    //           VertexArrayObject
    //---------------------------------------------
    createVertexArrayObject(
        vertexBuffers: { [key: string]: VertexBuffer },
        indexBuffer: IdataBuffer,
        program: IshaderProgram,
    ): WebGLVertexArrayObject {
        var vao = this._gl.createVertexArray();
        this._gl.bindVertexArray(vao);
        this.bindVertexBuffersAttributes(vertexBuffers, program);
        this.bindIndexBuffer(indexBuffer, true);
        this._gl.bindVertexArray(null);
        return vao;
    }
    private _cachedVertexArrayObject: WebGLVertexArrayObject;
    bindVertexArrayObject(vao: WebGLVertexArrayObject, force = false) {
        if (force || this._cachedVertexArrayObject !== vao) {
            this._cachedVertexArrayObject = vao;

            this._gl.bindVertexArray(vao);
            this._cachedVertexBuffers = null;
            this._cachedIndexBuffer = null;
        }
        this._gl.bindVertexArray(vao);
    }
    releaseVertexArrayObject(vao: WebGLVertexArrayObject) {
        this._gl.deleteVertexArray(vao);
    }
    //---------------------------------------------------------
    //                    global state
    //---------------------------------------------------------
    setViewPort(port: Vec4) {
        this._glState.setViewPort(port[0], port[1], port[2], port[3]);
    }

    clear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
        this._glState.setClear(clearDepth, clearColor, clearStencil);
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

export interface IdataBuffer {
    readonly buffer: any;
}

export class WebglDataBuffer implements IdataBuffer {
    private _buffer: WebGLBuffer;
    constructor(buffer: WebGLBuffer) {
        this._buffer = buffer;
    }
    get buffer() {
        return this._buffer;
    }
}

export class VertexBuffer implements IdataBuffer {
    private _buffer: WebglDataBuffer;

    componentSize: number;
    componentDataType: number;
    // size?: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;

    // constructor(buffer: WebglDataBuffer) {
    //     this._buffer = buffer;
    // }
    get buffer() {
        return this._buffer.buffer;
    }
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
