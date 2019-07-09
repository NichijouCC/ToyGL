import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { ItextureInfo, ItextureDesInfo, GlRender } from "../../render/glRender";
import { GlConstants, IfboInfo } from "twebgl";

export class RenderTexture extends ToyAsset implements ItextureInfo {
    texture: WebGLTexture;
    texDes: ItextureDesInfo;
    constructor(param?: ItoyAsset) {
        super(param);
        this.fboInfo = GlRender.createFrameBuffer({
            attachments: [
                { attachment: null, format: GlConstants.RGBA },
                { attachment: null, format: GlConstants.DEPTH_COMPONENT16 },
            ],
        });
        this.texture = this.fboInfo.attachments[0].texture;
        this.texDes = this.fboInfo.attachments[1].texDes;
    }
    private fboInfo: IfboInfo;
    dispose(): void {}
}
