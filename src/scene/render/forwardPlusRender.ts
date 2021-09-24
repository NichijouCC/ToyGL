import { FrameBuffer } from "../../webgl/framebuffer";
import { Material } from "./material";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { GlConstants } from "../../webgl/glConstant";

import depthPrePass_vs from "./glsl/depthPrepass.vert.glsl";
import depthPrePass_fs from "./glsl/depthPrepass.frag.glsl";
import { VertexAttEnum } from "../../webgl/vertexAttEnum";

import lightCull_vs from "./glsl/lightCulling.vert.glsl";
import lightCull_fs from "./glsl/lightCulling.frag.glsl";
import { UniformState } from "./uniformState";

export class ForwardPlusRender {
    private device!: GraphicsDevice;
    uniformState = new UniformState();
    constructor(device: GraphicsDevice) {
        this.device = device;
    }

    private depthPrePass = {
        frameBuffer: new FrameBuffer(this.device, {
            attachments: [{
                type: "depth",
                beTexture: true,
                textureOptions: {
                    pixelDatatype: GlConstants.UNSIGNED_INT
                }
            }]
        }),
        mat: new Material({
            shader: {
                vsStr: depthPrePass_vs,
                fsStr: depthPrePass_fs,
                attributes: {
                    a_position: VertexAttEnum.POSITION
                }
            }
        })
    }

    private lightCullPass = {
        frameBuffer: new FrameBuffer(this.device, {
            attachments: [{
                type: "color",
                beTexture: true,
                textureOptions: {
                    pixelDatatype: GlConstants.FLOAT
                }
            }]
        }),
        mat: new Material({
            shader: {
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

export interface IPass {
    frameBuffer: FrameBuffer;
    mat: Material;
}
