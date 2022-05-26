import { GraphicsDevice } from "./graphicsDevice";
import { Texture } from "./texture";
import { IglElement } from "../core/iglElement";
import { WebglRenderBuffer } from "./renderBuffer";

export class FrameBuffer implements IglElement {
    private target: WebGLFramebuffer;
    readonly attachInfos: IframeBufferAttachment[];
    private context: GraphicsDevice;
    constructor(context: GraphicsDevice, options: IFrameBufferOptions) {
        const gl = context.gl;
        this.context = context
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        let colorAttachmentCount = 0;
        options.attachments.forEach(attachmentOp => {
            let { type, attachment } = attachmentOp;
            switch (type) {
                case "color":
                    const attachmentPoint = gl.COLOR_ATTACHMENT0 + colorAttachmentCount++;
                    if (attachment instanceof Texture) {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, attachment.texture, 0);
                    } else {
                        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachmentPoint, gl.RENDERBUFFER, attachment.target);
                    }
                    break;
                case "depth":
                    if (attachment instanceof Texture) {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, attachment.texture, 0);
                    } else {
                        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, attachment.target);
                    }
                    break;
                case "depthWithStencil":
                    if (attachment instanceof Texture) {
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.TEXTURE_2D, attachment.texture, 0);
                    } else {
                        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, attachment.target);
                    }
                    break;
                case "stencil": {
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, (attachment as WebglRenderBuffer).target);
                    break;
                }
            }
        });
        this.target = fbo;
        this.attachInfos = options.attachments;
        this.context.bindingFrameBuffer = this.target;
    }

    bind() {
        if (this.context.bindingFrameBuffer != this.target) {
            this.context.bindingFrameBuffer = this.target;
            let { gl } = this.context;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.target);
        }
    }
    unbind() {
        let { gl } = this.context;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.context.bindingFrameBuffer = null;
    }
    destroy() {
        let { gl } = this.context;
        gl.deleteFramebuffer(this.target);
    }
}

export interface IFrameBufferOptions {
    attachments: IframeBufferAttachment[]
}
export interface IframeBufferAttachment {
    type: "color" | "depth" | "depthWithStencil" | "stencil";
    attachment: Texture | WebglRenderBuffer;
}