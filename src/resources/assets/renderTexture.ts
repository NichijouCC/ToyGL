import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItextureDesInfo, GlRender, GlTextrue } from "../../render/glRender";
import { GlConstants, IfboInfo } from "twebgl";

export class RenderTexture extends ToyAsset implements IfboInfo {
    framebuffer: WebGLFramebuffer;
    width: number;
    height: number;
    depthStencil?: WebGLRenderbuffer;
    depth?: WebGLRenderbuffer;
    textureInfo: ItextureInfo;

    get texture(): WebGLTexture {
        return this.textureInfo.texture || GlTextrue.WHITE.texture;
    }

    constructor(param?: ItoyAsset) {
        super(param);
        let fboInfo = GlRender.createFrameBuffer({
            enableDepth: true,
            enableStencil: false,
        });
        Object.assign(this, fboInfo);
    }
    private fboInfo: IfboInfo;
    dispose(): void {}
}
