/* eslint-disable prettier/prettier */
import { EngineCapability } from "./engineCapability";
import { GlConstants } from "../render/GlConstant";
import { Color } from "../mathD/color";
import { Vec4 } from "../mathD/vec4";
import { EngineGlState } from "./engineGlState";
import { IshaderNode, IframeBufferAttachment, IframeBufferInfo } from "./declaration";
import { WebglShaderNode } from "./engineProgram";
import { ItexViewDataOption, EngineTexture, ItextureInfo, ItexImageDataOption } from "./engineTexture";
import { VertexBuffer, IndexBuffer } from "./buffer";
import { IvertexAttribute, VertexArray } from "./vertextArray";

export interface IengineOption {
    disableWebgl2?: boolean;
}
export class Engine {
    private _gl: WebGLRenderingContext;
    private _caps: EngineCapability;
    get caps(): EngineCapability {
        return this._caps;
    }
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
                } catch (e) { }
            }
            if (!this._gl) {
                try {
                    this._gl = canvasOrContext.getContext("webgl", option) as any;
                } catch (e) { }
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
    createArrayBuffer(data: ArrayBufferView | number, dynamic: boolean = false): VertexBuffer {
        let usage = dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW;
        if (typeof data == "number") {
            return new VertexBuffer({ context: this._gl, usage: usage, sizeInBytes: data });
        } else {
            return new VertexBuffer({ context: this._gl, usage: usage, typedArray: data });
        }
    }

    createElementBuffer(options: { data: ArrayBufferView | number; indexDatatype?: number; dynamic?: boolean; }): IndexBuffer {
        options.dynamic = options.dynamic ?? false;
        let usage = options.dynamic ? this._gl.DYNAMIC_DRAW : this._gl.STATIC_DRAW;
        if (typeof options.data == "number") {
            return new IndexBuffer({ context: this._gl, usage: usage, sizeInBytes: options.data, indexDatatype: options.indexDatatype });
        } else {
            return new IndexBuffer({ context: this._gl, usage: usage, typedArray: options.data, });
        }
    }
    createShaderNode(vs: string, fs: string): IshaderNode {
        return new WebglShaderNode(this._gl, vs, fs);
    }

    // private bindVertexBuffersAttributes(vertexBuffers: { [key: string]: IvertexAttribute }, program: IshaderNode): void {
    //     for (const key in program.attsDic) {
    //         let vertexInfo = vertexBuffers[key];
    //         let attLocation = program.attsDic[key].location;
    //         this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexInfo.buffer);
    //         this._gl.enableVertexAttribArray(attLocation);
    //         this._gl.vertexAttribPointer(
    //             attLocation,
    //             vertexInfo.componentSize,
    //             vertexInfo.componentDataType,
    //             vertexInfo.normalize,
    //             vertexInfo.bytesStride,
    //             vertexInfo.bytesOffset,
    //         );
    //         if (vertexInfo.divisor !== undefined) {
    //             this._gl.vertexAttribDivisor(attLocation, vertexInfo.divisor);
    //         }
    //     }
    // }
    private _cachedIndexBuffer: IdataBuffer;
    bindIndexBuffer(indexbuffer: IdataBuffer, force = false) {
        if (force || indexbuffer != this._cachedIndexBuffer) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexbuffer.buffer);
            this._cachedIndexBuffer = indexbuffer;
        }
    }
    private _cachedShaderProgram: IshaderNode;
    bindShaderProgram(program: IshaderNode, force = false) {
        if (force || program != this._cachedShaderProgram) {
            this._gl.useProgram(program.program);
            this._cachedShaderProgram = program;
        }
    }

    private _cachedVertexBuffers: { [key: string]: VertexBuffer };
    // bindBuffers(
    //     vertexBuffers: { [key: string]: VertexBuffer },
    //     indexbuffer: IdataBuffer,
    //     program: IshaderNode,
    //     force = false,
    // ) {
    //     if (force || this._cachedVertexBuffers != vertexBuffers || this._cachedShaderProgram != program) {
    //         this._cachedVertexBuffers = vertexBuffers;

    //         this.bindVertexBuffersAttributes(vertexBuffers, program);
    //     }
    //     this.bindIndexBuffer(indexbuffer, force);
    // }
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

    releaseProgram(program: IshaderNode) {
        this._gl.deleteProgram(program.program);
    }
    //---------------------------------------------
    //           VertexArrayObject
    //---------------------------------------------
    createVertexArrayObject(vertexAttributes: IvertexAttribute[], indexBuffer?: IndexBuffer): WebGLVertexArrayObject {
        return new VertexArray({
            gl: this._gl,
            vertexArrayObject: this._caps.vertexArrayObject,
            attributes: vertexAttributes,
            indexBuffer: indexBuffer
        });
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
    //                    FRAME BUFFER
    //---------------------------------------------------------
    createRenderTargetTexture(options?: { colorFromat: number }) { }

    createFrameBuffer(op: {
        width?: number;
        height?: number;
        attachments: IframeBufferAttachment[];
    }): IframeBufferInfo {
        let gl = this._gl;
        let fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        let width = op.width || gl.drawingBufferWidth;
        let height = op.height || gl.drawingBufferHeight;
        let colorAttachmentCount = 0;
        let attachInfos = op.attachments.map(attachmentOp => {
            switch (attachmentOp.type) {
                case "color":
                    let attachmentPoint = gl.COLOR_ATTACHMENT0 + colorAttachmentCount++;
                    if (attachmentOp.beTexture) {
                        let tex = this.createTextureFromTypedArray({
                            width: width,
                            height: height,
                            viewData: null,
                            pixelFormat:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.pixelFormat) || gl.RGBA,
                            pixelDatatype:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.pixelDatatype) ||
                                gl.UNSIGNED_BYTE,
                            wrapS:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.wrapS) || gl.CLAMP_TO_EDGE,
                            wrapT:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.wrapT) || gl.CLAMP_TO_EDGE,
                            filterModel:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.filterMin) || gl.NEAREST,
                            enableMipMap: false,
                        });
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex.texture, 0);
                        return { attachment: tex, type: attachmentOp.type, beTexture: true };
                    } else {
                        let attachmentItem = gl.createRenderbuffer();
                        gl.bindRenderbuffer(gl.RENDERBUFFER, attachmentItem);
                        gl.renderbufferStorage(gl.RENDERBUFFER, attachmentOp.format || gl.RGBA, width, height);
                        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachmentPoint, gl.RENDERBUFFER, attachmentItem);
                        return { attachment: attachmentItem, type: attachmentOp.type, beTexture: false };
                    }
                case "depth":
                    if (attachmentOp.beTexture) {
                        let tex = this.createTextureFromTypedArray({
                            width: width,
                            height: height,
                            viewData: null,
                            pixelFormat:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.pixelFormat) ||
                                gl.DEPTH_COMPONENT,
                            pixelDatatype:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.pixelDatatype) ||
                                gl.UNSIGNED_SHORT,
                            wrapS:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.wrapS) || gl.CLAMP_TO_EDGE,
                            wrapT:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.wrapT) || gl.CLAMP_TO_EDGE,
                            filterModel:
                                (attachmentOp.textureOptions && attachmentOp.textureOptions.filterMin) || gl.NEAREST,
                            enableMipMap: false,
                        });
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tex.texture, 0);
                        return { attachment: tex, type: attachmentOp.type, beTexture: true };
                    } else {
                        var attachmentItem = gl.createRenderbuffer();
                        gl.bindRenderbuffer(gl.RENDERBUFFER, attachmentItem);
                        gl.renderbufferStorage(
                            gl.RENDERBUFFER,
                            attachmentOp.format || gl.DEPTH_COMPONENT16,
                            width,
                            height,
                        );
                        gl.framebufferRenderbuffer(
                            gl.FRAMEBUFFER,
                            gl.DEPTH_ATTACHMENT,
                            gl.RENDERBUFFER,
                            attachmentItem,
                        );
                        return { attachment: attachmentItem, type: attachmentOp.type, beTexture: false };
                    }
                case "depthWithStencil":
                    var attachmentItem = gl.createRenderbuffer();
                    gl.bindRenderbuffer(gl.RENDERBUFFER, attachmentItem);
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
                    gl.framebufferRenderbuffer(
                        gl.FRAMEBUFFER,
                        gl.DEPTH_STENCIL_ATTACHMENT,
                        gl.RENDERBUFFER,
                        attachmentItem,
                    );
                    return { attachment: attachmentItem, type: attachmentOp.type, beTexture: false };

                case "stencil":
                    let format = attachmentOp.format || gl.STENCIL_INDEX8;
                    var attachmentItem = gl.createRenderbuffer();
                    gl.bindRenderbuffer(gl.RENDERBUFFER, attachmentItem);
                    gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, attachmentItem);
                    return { attachment: attachmentItem, type: attachmentOp.type, beTexture: false };
            }
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return { frameBuffer: fbo, width: width, height: height, attachInfos: attachInfos };
    }

    //---------------------------------------------------------
    //                    global state
    //---------------------------------------------------------
    setViewPort(port: Vec4) {
        this._glState.setViewPort(port[0], port[1], port[2], port[3]);
    }

    setClear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
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

    //---------------------------------------------
    //                  DRAW
    //---------------------------------------------
    drawElementsType(
        drawMode: number,
        indexStart: number,
        indexCount: number,
        indexFormat: number,
        instancesCount?: number,
    ): void {
        var mult = indexFormat === this._gl.UNSIGNED_INT ? 4 : 2;
        if (instancesCount) {
            this._gl.drawElementsInstanced(drawMode, indexCount, indexFormat, indexStart * mult, instancesCount);
        } else {
            this._gl.drawElements(drawMode, indexCount, indexFormat, indexStart * mult);
        }
    }

    drawArraysType(drawMode: number, verticesStart: number, verticesCount: number, instancesCount?: number): void {
        if (instancesCount) {
            this._gl.drawArraysInstanced(drawMode, verticesStart, verticesCount, instancesCount);
        } else {
            this._gl.drawArrays(drawMode, verticesStart, verticesCount);
        }
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
