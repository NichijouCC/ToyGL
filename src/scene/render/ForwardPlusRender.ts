import { FrameBuffer } from "../../webgl/Framebuffer";
import { Shader } from "../asset/material/Shader";
import { Material } from "../asset/material/Material";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { GlConstants } from "../../webgl/GLconstant";

import depthPrepass_vs from "./glsl/depthPrepass.vert.glsl";
import depthPrepass_fs from "./glsl/depthPrepass.frag.glsl";
import { VertexAttEnum } from "../../webgl/VertexAttEnum";

import lightCull_vs from "./glsl/lightCulling.vert.glsl";
import lightCull_fs from "./glsl/lightCulling.frag.glsl";
import { UniformState } from "../UniformState";

export class ForwardPlusRender {
    private device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(device: GraphicsDevice) {
        this.device = device;
    }

    private depthPrepass = {
        frameBuffer: new FrameBuffer({
            context: this.device,
            attachments: [{
                type: "depth",
                beTexture: true,
                textureOptions: {
                    pixelDatatype: GlConstants.UNSIGNED_INT
                }
            }]
        }),
        mat: new Material({
            shaderOption: {
                vsStr: depthPrepass_vs,
                fsStr: depthPrepass_fs,
                attributes: {
                    a_position: VertexAttEnum.POSITION
                }
            }
        })
    }

    private lightCullPass = {
        frameBuffer: new FrameBuffer({
            context: this.device,
            attachments: [{
                type: "color",
                beTexture: true,
                textureOptions: {
                    pixelDatatype: GlConstants.FLOAT
                }
            }]
        }),
        mat: new Material({
            shaderOption: {
                vsStr: lightCull_vs,
                fsStr: lightCull_fs,
                attributes: {
                    a_position: VertexAttEnum.POSITION
                }
            }
        })
    }

    private lightAccumulattionPass = {

    }
}

export interface Ipass {
    frameBuffer: FrameBuffer;
    mat: Material;
}
