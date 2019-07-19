import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItextureDesInfo, GlRender, GlTextrue } from "../../render/glRender";
import { IfboInfo, IfboOption } from "twebgl";
import { Material } from "./material";

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
        let fboInfo = GlRender.createFrameBuffer(op);
        Object.assign(this, fboInfo);
        this.overrideMaterial = overrideMaterial;
    }
    overrideMaterial: Material;
    dispose(): void {}
}
