import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItextureDesInfo, WebglRender, GlTextrue } from "../../render/webglRender";
import { IfboInfo, IfboOption } from "twebgl";
import { Material } from "./material";
import { GlConstants } from "../../render/GlConstant";

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

    constructor(op?: IfboOption, overrideMaterial?: Material) {
        super(null);
        let fboInfo = WebglRender.createFrameBuffer(op);
        Object.assign(this, fboInfo);
        this.overrideMaterial = overrideMaterial;
    }
    overrideMaterial: Material;
    dispose(): void { }
}

export class ShadowTexture implements IfboInfo {
    framebuffer: WebGLFramebuffer;
    width: number;
    height: number;
    colorTextureInfo: ItextureInfo;
    depthTextureInfo?: ItextureInfo;
    constructor() {
        let fboInfo = WebglRender.createFrameBuffer({
            activeDepthAttachment: true,
            depthFormat: GlConstants.DEPTH_COMPONENT,
        });
        Object.assign(this, fboInfo);
    }
}
