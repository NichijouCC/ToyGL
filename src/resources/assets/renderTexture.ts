import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItextureDesInfo, GlRender, GlTextrue } from "../../render/glRender";
import { GlConstants, IfboInfo, IfboOption } from "twebgl";

export class RenderTexture extends ToyAsset implements IfboInfo {
    colorTextureInfo: ItextureInfo;
    depthTextureInfo?: ItextureInfo;
    framebuffer: WebGLFramebuffer;
    width: number;
    height: number;
    depthStencil?: WebGLRenderbuffer;
    depth?: WebGLRenderbuffer;

    get colorTexture(): ItextureInfo {
        return this.colorTextureInfo;
    }
    get depthTexture(): ItextureInfo {
        return this.depthTextureInfo;
    }

    constructor(op?: IfboOption) {
        super(null);
        let fboInfo = GlRender.createFrameBuffer(op);
        Object.assign(this, fboInfo);
    }
    dispose(): void {}
}
