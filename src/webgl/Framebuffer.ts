import { GraphicsDevice } from "./GraphicsDevice";
import { Texture } from "./Texture";
import { IglElement } from "../core/IglElement";

export class FrameBuffer implements IframeBufferInfo, IglElement {

    frameBuffer: WebGLFramebuffer;
    attachInfos: IframeBufferAttachmentItem[];
    constructor(options: {
        context: GraphicsDevice,
        attachments: IframeBufferAttachment[]
    }) {
        let gl = options.context.gl;
        let fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

        let colorAttachmentCount = 0;
        let attachInfos = options.attachments.map(attachmentOp => {

            let width = attachmentOp.width ?? gl.drawingBufferWidth;
            let height = attachmentOp.width ?? gl.drawingBufferHeight;

            switch (attachmentOp.type) {
                case "color":
                    let attachmentPoint = gl.COLOR_ATTACHMENT0 + colorAttachmentCount++;
                    if (attachmentOp.beTexture) {
                        let tex = Texture.fromTypedArray(
                            {
                                context: options.context,
                                width: width,
                                height: height,
                                arrayBufferView: null,
                                pixelFormat: (attachmentOp.textureOptions?.pixelFormat) || gl.RGBA,
                                pixelDatatype: (attachmentOp.textureOptions?.pixelDatatype) || gl.UNSIGNED_BYTE,
                                sampler: {
                                    wrapS: (attachmentOp.textureOptions?.wrapS) || gl.CLAMP_TO_EDGE,
                                    wrapT: (attachmentOp.textureOptions?.wrapT) || gl.CLAMP_TO_EDGE,
                                }
                            }
                        );
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
                        let tex = Texture.fromTypedArray(
                            {
                                context: options.context,
                                width: width,
                                height: height,
                                arrayBufferView: null,
                                pixelFormat: (attachmentOp.textureOptions?.pixelFormat) || gl.DEPTH_COMPONENT,
                                pixelDatatype: (attachmentOp.textureOptions?.pixelDatatype) || gl.UNSIGNED_SHORT,
                            }
                        );
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

        this.frameBuffer = fbo;
        this.attachInfos = attachInfos;


        this.bind = () => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        }
        this.unbind = () => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        this.destroy = () => {
            gl.deleteFramebuffer(this.frameBuffer);
        }
    }

    bind() { }
    unbind() { }
    destroy() { }
}


export interface IframeBufferAttachment {
    type: "color" | "depth" | "depthWithStencil" | "stencil";
    beTexture?: boolean;
    format?: number;
    width?: number;
    height?: number;
    textureOptions?: {
        pixelFormat?: number;
        wrapS?: number;
        wrapT?: number;
        filterMin?: number;
        filterMax?: number;
        /**
         * 默认UNSIGNED_SHORT
         */
        pixelDatatype?: number;
    };
}

export interface IframeBufferAttachmentItem {
    attachment: WebGLRenderbuffer | Texture;
    type: "color" | "depth" | "depthWithStencil" | "stencil";
    beTexture: boolean;
}

export interface IframeBufferInfo {
    frameBuffer: WebGLFramebuffer;
    attachInfos: IframeBufferAttachmentItem[];
}